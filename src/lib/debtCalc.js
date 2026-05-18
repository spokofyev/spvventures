import { CBR_KEY_RATES } from '../data/cbrKeyRates.js'

const MS_DAY = 24 * 60 * 60 * 1000

function toUTCDate(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function fmtISO(d) {
  return d.toISOString().slice(0, 10)
}

function daysBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / MS_DAY)
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Сегментирует [from, to] (включительно) на куски, где постоянны:
 *   - ключевая ставка ЦБ,
 *   - календарный год (для 365/366),
 *   - тело долга (платёж сдвигает баланс со следующего дня).
 *
 * @param {Date} from
 * @param {Date} to
 * @param {Array<Date>} extraBreaks — дополнительные дни-разделители (включая 1-й день
 *                                    нового интервала). Используются для платежей: payment.date + 1.
 */
function buildSegments(from, to, extraBreaks = []) {
  const segments = []
  const rates = CBR_KEY_RATES.map((r) => ({ ...r, dateObj: toUTCDate(r.date) }))

  let cursor = new Date(from.getTime())
  while (cursor.getTime() <= to.getTime()) {
    let applicable = rates[0]
    for (const r of rates) {
      if (r.dateObj.getTime() <= cursor.getTime()) applicable = r
      else break
    }

    const nextRateChange = rates.find((r) => r.dateObj.getTime() > cursor.getTime())
    const yearEnd = new Date(Date.UTC(cursor.getUTCFullYear() + 1, 0, 1))
    const endExclusive = new Date(to.getTime() + MS_DAY)

    const candidates = [endExclusive, yearEnd]
    if (nextRateChange) candidates.push(nextRateChange.dateObj)
    for (const b of extraBreaks) {
      if (b.getTime() > cursor.getTime()) candidates.push(b)
    }

    const next = new Date(Math.min(...candidates.map((d) => d.getTime())))
    const segEnd = new Date(next.getTime() - MS_DAY)

    segments.push({
      from: new Date(cursor.getTime()),
      to: segEnd,
      keyRate: applicable.rate,
      daysInYear: isLeapYear(cursor.getUTCFullYear()) ? 366 : 365,
      days: daysBetween(cursor, segEnd) + 1,
    })

    cursor = new Date(next.getTime())
  }
  return segments
}

/**
 * Рассчитывает проценты на долг с поддержкой досрочных частичных выплат.
 *
 * Платёж уменьшает тело долга начиная со СЛЕДУЮЩЕГО дня после даты платежа
 * (ст. 191 ГК РФ — срок начинает течь со следующего дня). День платежа
 * проценты ещё начисляются на старый баланс.
 *
 * @param {Object} p
 * @param {number} p.amount
 * @param {string} p.from
 * @param {string} p.to
 * @param {number} [p.margin]
 * @param {'floating'|'fixed'} [p.mode]
 * @param {number} [p.fixedRate]
 * @param {Array<{date: string, amount: number}>} [p.payments]
 */
export function calculateDebt({
  amount,
  from,
  to,
  margin = 0,
  mode = 'floating',
  fixedRate = 0,
  payments = [],
}) {
  const fromD = toUTCDate(from)
  const toD = toUTCDate(to)
  if (toD.getTime() < fromD.getTime()) {
    return {
      rows: [],
      totalInterest: 0,
      totalDays: 0,
      totalPaid: 0,
      remainingPrincipal: amount,
      total: amount,
      error: 'Конечная дата раньше начальной',
    }
  }

  const validPayments = (payments || [])
    .filter((p) => p && p.date && p.amount > 0)
    .map((p) => ({ ...p, dateObj: toUTCDate(p.date) }))
    .filter((p) => p.dateObj.getTime() >= fromD.getTime() && p.dateObj.getTime() <= toD.getTime())
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

  // Платёж сдвигает баланс со следующего дня => разделитель сегментов = date + 1
  const extraBreaks = validPayments.map((p) => new Date(p.dateObj.getTime() + MS_DAY))

  const segments = buildSegments(fromD, toD, extraBreaks)

  const rows = []
  let principal = amount
  let totalInterest = 0
  let totalPaid = 0
  let paymentIdx = 0

  for (const s of segments) {
    // Применить все платежи, дата которых строго меньше начала сегмента (т.е. вступившие в силу)
    while (
      paymentIdx < validPayments.length &&
      validPayments[paymentIdx].dateObj.getTime() < s.from.getTime()
    ) {
      const p = validPayments[paymentIdx]
      const applied = Math.min(p.amount, principal)
      principal -= applied
      totalPaid += applied
      rows.push({
        type: 'payment',
        date: fmtISO(p.dateObj),
        paymentAmount: p.amount,
        applied,
        principalAfter: principal,
      })
      paymentIdx += 1
    }

    if (principal <= 0) {
      rows.push({
        type: 'period',
        from: fmtISO(s.from),
        to: fmtISO(s.to),
        days: s.days,
        daysInYear: s.daysInYear,
        keyRate: s.keyRate,
        effectiveRate: mode === 'floating' ? s.keyRate + margin : fixedRate,
        principal: 0,
        interest: 0,
        formula: 'долг погашен',
      })
      continue
    }

    const effectiveRate = mode === 'floating' ? s.keyRate + margin : fixedRate
    const interest = (principal * effectiveRate * s.days) / (s.daysInYear * 100)
    totalInterest += interest

    rows.push({
      type: 'period',
      from: fmtISO(s.from),
      to: fmtISO(s.to),
      days: s.days,
      daysInYear: s.daysInYear,
      keyRate: s.keyRate,
      effectiveRate,
      principal,
      interest,
      formula: `${principal.toFixed(2)} × ${effectiveRate.toFixed(2)}% × ${s.days} / ${s.daysInYear}`,
    })
  }

  // Хвост: платежи на самый последний день периода или после всех сегментов
  while (paymentIdx < validPayments.length) {
    const p = validPayments[paymentIdx]
    const applied = Math.min(p.amount, principal)
    principal -= applied
    totalPaid += applied
    rows.push({
      type: 'payment',
      date: fmtISO(p.dateObj),
      paymentAmount: p.amount,
      applied,
      principalAfter: principal,
    })
    paymentIdx += 1
  }

  const periodRows = rows.filter((r) => r.type === 'period')
  const totalDays = periodRows.reduce((s, r) => s + r.days, 0)

  return {
    rows,
    totalInterest,
    totalDays,
    totalPaid,
    remainingPrincipal: principal,
    total: principal + totalInterest,
  }
}

export function currentKeyRate() {
  return CBR_KEY_RATES[CBR_KEY_RATES.length - 1]
}

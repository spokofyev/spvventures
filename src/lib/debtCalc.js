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

// Сегментирует [from, to] (включительно) на куски, где постоянна ключевая ставка.
// Также режет по границе календарного года — чтобы корректно использовать 365/366 дней.
function buildRatePeriods(from, to) {
  const segments = []
  const rates = CBR_KEY_RATES.map((r) => ({ ...r, dateObj: toUTCDate(r.date) }))

  let cursor = new Date(from.getTime())
  while (cursor.getTime() <= to.getTime()) {
    // Найти применимую ставку на cursor: последняя rate.date <= cursor
    let applicable = rates[0]
    for (const r of rates) {
      if (r.dateObj.getTime() <= cursor.getTime()) applicable = r
      else break
    }

    // Следующая граница: либо следующая дата изменения ставки, либо 1 января след. года, либо to+1
    const nextRateChange = rates.find((r) => r.dateObj.getTime() > cursor.getTime())
    const yearEnd = new Date(Date.UTC(cursor.getUTCFullYear() + 1, 0, 1)) // 1 января след. года
    const endExclusive = new Date(to.getTime() + MS_DAY)

    const candidates = [endExclusive, yearEnd]
    if (nextRateChange) candidates.push(nextRateChange.dateObj)
    const next = new Date(Math.min(...candidates.map((d) => d.getTime())))
    const segEnd = new Date(next.getTime() - MS_DAY) // включительно

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
 * Рассчитывает проценты на долг.
 * @param {Object} p
 * @param {number} p.amount   — сумма долга
 * @param {string} p.from     — дата начала (ISO YYYY-MM-DD), включительно
 * @param {string} p.to       — дата окончания (ISO YYYY-MM-DD), включительно
 * @param {number} p.margin   — надбавка к ключевой в процентных пунктах (например 2 = ключевая + 2пп)
 * @param {'floating'|'fixed'} p.mode — режим ставки
 * @param {number} [p.fixedRate] — если mode === 'fixed', годовая ставка в % (без привязки к ключевой)
 */
export function calculateDebt({ amount, from, to, margin = 0, mode = 'floating', fixedRate = 0 }) {
  const fromD = toUTCDate(from)
  const toD = toUTCDate(to)
  if (toD.getTime() < fromD.getTime()) {
    return { rows: [], totalInterest: 0, totalDays: 0, total: amount, error: 'Конечная дата раньше начальной' }
  }

  const segments = buildRatePeriods(fromD, toD)
  const rows = segments.map((s) => {
    const effectiveRate = mode === 'floating' ? s.keyRate + margin : fixedRate
    const interest = (amount * effectiveRate * s.days) / (s.daysInYear * 100)
    return {
      from: fmtISO(s.from),
      to: fmtISO(s.to),
      days: s.days,
      daysInYear: s.daysInYear,
      keyRate: s.keyRate,
      effectiveRate,
      formula: `${amount.toFixed(2)} × ${effectiveRate.toFixed(2)}% × ${s.days} / ${s.daysInYear}`,
      interest,
    }
  })

  const totalInterest = rows.reduce((s, r) => s + r.interest, 0)
  const totalDays = rows.reduce((s, r) => s + r.days, 0)
  return {
    rows,
    totalInterest,
    totalDays,
    total: amount + totalInterest,
  }
}

export function currentKeyRate() {
  return CBR_KEY_RATES[CBR_KEY_RATES.length - 1]
}

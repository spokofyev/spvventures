import { useMemo, useState } from 'react'
import { calculateDebt, currentKeyRate } from '../lib/debtCalc.js'
import { CBR_KEY_RATES } from '../data/cbrKeyRates.js'

const fmtMoney = (v) =>
  new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)

const todayISO = () => new Date().toISOString().slice(0, 10)

export default function DebtCalculator() {
  const [amount, setAmount] = useState('1000000')
  const [from, setFrom] = useState('2024-01-01')
  const [to, setTo] = useState(todayISO())
  const [mode, setMode] = useState('floating') // floating | fixed
  const [margin, setMargin] = useState('0')
  const [fixedRate, setFixedRate] = useState('20')

  const result = useMemo(() => {
    const amt = parseFloat(amount.replace(',', '.')) || 0
    const m = parseFloat(margin.replace(',', '.')) || 0
    const fr = parseFloat(fixedRate.replace(',', '.')) || 0
    return calculateDebt({ amount: amt, from, to, margin: m, mode, fixedRate: fr })
  }, [amount, from, to, mode, margin, fixedRate])

  const cur = currentKeyRate()

  return (
    <div className="calc-page">
      <header className="calc-nav">
        <a href="/" className="calc-wordmark">SPV Ventures</a>
        <span className="calc-nav-title">Калькулятор задолженности</span>
      </header>

      <main className="calc-main">
        <section className="calc-hero">
          <p className="calc-label">Ст. 395 ГК РФ · плавающая ставка</p>
          <h1 className="calc-title">
            Проценты <em>за пользование</em><br />чужими денежными средствами
          </h1>
          <p className="calc-sub">
            Расчёт по дням с учётом изменений ключевой ставки ЦБ РФ.
            Поддержка <strong>плавающей</strong> ставки с надбавкой
            (например, <em>ключевая + 2 пп</em>) или фиксированной.
          </p>
        </section>

        <section className="calc-grid">
          {/* ─── Inputs ─── */}
          <div className="calc-form">
            <div className="calc-field">
              <label>Сумма долга, ₽</label>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="calc-row-2">
              <div className="calc-field">
                <label>Период с</label>
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="calc-field">
                <label>по</label>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>

            <div className="calc-field">
              <label>Тип ставки</label>
              <div className="calc-tabs">
                <button
                  type="button"
                  className={mode === 'floating' ? 'active' : ''}
                  onClick={() => setMode('floating')}
                >
                  Плавающая (ключевая ЦБ + N пп)
                </button>
                <button
                  type="button"
                  className={mode === 'fixed' ? 'active' : ''}
                  onClick={() => setMode('fixed')}
                >
                  Фиксированная
                </button>
              </div>
            </div>

            {mode === 'floating' ? (
              <div className="calc-field">
                <label>
                  Надбавка к ключевой ставке, пп
                  <span className="calc-hint">
                    0 = ровно ключевая (ст. 395 ГК РФ). Введите 2 — будет «ключевая + 2 пп».
                  </span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                />
                <div className="calc-rate-current">
                  Текущая ключевая ЦБ: <strong>{cur.rate.toFixed(2)}%</strong> (с {cur.date})
                  {parseFloat(margin) ? (
                    <>
                      {' '}· эффективная сейчас:{' '}
                      <strong>{(cur.rate + (parseFloat(margin.replace(',', '.')) || 0)).toFixed(2)}%</strong>
                    </>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="calc-field">
                <label>Годовая ставка, %</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={fixedRate}
                  onChange={(e) => setFixedRate(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* ─── Summary ─── */}
          <aside className="calc-summary">
            <div className="calc-summary-row">
              <span>Сумма долга</span>
              <strong>{fmtMoney(parseFloat(amount.replace(',', '.')) || 0)} ₽</strong>
            </div>
            <div className="calc-summary-row">
              <span>Период</span>
              <strong>{result.totalDays} дн.</strong>
            </div>
            <div className="calc-summary-row big">
              <span>Проценты</span>
              <strong className="accent">{fmtMoney(result.totalInterest)} ₽</strong>
            </div>
            <div className="calc-summary-row total">
              <span>Итого к взысканию</span>
              <strong>{fmtMoney(result.total)} ₽</strong>
            </div>
            {result.error && <div className="calc-error">{result.error}</div>}
          </aside>
        </section>

        {/* ─── Breakdown ─── */}
        {result.rows.length > 0 && (
          <section className="calc-table-wrap">
            <h2 className="calc-h2">Расчёт по периодам</h2>
            <div className="calc-table-scroll">
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>Период с</th>
                    <th>по</th>
                    <th>Дней</th>
                    <th>Ключевая ЦБ, %</th>
                    <th>Эффективная, %</th>
                    <th>Дней в году</th>
                    <th>Формула</th>
                    <th>Проценты, ₽</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r, i) => (
                    <tr key={i}>
                      <td>{r.from}</td>
                      <td>{r.to}</td>
                      <td>{r.days}</td>
                      <td>{r.keyRate.toFixed(2)}</td>
                      <td><strong>{r.effectiveRate.toFixed(2)}</strong></td>
                      <td>{r.daysInYear}</td>
                      <td className="mono">{r.formula}</td>
                      <td className="num"><strong>{fmtMoney(r.interest)}</strong></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>Итого</td>
                    <td>{result.totalDays}</td>
                    <td colSpan={4}></td>
                    <td className="num"><strong>{fmtMoney(result.totalInterest)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        )}

        <section className="calc-notes">
          <h3>Методика</h3>
          <ul>
            <li>
              Расчёт по формуле: <span className="mono">долг × ставка × дней / (365 или 366) / 100</span>.
              Високосный год учитывается автоматически.
            </li>
            <li>
              Период автоматически режется на отрезки по датам изменения ключевой ставки ЦБ РФ
              и по границе календарного года.
            </li>
            <li>
              <strong>Плавающая</strong> ставка = ключевая ЦБ на каждую дату + надбавка
              (надбавка задаётся в процентных пунктах, ноль = чистая ст. 395 ГК РФ).
            </li>
            <li>
              История ключевой ставки в базе: {CBR_KEY_RATES.length} значений, с{' '}
              {CBR_KEY_RATES[0].date} по {cur.date}. При выходе расчёта за пределы — используется
              последнее известное значение.
            </li>
          </ul>
        </section>
      </main>

      <footer className="calc-footer">
        © {new Date().getFullYear()} SPV Ventures. Калькулятор носит справочный характер.
      </footer>
    </div>
  )
}

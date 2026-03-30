import { useState, useCallback } from 'react'
import Numpad from './Numpad.jsx'

function formatDisplay(n) {
  if (n === null || n === undefined) return '0'
  const rounded = Math.round(n * 100) / 100
  const s = rounded.toFixed(2).replace('.', ',')
  return s.endsWith(',00') ? String(Math.round(rounded)) : s
}

function formatHeader(amount, days) {
  const a = Number(amount).toFixed(2).replace('.', ',').replace(/,00$/, '')
  return `${a} на ${days} ${dayWord(days)}`
}

function dayWord(n) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'дней'
  if (mod10 === 1) return 'день'
  if (mod10 >= 2 && mod10 <= 4) return 'дня'
  return 'дней'
}

export default function MainScreen({ derived, addExpense, undoLastExpense, onHistory, onSettings, formatAmount }) {
  const [input, setInput] = useState('')

  const handleKey = useCallback((key) => {
    if (key === '⌫') {
      setInput(p => p.slice(0, -1))
      return
    }
    if (key === '↵') {
      const val = parseFloat(input.replace(',', '.'))
      if (!isNaN(val) && val > 0) {
        addExpense(val)
        setInput('')
      }
      return
    }
    if (key === ',') {
      if (input.includes(',')) return
      setInput(p => (p === '' ? '0,' : p + ','))
      return
    }
    if (key === '') return
    // Max length guard
    if (input.replace(',', '').length >= 8) return
    setInput(p => p + key)
  }, [input, addExpense])

  const todayVal = derived ? Math.round(derived.todayRemaining) : 0
  const lastAmount = derived?.lastExpense ? formatAmount(derived.lastExpense.amount) : null

  return (
    <div className="flex flex-col h-full bg-black no-select" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <button
          className="text-[#FF9500] text-base font-normal"
          onClick={onHistory}
        >
          История
        </button>
        <span className="text-white/50 text-sm text-center">
          {derived ? formatHeader(derived.totalAmount, derived.originalDays) : ''}
        </span>
        <button onClick={onSettings} className="text-white/60 text-xl leading-none">
          ⚙
        </button>
      </div>

      {/* Main amount */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
        <div className="text-white font-bold" style={{ fontSize: 'clamp(64px, 20vw, 96px)', lineHeight: 1 }}>
          {formatDisplay(derived?.todayRemaining)}
        </div>
        <div className="text-white/50 text-lg">На сегодня</div>

        {/* Motivational text */}
        <p className="text-white/30 text-sm text-center mt-6 max-w-xs leading-relaxed">
          Не беспокойтесь, если суммы в жизни и приложении разные — даже примерный бюджет полезен
        </p>
      </div>

      {/* Input + undo row */}
      <div className="flex items-end justify-between px-5 pb-2">
        {lastAmount ? (
          <button
            className="text-[#FF9500] text-base flex items-center gap-1"
            onClick={undoLastExpense}
          >
            ‹ Вернуть {lastAmount}
          </button>
        ) : (
          <div />
        )}
        <div className="text-white/40 text-3xl font-light tabular-nums">
          {input ? `±${input}` : '±0'}
        </div>
      </div>

      {/* Numpad */}
      <div className="px-2 pb-2">
        <Numpad onKey={handleKey} />
      </div>
    </div>
  )
}

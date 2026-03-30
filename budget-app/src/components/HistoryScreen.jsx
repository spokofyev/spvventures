import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function formatAmount(n) {
  const rounded = Math.round(n * 100) / 100
  const s = rounded.toFixed(2).replace('.', ',')
  return s.endsWith(',00') ? String(Math.round(rounded)) : s
}

function formatTime(isoString) {
  const date = new Date(isoString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const time = `${hh}:${mm}`

  if (date.toDateString() === today.toDateString()) return `Сегодня, ${time}`
  if (date.toDateString() === yesterday.toDateString()) return `Вчера, ${time}`

  const day = date.getDate()
  const months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
  return `${day} ${months[date.getMonth()]}, ${time}`
}

function formatHeader(amount, days) {
  if (!amount) return ''
  const a = Number(amount).toFixed(2).replace('.', ',').replace(/,00$/, '')
  const mod10 = days % 10, mod100 = days % 100
  let word = 'дней'
  if (mod100 < 11 || mod100 > 14) {
    if (mod10 === 1) word = 'день'
    else if (mod10 >= 2 && mod10 <= 4) word = 'дня'
  }
  return `${a} на ${days} ${word}`
}

function ExpenseRow({ expense, onUpdateNote }) {
  const [expanded, setExpanded] = useState(false)
  const [note, setNote] = useState(expense.note || '')

  function handleBlur() {
    onUpdateNote(expense.id, note)
  }

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-baseline justify-between px-4 py-3 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <span className="text-white font-light" style={{ fontSize: 'clamp(32px, 10vw, 48px)', lineHeight: 1.1 }}>
          {formatAmount(expense.amount)}
        </span>
        <span className="text-white/40 text-sm ml-4 shrink-0">
          {formatTime(expense.timestamp)}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3">
              <textarea
                autoFocus
                value={note}
                onChange={e => setNote(e.target.value)}
                onBlur={handleBlur}
                placeholder="Заметка…"
                rows={2}
                className="w-full bg-white/8 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 resize-none outline-none border border-white/10 focus:border-white/30"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
              {expense.note && note !== expense.note && (
                <button
                  className="mt-1 text-[#FF9500] text-sm"
                  onClick={() => { onUpdateNote(expense.id, note) }}
                >
                  Сохранить
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HistoryScreen({ expenses, settings, updateNote, onBack }) {
  return (
    <div className="flex flex-col h-full bg-black no-select" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <span className="text-white text-base font-medium">История</span>
        <span className="text-white/50 text-sm">
          {settings ? formatHeader(settings.totalAmount, settings.originalDays) : ''}
        </span>
        <button onClick={onBack} className="text-[#FF9500] text-base">
          ✕
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {expenses.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-white/30 text-sm">
            Нет записей
          </div>
        ) : (
          expenses.map(expense => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onUpdateNote={updateNote}
            />
          ))
        )}
      </div>
    </div>
  )
}

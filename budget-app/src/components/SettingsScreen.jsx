import { useState } from 'react'

function daysRemaining(endDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  const diff = Math.round((end - today) / 86400000)
  return Math.max(diff + 1, 1)
}

function formatDailyPreview(amount, endDate) {
  if (!amount || !endDate) return ''
  const days = daysRemaining(endDate)
  const daily = Number(amount) / days
  if (isNaN(daily) || daily <= 0) return ''
  return `${Math.floor(daily)} в день`
}

// Format date for display: "по 29 апреля"
function formatDeadline(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const day = d.getDate()
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  return `по ${day} ${months[d.getMonth()]}`
}

// Get min date = tomorrow
function minDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

// Default end date = 30 days from now
function defaultEndDate() {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().slice(0, 10)
}

export default function SettingsScreen({ settings, onSave, onCancel }) {
  const [amount, setAmount] = useState(settings?.totalAmount?.toString() || '')
  const [endDate, setEndDate] = useState(settings?.endDate || defaultEndDate())
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const canSave = amount && parseFloat(amount.replace(',', '.')) > 0 && endDate

  function handleSave() {
    const val = parseFloat(amount.replace(',', '.'))
    if (!isNaN(val) && val > 0) {
      onSave(val, endDate)
    }
  }

  const dailyPreview = formatDailyPreview(amount.replace(',', '.'), endDate)

  return (
    <div className="flex flex-col h-full bg-black" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Navigation bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        {onCancel ? (
          <button className="text-white text-base" onClick={onCancel}>
            Отменить
          </button>
        ) : <div />}
        <div />
        <button
          className={`text-base font-medium ${canSave ? 'text-[#FF9500]' : 'text-white/30'}`}
          onClick={handleSave}
          disabled={!canSave}
        >
          Сохранить
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto">
        {/* Amount row */}
        <div className="border-b border-white/10 px-4 py-4">
          <div className="text-white/50 text-sm mb-2">Сумма</div>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-white text-5xl font-bold outline-none placeholder-white/20"
          />
          {dailyPreview && (
            <div className="text-white/50 text-base mt-1">{dailyPreview}</div>
          )}
        </div>

        {/* Deadline row */}
        <div className="border-b border-white/10 px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-sm">Срок</span>
            <button
              className="text-[#FF9500] text-base"
              onClick={() => setDatePickerOpen(o => !o)}
            >
              {endDate ? `${formatDeadline(endDate)}…` : 'Выбрать…'}
            </button>
          </div>
          {datePickerOpen && (
            <input
              type="date"
              min={minDate()}
              value={endDate}
              onChange={e => { setEndDate(e.target.value); setDatePickerOpen(false) }}
              className="mt-3 w-full bg-white/8 text-white rounded-lg px-3 py-2 outline-none border border-white/20"
              style={{ background: 'rgba(255,255,255,0.06)', colorScheme: 'dark' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

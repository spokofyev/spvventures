function formatValue(val) {
  if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`
  if (val >= 1000) return `${(val / 1000).toFixed(0)}K`
  return val.toString()
}

export default function BarChart({ low, high, maxValue }) {
  const max = maxValue || Math.max(high * 1.2, 1)
  const lowPct = (low / max) * 100
  const highPct = (high / max) * 100

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <span className="text-xs text-gray-500 w-10 text-right">{formatValue(low)}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded relative">
        <div
          className="absolute top-0 h-full bg-blue-200 rounded"
          style={{ left: 0, width: `${highPct}%` }}
        />
        <div
          className="absolute top-0 h-full bg-blue-700 rounded"
          style={{ left: 0, width: `${lowPct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-10">{formatValue(high)}</span>
    </div>
  )
}

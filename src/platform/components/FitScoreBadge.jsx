export default function FitScoreBadge({ score }) {
  const bg = score >= 9
    ? 'bg-emerald-100 text-emerald-800'
    : score >= 7
    ? 'bg-blue-100 text-blue-800'
    : score >= 5
    ? 'bg-amber-100 text-amber-800'
    : 'bg-gray-100 text-gray-600'

  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${bg}`}>
      {score}
    </span>
  )
}

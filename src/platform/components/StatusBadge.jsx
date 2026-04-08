const stageStyles = {
  'contacted': 'bg-gray-100 text-gray-700',
  'nda-signed': 'bg-purple-50 text-purple-700',
  'meeting-scheduled': 'bg-amber-50 text-amber-700',
  'offer-received': 'bg-emerald-50 text-emerald-700',
  'term-sheet': 'bg-green-50 text-green-700',
  'closed': 'bg-green-100 text-green-800',
}

const stageLabels = {
  'contacted': 'Contacted',
  'nda-signed': 'NDA Signed',
  'meeting-scheduled': 'Meeting',
  'offer-received': 'Offer Received',
  'term-sheet': 'Term Sheet',
  'closed': 'Closed',
}

export default function StatusBadge({ stage }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageStyles[stage] || stageStyles.contacted}`}>
      {stageLabels[stage] || stage}
    </span>
  )
}

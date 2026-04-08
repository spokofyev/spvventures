import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LayoutGrid, List, Mail, FileCheck, Calendar, MessageSquare, FileText, Handshake } from 'lucide-react'
import { getBuyers } from '../data/buyers'
import FitScoreBadge from '../components/FitScoreBadge'

const STAGES = [
  { id: 'contacted', label: 'Contacted', icon: Mail, color: 'border-gray-300' },
  { id: 'nda-signed', label: 'NDA Signed', icon: FileCheck, color: 'border-purple-400' },
  { id: 'meeting-scheduled', label: 'Meeting', icon: Calendar, color: 'border-amber-400' },
  { id: 'offer-received', label: 'Offer Received', icon: MessageSquare, color: 'border-emerald-400' },
  { id: 'term-sheet', label: 'Term Sheet', icon: FileText, color: 'border-green-400' },
  { id: 'closed', label: 'Closed', icon: Handshake, color: 'border-green-600' },
]

function BuyerCard({ buyer }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">
          {buyer.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-900 truncate">{buyer.name}</span>
      </div>
      <div className="flex items-center justify-between">
        <FitScoreBadge score={buyer.fitScore} />
        <span className="text-xs text-gray-400">{buyer.type === 'financial' ? 'Financial' : 'Strategic'}</span>
      </div>
    </div>
  )
}

export default function Pipeline() {
  const { dealId } = useParams()
  const [view, setView] = useState('kanban')
  const allBuyers = getBuyers(dealId)

  // Combine strategic and financial, tag type
  const allBuyersList = [
    ...allBuyers.strategic.map(b => ({ ...b, type: 'strategic' })),
    ...allBuyers.financial.map(b => ({ ...b, type: 'financial' })),
  ]

  const buyersByStage = STAGES.reduce((acc, stage) => {
    acc[stage.id] = allBuyersList.filter(b => b.stage === stage.id)
    return acc
  }, {})

  const totalBuyers = allBuyersList.length
  const stageStats = STAGES.map(s => ({
    ...s,
    count: buyersByStage[s.id].length,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Deal Pipeline</h2>
          <p className="text-sm text-gray-500">{totalBuyers} buyers in pipeline</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('kanban')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${view === 'kanban' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${view === 'table' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {stageStats.map(s => (
          <div key={s.id} className={`bg-white rounded-lg border-l-4 ${s.color} border border-gray-200 px-4 py-3`}>
            <div className="text-2xl font-semibold text-gray-900">{s.count}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {view === 'kanban' ? (
        /* Kanban view */
        <div className="grid grid-cols-6 gap-3">
          {STAGES.map(stage => {
            const Icon = stage.icon
            return (
              <div key={stage.id} className="min-h-[400px]">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stage.label}</span>
                  <span className="ml-auto text-xs text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">
                    {buyersByStage[stage.id].length}
                  </span>
                </div>
                <div className="space-y-2">
                  {buyersByStage[stage.id].map(buyer => (
                    <BuyerCard key={buyer.id} buyer={buyer} />
                  ))}
                  {buyersByStage[stage.id].length === 0 && (
                    <div className="bg-gray-50 rounded-lg border border-dashed border-gray-200 p-6 text-center">
                      <p className="text-xs text-gray-300">No buyers</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Table view */
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600">Company</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Fit Score</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Stage</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Similar Deals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allBuyersList
                .sort((a, b) => {
                  const stageOrder = STAGES.map(s => s.id)
                  return stageOrder.indexOf(b.stage) - stageOrder.indexOf(a.stage)
                })
                .map(buyer => (
                  <tr key={buyer.id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">
                          {buyer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{buyer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        buyer.type === 'strategic' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {buyer.type === 'strategic' ? 'Strategic' : 'Financial'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <FitScoreBadge score={buyer.fitScore} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        STAGES.find(s => s.id === buyer.stage)?.color.replace('border-', 'bg-').replace('400', '50').replace('300', '100') || 'bg-gray-100'
                      } text-gray-700`}>
                        {STAGES.find(s => s.id === buyer.stage)?.label || buyer.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{buyer.similarDeals}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

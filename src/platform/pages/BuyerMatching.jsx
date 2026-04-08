import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Search, SlidersHorizontal, BarChart3, List } from 'lucide-react'
import Tabs from '../components/Tabs'
import FitScoreBadge from '../components/FitScoreBadge'
import StatusBadge from '../components/StatusBadge'
import { getBuyers } from '../data/buyers'

const tabs = [
  { id: 'strategic', label: 'Strategic buyers' },
  { id: 'financial', label: 'Financial buyers' },
]

function TrendBadge({ trend }) {
  if (!trend) return null
  const { direction, value, period } = trend
  if (direction === 'up') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <TrendingUp size={12} />
        {value} deal{value !== 1 ? 's' : ''} {period}
      </span>
    )
  }
  if (direction === 'down') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium">
        <TrendingDown size={12} />
        {value} deal{value !== 1 ? 's' : ''} {period}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
      <Minus size={12} />
      No change {period}
    </span>
  )
}

function BuyerRow({ buyer, expanded, onToggle }) {
  return (
    <>
      <tr
        className="bg-white hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
        onClick={onToggle}
      >
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
              {buyer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{buyer.name}</div>
            </div>
            <button className="text-gray-400 ml-1">
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </td>
        <td className="px-4 py-4">
          <FitScoreBadge score={buyer.fitScore} />
        </td>
        <td className="px-4 py-4 max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">{buyer.reasoning}</p>
        </td>
        <td className="px-4 py-4 max-w-sm">
          <ul className="space-y-0.5">
            {buyer.synergies.slice(0, 2).map((s, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gray-300 mt-1.5 flex-shrink-0">•</span>
                <span className="line-clamp-1">{s}</span>
              </li>
            ))}
            {buyer.synergies.length > 2 && (
              <li className="text-xs text-gray-400">+{buyer.synergies.length - 2} more</li>
            )}
          </ul>
        </td>
        <td className="px-4 py-4 text-center">
          <div className="text-sm font-medium text-gray-900">{buyer.similarDeals}</div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Show Deals</button>
        </td>
        <td className="px-4 py-4">
          <TrendBadge trend={buyer.dealTrend} />
        </td>
      </tr>
      {expanded && (
        <tr className="bg-blue-50/50">
          <td colSpan={6} className="px-6 py-4">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Full Reasoning</h4>
                <p className="text-sm text-gray-700">{buyer.reasoning}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">All Synergies</h4>
                <ul className="space-y-1.5">
                  {buyer.synergies.map((s, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Pipeline Status</h4>
                <StatusBadge stage={buyer.stage} />
                {buyer.aum && (
                  <div className="mt-3">
                    <span className="text-xs text-gray-400">AUM:</span>
                    <span className="text-sm font-medium text-gray-700 ml-1">{buyer.aum}</span>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function BuyerMatching() {
  const { dealId } = useParams()
  const [activeTab, setActiveTab] = useState('strategic')
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('fitScore')
  const [sortDir, setSortDir] = useState('desc')

  const allBuyers = getBuyers(dealId)
  const currentBuyers = activeTab === 'strategic' ? allBuyers.strategic : allBuyers.financial

  let filtered = currentBuyers
  if (search) {
    const q = search.toLowerCase()
    filtered = currentBuyers.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.reasoning.toLowerCase().includes(q) ||
      b.synergies.some(s => s.toLowerCase().includes(q))
    )
  }

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'desc' ? bVal - aVal : aVal - bVal
    }
    return 0
  })

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortArrow = ({ col }) => {
    if (sortKey !== col) return <span className="text-gray-300 text-xs">↕</span>
    return <span className="text-blue-600 text-xs">{sortDir === 'desc' ? '↓' : '↑'}</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex items-center gap-3 pb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Find a company"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer">
            <SlidersHorizontal size={16} />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer">
            <BarChart3 size={16} />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer">
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-56">
                <button onClick={() => handleSort('name')} className="flex items-center gap-1.5 cursor-pointer">
                  Company Name <SortArrow col="name" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-20">
                <button onClick={() => handleSort('fitScore')} className="flex items-center gap-1.5 cursor-pointer">
                  Fit Score <SortArrow col="fitScore" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Reasoning</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Synergies</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600 w-32">
                <button onClick={() => handleSort('similarDeals')} className="flex items-center gap-1.5 cursor-pointer mx-auto">
                  # Similar Deals L5Y <SortArrow col="similarDeals" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 w-40">
                Similar Deals &Delta;
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(buyer => (
              <BuyerRow
                key={buyer.id}
                buyer={buyer}
                expanded={expandedId === buyer.id}
                onToggle={() => setExpandedId(expandedId === buyer.id ? null : buyer.id)}
              />
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                  No buyers found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Showing {sorted.length} of {currentBuyers.length} {activeTab} buyers
      </div>
    </div>
  )
}

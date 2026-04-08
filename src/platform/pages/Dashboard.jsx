import { Link } from 'react-router-dom'
import { deals, stageLabels, stageColors } from '../data/deals'
import { ArrowRight, Plus, TrendingUp, Building2, DollarSign } from 'lucide-react'

function DealCard({ deal }) {
  return (
    <Link
      to={`/platform/deal/${deal.id}/buyers`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all no-underline group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {deal.companyName}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{deal.sector}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${stageColors[deal.stage]}`}>
          {stageLabels[deal.stage]}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{deal.description}</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-gray-400" />
          <div>
            <div className="text-xs text-gray-400">Revenue</div>
            <div className="text-sm font-medium text-gray-900">
              ${(deal.revenue / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-gray-400" />
          <div>
            <div className="text-xs text-gray-400">Growth</div>
            <div className="text-sm font-medium text-emerald-600">+{deal.growthRate}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-gray-400" />
          <div>
            <div className="text-xs text-gray-400">Location</div>
            <div className="text-sm font-medium text-gray-900 truncate">{deal.location}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{deal.uploads?.length || 0} files uploaded</span>
          <span className="text-xs text-gray-400">{deal.employees} employees</span>
        </div>
        <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </Link>
  )
}

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Active Deals</h1>
          <p className="text-sm text-gray-500 mt-1">{deals.length} mandates in progress</p>
        </div>
        <Link
          to="/platform/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors no-underline"
        >
          <Plus size={16} />
          New Deal
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-10 grid grid-cols-4 gap-4">
        {[
          { label: 'Total Deals', value: deals.length, color: 'text-gray-900' },
          { label: 'In Outreach', value: deals.filter(d => d.stage === 'buyer-outreach').length, color: 'text-indigo-600' },
          { label: 'Offers Stage', value: deals.filter(d => d.stage === 'offers-received').length, color: 'text-emerald-600' },
          { label: 'Total Revenue', value: `$${(deals.reduce((s, d) => s + d.revenue, 0) / 1000000).toFixed(1)}M`, color: 'text-gray-900' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

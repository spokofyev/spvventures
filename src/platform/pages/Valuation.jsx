import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Tabs from '../components/Tabs'
import BarChart from '../components/BarChart'
import SortableTable from '../components/SortableTable'
import { getValuation } from '../data/valuations'
import { getComparables } from '../data/comparables'

const tabs = [
  { id: 'overview', label: 'Valuation Overview' },
  { id: 'public', label: 'Public Comparables' },
  { id: 'private-mult', label: 'Private Comparables (with multiples)' },
  { id: 'private-no', label: 'Private Comparables (without multiples)' },
  { id: 'premium', label: 'Premium Valuation Drivers' },
]

function formatCurrency(val) {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
  return `$${val}`
}

function formatDealSize(val) {
  if (val == null) return '—'
  if (val >= 1000000) return `${(val / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  if (val >= 1000) return `${val.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  return val.toString()
}

function ValuationOverview({ valuation }) {
  const [publicOpen, setPublicOpen] = useState(true)
  const [privateOpen, setPrivateOpen] = useState(true)
  const maxValue = Math.max(
    ...valuation.publicCompanies.map(c => c.evHigh),
    ...valuation.privateCompanies.map(c => c.evHigh)
  )

  const CompSection = ({ title, companies, open, toggle }) => (
    <div className="mb-6">
      <button
        onClick={toggle}
        className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3 cursor-pointer"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-80">Methodologies</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-28">25th Percentile</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-28">75th Percentile</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-40">Metric</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 w-24">Value</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Enterprise Value - <span className="italic text-gray-400">Estimating valuation range</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((comp, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700 font-medium">{comp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{comp.p25}x</td>
                  <td className="px-4 py-3 text-gray-600">{comp.p75}x</td>
                  <td className="px-4 py-3 text-gray-500">{valuation.metricType}</td>
                  <td className="px-4 py-3 text-gray-600">${(valuation.metricValue / 1000000).toFixed(0)}M</td>
                  <td className="px-4 py-3">
                    <BarChart low={comp.evLow} high={comp.evHigh} maxValue={maxValue} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <CompSection
        title="Public Companies"
        companies={valuation.publicCompanies}
        open={publicOpen}
        toggle={() => setPublicOpen(!publicOpen)}
      />
      <CompSection
        title="Private Companies"
        companies={valuation.privateCompanies}
        open={privateOpen}
        toggle={() => setPrivateOpen(!privateOpen)}
      />
    </div>
  )
}

function PublicComps({ comps }) {
  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'ticker', label: 'Ticker', sortable: true },
    { key: 'sector', label: 'Sector', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'evRevenue', label: 'EV/Revenue', sortable: true, render: row => row.evRevenue ? `${row.evRevenue}x` : '—' },
    { key: 'evEbitda', label: 'EV/EBITDA', sortable: true, render: row => row.evEbitda ? `${row.evEbitda}x` : '—' },
  ]
  return <SortableTable columns={columns} data={comps} defaultSort={{ key: 'evRevenue', dir: 'desc' }} searchable />
}

function PrivateCompsWithMultiples({ comps, stats }) {
  const columns = [
    {
      key: 'company',
      label: 'Target Company',
      sortable: true,
      render: row => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-[10px] font-semibold text-gray-500 flex-shrink-0">
            {row.company.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-medium">{row.company}</span>
        </div>
      ),
    },
    {
      key: 'sector',
      label: 'Industry Sector',
      sortable: true,
      render: row => <span className="text-blue-600 hover:underline cursor-pointer">{row.sector}</span>,
    },
    { key: 'description', label: 'Target Description', render: row => <span className="line-clamp-2 text-gray-500">{row.description}</span> },
    { key: 'location', label: 'Location', sortable: true },
    {
      key: 'dealSize',
      label: 'Deal Size ($000)',
      sortable: true,
      render: row => <span className="font-mono">{formatDealSize(row.dealSize)}</span>,
    },
    {
      key: 'acquirer',
      label: 'Acquirer / Investor',
      sortable: true,
      render: row => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-[9px] font-bold text-gray-400 flex-shrink-0">
            {row.acquirer.slice(0, 2).toUpperCase()}
          </div>
          <span>{row.acquirer}</span>
        </div>
      ),
    },
  ]

  return (
    <div>
      {/* Summary stats */}
      {stats && (
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {[
            { label: 'Overall', sub: 'Average EV/Revenue', value: stats.avgEvRevenue ? `${stats.avgEvRevenue}x` : '—' },
            { label: 'Overall', sub: 'Median EV/Revenue', value: stats.medianEvRevenue ? `${stats.medianEvRevenue}x` : '—' },
            { label: 'Overall', sub: 'Average EV/EBITDA', value: stats.avgEvEbitda ? `${stats.avgEvEbitda}x` : '—' },
            { label: 'Overall', sub: 'Median EV/EBITDA', value: stats.medianEvEbitda ? `${stats.medianEvEbitda}x` : '—' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg px-5 py-3 min-w-[160px]">
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              <div className="text-xs text-gray-400">{stat.sub}</div>
              <div className="text-xl font-semibold text-blue-700 mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      )}

      <SortableTable columns={columns} data={comps} defaultSort={{ key: 'dealSize', dir: 'desc' }} searchable />
    </div>
  )
}

function PrivateCompsNoMultiples({ comps }) {
  const columns = [
    {
      key: 'company',
      label: 'Target Company',
      sortable: true,
      render: row => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-[10px] font-semibold text-gray-500 flex-shrink-0">
            {row.company.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-medium">{row.company}</span>
        </div>
      ),
    },
    {
      key: 'sector',
      label: 'Industry Sector',
      sortable: true,
      render: row => <span className="text-blue-600 hover:underline cursor-pointer">{row.sector}</span>,
    },
    { key: 'description', label: 'Target Description', render: row => <span className="line-clamp-2 text-gray-500">{row.description}</span> },
    { key: 'location', label: 'Location', sortable: true },
    {
      key: 'dealSize',
      label: 'Deal Size ($000)',
      sortable: true,
      render: row => row.dealSize ? <span className="font-mono">{formatDealSize(row.dealSize)}</span> : '—',
    },
    {
      key: 'acquirer',
      label: 'Acquirer / Investor',
      sortable: true,
      render: row => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-[9px] font-bold text-gray-400 flex-shrink-0">
            {row.acquirer.slice(0, 2).toUpperCase()}
          </div>
          <span>{row.acquirer}</span>
        </div>
      ),
    },
  ]

  return <SortableTable columns={columns} data={comps} defaultSort={{ key: 'dealSize', dir: 'desc' }} searchable />
}

function PremiumDrivers({ dealId }) {
  const drivers = {
    'deal-1': [
      { driver: 'Proprietary NLP model with 95%+ extraction accuracy', impact: 'High', category: 'Technology Moat' },
      { driver: 'Network effect from growing precedent benchmark database (50K+ deals)', impact: 'High', category: 'Data Asset' },
      { driver: '130% net dollar retention signals strong product-market fit', impact: 'High', category: 'Revenue Quality' },
      { driver: '8 of top 20 global law firms as customers', impact: 'Medium', category: 'Customer Quality' },
      { driver: 'Consolidating market with 7 similar acquisitions in 24 months', impact: 'High', category: 'Market Timing' },
      { driver: 'Founding team with PhD-level ML expertise + domain experience', impact: 'Medium', category: 'Team' },
      { driver: '82% gross margins with clear path to 85%+', impact: 'Medium', category: 'Unit Economics' },
    ],
    'deal-2': [
      { driver: 'Regulatory tailwind: GEG mandates 65% renewable heating from 2024', impact: 'High', category: 'Market Tailwind' },
      { driver: 'In-house installation teams in a labor-constrained market', impact: 'High', category: 'Operational Moat' },
      { driver: 'Subsidy maximization expertise (up to 70% cost coverage)', impact: 'High', category: 'Customer Value Prop' },
      { driver: '80-day full-stack installation turnaround', impact: 'Medium', category: 'Operational Excellence' },
      { driver: 'Positive EBITDA at 14% margin while growing 65%', impact: 'High', category: 'Financial Performance' },
      { driver: 'Regional density strategy lowers logistics costs and CAC', impact: 'Medium', category: 'Business Model' },
    ],
    'deal-3': [
      { driver: 'AI routing reduces shipping costs 23% vs. static allocation', impact: 'High', category: 'Technology Value' },
      { driver: '350+ D2C brands with 115% NDR', impact: 'High', category: 'Revenue Quality' },
      { driver: 'Asset-light model (intelligence layer, not warehouses)', impact: 'Medium', category: 'Business Model' },
      { driver: 'Integration with 40+ carriers and 200+ 3PL warehouses', impact: 'High', category: 'Network Effect' },
      { driver: '500K+ orders/month with 99.97% uptime', impact: 'Medium', category: 'Operational Maturity' },
    ],
  }

  const items = drivers[dealId] || []
  const impactColor = { High: 'text-emerald-700 bg-emerald-50', Medium: 'text-amber-700 bg-amber-50', Low: 'text-gray-600 bg-gray-100' }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${impactColor[item.impact]}`}>
            {item.impact}
          </span>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">{item.driver}</div>
            <div className="text-xs text-gray-400 mt-0.5">{item.category}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Valuation() {
  const { dealId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const valuation = getValuation(dealId)
  const comps = getComparables(dealId)

  if (!valuation) {
    return <div className="text-center py-20 text-gray-400">No valuation data available</div>
  }

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && <ValuationOverview valuation={valuation} />}
      {activeTab === 'public' && comps && <PublicComps comps={comps.publicComps} />}
      {activeTab === 'private-mult' && comps && (
        <PrivateCompsWithMultiples comps={comps.privateWithMultiples} stats={comps.summaryStats} />
      )}
      {activeTab === 'private-no' && comps && <PrivateCompsNoMultiples comps={comps.privateWithoutMultiples} />}
      {activeTab === 'premium' && <PremiumDrivers dealId={dealId} />}
    </div>
  )
}

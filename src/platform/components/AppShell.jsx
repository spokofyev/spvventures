import { useState } from 'react'
import { Outlet, NavLink, Link, useParams, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, FileText, GitBranch, Plus, ChevronDown, ArrowLeft } from 'lucide-react'
import { deals } from '../data/deals'

const dealNav = [
  { to: 'buyers', label: 'Buyers', icon: Users },
  { to: 'valuation', label: 'Valuation', icon: BarChart3 },
  { to: 'cim', label: 'Investment Summary', icon: FileText },
  { to: 'pipeline', label: 'Pipeline', icon: GitBranch },
]

export default function AppShell() {
  const { dealId } = useParams()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const currentDeal = deals.find(d => d.id === dealId)
  const isDealPage = location.pathname.includes('/deal/')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-100">
          <Link to="/platform" className="flex items-center gap-2 text-black no-underline">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-semibold">SP</span>
            </div>
            {sidebarOpen && <span className="text-sm font-semibold tracking-tight">SPV Platform</span>}
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLink
            to="/platform"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <LayoutDashboard size={18} />
            {sidebarOpen && 'Deals'}
          </NavLink>

          {isDealPage && currentDeal && sidebarOpen && (
            <>
              <div className="pt-4 pb-2">
                <div className="flex items-center gap-2 px-3 text-xs text-gray-400 uppercase tracking-wider">
                  <span className="truncate">{currentDeal.companyName}</span>
                </div>
              </div>
              {dealNav.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={`/platform/deal/${dealId}/${to}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link
            to="/platform/new"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white bg-black hover:bg-gray-800 no-underline transition-colors w-full justify-center"
          >
            <Plus size={16} />
            {sidebarOpen && 'New Deal'}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        {isDealPage && currentDeal && (
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
            <Link to="/platform" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 truncate">{currentDeal.companyName}</h1>
              <p className="text-sm text-gray-500 truncate">{currentDeal.sector}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Rev: ${(currentDeal.revenue / 1000000).toFixed(1)}M
              </span>
              <span className="text-sm text-gray-500">
                Growth: {currentDeal.growthRate}%
              </span>
            </div>
          </header>
        )}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

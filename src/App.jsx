import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import AppShell from './platform/components/AppShell'
import Dashboard from './platform/pages/Dashboard'
import DealOnboarding from './platform/pages/DealOnboarding'
import DealDetail from './platform/pages/DealDetail'
import BuyerMatching from './platform/pages/BuyerMatching'
import Valuation from './platform/pages/Valuation'
import CIMEditor from './platform/pages/CIMEditor'
import Pipeline from './platform/pages/Pipeline'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen overflow-x-hidden">
            <Hero />
          </div>
        } />
        <Route path="/platform" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<DealOnboarding />} />
          <Route path="deal/:dealId" element={<DealDetail />}>
            <Route index element={<BuyerMatching />} />
            <Route path="buyers" element={<BuyerMatching />} />
            <Route path="valuation" element={<Valuation />} />
            <Route path="cim" element={<CIMEditor />} />
            <Route path="pipeline" element={<Pipeline />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

import App from './App.jsx'
import DebtCalculator from './components/DebtCalculator.jsx'

export default function Root() {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/calc') return <DebtCalculator />
  return <App />
}

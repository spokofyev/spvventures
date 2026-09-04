import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Growth from './pages/Growth.jsx'

// Лёгкий роутинг по pathname — vercel.json уже отдаёт index.html на любой путь.
const routes = {
  '/growth': Growth,
}

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = routes[path] ?? App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)

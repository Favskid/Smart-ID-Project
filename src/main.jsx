import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './pages/dashboard/dashboard'
import './index.css'

createRoot(document.getElementById('root')).render(
    <Dashboard />
)

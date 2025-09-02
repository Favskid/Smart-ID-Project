import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/login/login'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import StaffDashboard from './pages/dashboard/StaffDashboard'
import EmployeeTable from './pages/dashboard/admin/employees'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/employees" element={<EmployeeTable />} />
        <Route path="/dashboard/staff" element={<StaffDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/staff" replace />} />
      </Routes>
    </Router>
  </StrictMode>,
)

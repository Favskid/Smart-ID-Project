import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/login/login'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import EmployeeTable from './pages/dashboard/admin/employees'
import BusinessCard from './pages/dashboard/staff/BusinessCard'
import StaffProfile from './pages/dashboard/staff/Profile'
import Adminprofile from './pages/dashboard/admin/adminprofile'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/adminprofile" element={<Adminprofile />} />
        <Route path="/dashboard/admin/employees" element={<EmployeeTable />} />
        <Route path="/dashboard/staff" element={<Navigate to="/dashboard/staff/profile" replace />} />
        <Route path="/dashboard/staff/profile" element={<StaffProfile />} />
        <Route path="/dashboard/staff/smartID" element={<BusinessCard />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/staff/profile" replace />} />
      </Routes>
    </Router>
  </StrictMode>,
)

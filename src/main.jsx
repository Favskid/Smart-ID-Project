import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './pages/Auth/login'
import Register from './pages/Auth/register'
// import AdminDashboard from '../AdminDashboard'
import EmployeeTable from './pages/dashboard/admin/employees'
import Adminprofile from './pages/dashboard/admin/adminprofile'
import BusinessCard from './pages/dashboard/staff/BusinessCard'
import StaffProfile from './pages/dashboard/staff/Profile'
import Settings from './pages/dashboard/staff/settings'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard/admin" element={<AdminDashboard />} /> */}
        <Route path="/dashboard/admin" element={<Adminprofile />} />
        <Route path="/dashboard/admin/employees" element={<EmployeeTable />} />
        <Route path="/dashboard/staff" element={<Navigate to="/dashboard/staff/profile" replace />} />
        <Route path="/dashboard/staff/profile" element={<StaffProfile />} />
        <Route path="/dashboard/staff/smartID" element={<BusinessCard />} />
        <Route path="/dashboard/staff/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/staff/profile" replace />} />
      </Routes>
    </Router>
  </StrictMode>,
)

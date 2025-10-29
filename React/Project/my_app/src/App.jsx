import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/AuthPages/Login'
import ForgotPassword from './pages/AuthPages/ForgotPassword'
import ResetPassword from './pages/AuthPages/ResetPassword'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'

// End-user pages
import EndUserDashboard from './pages/EndUserPages/Dashboard'
import Bills from './pages/EndUserPages/Bills'
import MeterData from './pages/EndUserPages/MeterData'
import Alerts from './pages/EndUserPages/Alerts'
import Profile from './pages/EndUserPages/Profile'
import Logs from './pages/EndUserPages/Logs'

// Zone manager pages
import ZoneDashboard from './pages/ZoneManagementPages/ZoneDashboard'
import ZoneMeterManagement from './pages/ZoneManagementPages/MeterManagement'
import ZoneUserManagement from './pages/ZoneManagementPages/UserManagement'
import ZoneReports from './pages/ZoneManagementPages/ReportsAnalytics'
import ZoneSettings from './pages/ZoneManagementPages/SettingNotifications'

// Enterprise admin pages
import EnterpriseDashboard from './pages/EnterpriseLevelPages/EnterpriseDashboard'
import EnterpriseZoneManagement from './pages/EnterpriseLevelPages/ZoneManagement'
import EnterpriseMeterManagement from './pages/EnterpriseLevelPages/MeterManagement'
import UserRoleManagement from './pages/EnterpriseLevelPages/UserRoleManagement'
import AuditLogs from './pages/EnterpriseLevelPages/Auditlogs'
import EnterpriseSettings from './pages/EnterpriseLevelPages/SettingConfiguration'

import Unauthorized from './pages/Unauthorized'

function App() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<ResetPassword />} />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected application routes using MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes under the main layout */}
        <Route index element={<Navigate to="/end-user" replace />} />

        {/* End-user routes (role: end_user) */}
        <Route
          path="end-user"
          element={
            <ProtectedRoute requiredRole="end_user">
              <EndUserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="end-user/bills"
          element={
            <ProtectedRoute requiredRole="end_user">
              <Bills />
            </ProtectedRoute>
          }
        />
        <Route
          path="end-user/meter-data"
          element={
            <ProtectedRoute requiredRole="end_user">
              <MeterData />
            </ProtectedRoute>
          }
        />
        <Route
          path="end-user/alerts"
          element={
            <ProtectedRoute requiredRole="end_user">
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="end-user/profile"
          element={
            <ProtectedRoute requiredRole="end_user">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="end-user/logs"
          element={
            <ProtectedRoute requiredRole="end_user">
              <Logs />
            </ProtectedRoute>
          }
        />

        {/* Zone manager routes (role: zone_manager) */}
        <Route
          path="zone-management"
          element={
            <ProtectedRoute requiredRole="zone_manager">
              <ZoneDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="zone-management/meter-management"
          element={
            <ProtectedRoute requiredRole="zone_manager">
              <ZoneMeterManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="zone-management/user-management"
          element={
            <ProtectedRoute requiredRole="zone_manager">
              <ZoneUserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="zone-management/reports-analytics"
          element={
            <ProtectedRoute requiredRole="zone_manager">
              <ZoneReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="zone-management/setting-notifications"
          element={
            <ProtectedRoute requiredRole="zone_manager">
              <ZoneSettings />
            </ProtectedRoute>
          }
        />

        {/* Enterprise admin routes (role: enterprise_admin) */}
        <Route
          path="enterprise"
          element={
            <ProtectedRoute requiredRole="enterprise_admin">
              <EnterpriseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="enterprise/zone-management"
          element={
            <ProtectedRoute requiredRole="enterprise_admin">
              <EnterpriseZoneManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="enterprise/meter-management"
          element={
            <ProtectedRoute requiredRole="enterprise_admin">
              <EnterpriseMeterManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="enterprise/user-role-management"
          element={
            <ProtectedRoute requiredRole="enterprise_admin">
              <UserRoleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="enterprise/audit-logs"
          element={
            <ProtectedRoute requiredRole="enterprise_admin">
              <AuditLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="enterprise/setting-configuration"
          element={
            <ProtectedRoute requiredRole="enterprise_admin">
              <EnterpriseSettings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

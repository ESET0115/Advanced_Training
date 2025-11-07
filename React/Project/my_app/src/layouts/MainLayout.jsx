import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'
import '../styles/Layout.css'

export default function MainLayout() {
  const { user, logout } = useAuth()

  const getNavigationItems = () => {
    const role = user?.role

    switch (role) {
      case 'end_user':
        return [
          { path: '/end-user', label: 'Dashboard' },
          { path: '/end-user/bills', label: 'Bills & Payments' },
          { path: '/end-user/meter-data', label: 'Meter Data' },
          { path: '/end-user/alerts', label: 'Alerts & Notifications' },
          { path: '/end-user/profile', label: 'Profile & Settings' },
          { path: '/end-user/logs', label: 'Logs' }
        ]

      case 'zone_manager':
        return [
          { path: '/zone-management', label: 'Dashboard' },
          { path: '/zone-management/meter-management', label: 'Meter Management' },
          { path: '/zone-management/user-management', label: 'User Management' },
          { path: '/zone-management/reports-analytics', label: 'Reports & Analytics' },
          { path: '/zone-management/setting-notifications', label: 'Setting & Notifications' }
        ]

      case 'enterprise_admin':
        return [
          { path: '/enterprise', label: 'Dashboard' },
          { path: '/enterprise/zone-management', label: 'Zone Management' },
          { path: '/enterprise/meter-management', label: 'Meter Management' },
          { path: '/enterprise/user-role-management', label: 'User & Role Management' },
          { path: '/enterprise/audit-logs', label: 'Audit Logs' },
          { path: '/enterprise/setting-configuration', label: 'Setting & Configuration' }
        ]

      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <div className="app-shell">
      <div className="app-header-wrapper">
        <Header />
      </div>

      <div className="app-body">
        <aside className="sidebar">
          <div className="brand">MDMS</div>

          <div className="sidebar-section-title">Menu</div>

          <nav className="menu">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `menu-item${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role?.replace('_', ' ').toUpperCase()}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


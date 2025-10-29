import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { isAuthenticated, getUserRole, hasPermission } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && getUserRole() !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute

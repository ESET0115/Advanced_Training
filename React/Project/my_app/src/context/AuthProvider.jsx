import React, { useState, useEffect } from 'react'
import usersData from '../data/users.json'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('mdms_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email, password) => {
    const foundUser = usersData.users.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData = { ...foundUser }
      delete userData.password

      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('mdms_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }

    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('mdms_user')
  }

  const hasPermission = (permission) => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const getUserRole = () => {
    return user?.role || null
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    getUserRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

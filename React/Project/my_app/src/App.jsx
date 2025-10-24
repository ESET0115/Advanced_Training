import React, { useEffect, useMemo, useSyncExternalStore } from 'react'
import './App.css'
import Login from './pages/AuthPages/Login'
import ForgotPassword from './pages/AuthPages/ForgotPassword'
import ResetPassword from './pages/AuthPages/ResetPassword'

function useHashLocation() {
  const subscribe = (cb) => {
    window.addEventListener('hashchange', cb)
    return () => window.removeEventListener('hashchange', cb)
  }
  const getSnapshot = () => window.location.hash || '#/'
  const hash = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return hash
}

function App() {
  const hash = useHashLocation()
  const route = useMemo(() => hash.replace(/^#/, ''), [hash])

  if (route === '/forgot') return <ForgotPassword />
  if (route === '/reset') return <ResetPassword />
  return <Login />
}

export default App

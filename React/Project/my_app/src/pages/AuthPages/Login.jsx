import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import '../../styles/Login.css'
import Header from '../../components/Header'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(email, password)
    
    if (result.success) {
      // Redirect based on user role
      const role = result.user.role
      switch (role) {
        case 'end_user':
          navigate('/end-user')
          break
        case 'zone_manager':
          navigate('/zone-management')
          break
        case 'enterprise_admin':
          navigate('/enterprise')
          break
        default:
          navigate('/end-user')
      }
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="login-page">
      <Header />

      <main className="login-container">
        <h1 className="title">Login Form</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            className="pill-input" 
            type="email" 
            placeholder="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            className="pill-input" 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="error-message" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <div className="form-row space-between" id='rememberdiv'>
            <label className="remember">
              <input type="checkbox" />
              <span>remember me</span>
            </label>
            <a className="forgot" href="/forgot">forgot password</a>
          </div>

          <div className="form-row center">
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'login'}
            </button>
          </div>
        </form>

        <div className="demo-accounts card-compact" style={{ marginTop: '20px' }}>
          <h3 className="demo-accounts-title">Demo Accounts:</h3>
          <div className="demo-accounts-list">
            <p><strong>End User:</strong> john.doe@example.com / password123</p>
            <p><strong>Zone Manager:</strong> sarah.manager@example.com / password123</p>
            <p><strong>Enterprise Admin:</strong> admin@enterprise.com / password123</p>
          </div>
        </div>
      </main>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import Header from '../../components/Header'

export default function ForgotPassword() {
  return (
    <div className="login-page">
      <Header />

      <main className="login-container">
        <h1 className="title">Forgot password</h1>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input className="pill-input" type="email" placeholder="email" />

          <div className="row-limiter">
            <div className="form-row center" style={{ marginTop: 8 }}>
              <Link to="/login" className="forgot">login</Link>
            </div>
          </div>

          <div className="form-row center">
            <Link className="login-btn" to="/reset">send reset link</Link>
          </div>
        </form>
      </main>
    </div>
  )
}



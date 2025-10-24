import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'
import Header from '../../components/Header'

export default function ResetPassword() {
  return (
    <div className="login-page">
      <Header />

      <main className="login-container">
        <h1 className="title">Reset password</h1>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input className="pill-input" type="email" placeholder="abc@gmail.com" />
          <input className="pill-input" type="password" placeholder="Enter your password" />

          <div className="form-row center">
            <Link className="login-btn" to="/">update password</Link>
          </div>
        </form>
      </main>
    </div>
  )
}



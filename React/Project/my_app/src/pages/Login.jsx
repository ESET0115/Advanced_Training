import React from 'react'
import '../styles/Login.css'

export default function Login() {
  return (
    <div className="login-page">
      <header className="topbar">
        <div className="brand">MDMS</div>
        <div className="top-actions">
          <div className="theme-toggle">◐</div>
          <div className="lang">en ▾</div>
        </div>
      </header>

      <main className="login-container">
        <h1 className="title">Login Form</h1>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input className="pill-input" type="email" placeholder="email" />
          <input className="pill-input" type="password" placeholder="password" />

          <div className="form-row space-between">
            <label className="remember">
              <input type="checkbox" />
              <span>remember me</span>
            </label>
            <a className="forgot" href="#">forgot password</a>
          </div>

          <div className="form-row center">
            <button className="login-btn">login</button>
          </div>
        </form>
      </main>
    </div>
  )
}

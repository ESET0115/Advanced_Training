// import React from 'react'
// import { Link } from 'react-router-dom'
// import '../../styles/Login.css'
// import Header from '../../components/Header'

// export default function ResetPassword() {
//   return (
//     <div className="login-page">
//       <Header />

//       <main className="login-container">
//         <h1 className="title">Reset password</h1>

//         <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//           <input className="pill-input" type="email" placeholder="abc@gmail.com" />
//           <input className="pill-input" type="password" placeholder="Enter your password" />

//           <div className="form-row center">
//             <Link className="login-btn" to="/">update password</Link>
//           </div>
//         </form>
//       </main>
//     </div>
//   )
// }




import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import Header from "../../components/Header";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="login-page">
      <Header />

      <main className="login-main">
        <div className="glass-card">
          <h1 className="login-title">Reset Password</h1>
          <p className="login-subtitle">
            Create a new password for your account
          </p>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <input
              className="glass-input"
              type="email"
              placeholder="registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="glass-input"
              type="password"
              placeholder="new password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />

            <button className="neo-btn" type="submit">
              Update Password
            </button>

            <div className="form-row center" style={{ marginTop: "16px" }}>
              <Link className="forgot" to="/login">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

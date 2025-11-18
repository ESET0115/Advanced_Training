// import React from 'react'
// import { Link } from 'react-router-dom'
// import '../../styles/Login.css'
// import Header from '../../components/Header'

// export default function ForgotPassword() {
//   return (
//     <div className="login-page">
//       <Header />

//       <main className="login-container">
//         <h1 className="title">Forgot password</h1>

//         <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//           <input className="pill-input" type="email" placeholder="email" />

//           <div className="row-limiter">
//             <div className="form-row center" style={{ marginTop: 8 }}>
//               <Link to="/login" className="forgot">login</Link>
//             </div>
//           </div>

//           <div className="form-row center">
//             <Link className="login-btn" to="/reset">send reset link</Link>
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="login-page">
      <Header />

      <main className="login-main">
        <div className="glass-card">
          <h1 className="login-title">Forgot Password</h1>
          <p className="login-subtitle">
            Enter your registered email to receive a reset link
          </p>

          <form
            className="login-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="glass-input"
              type="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="neo-btn" type="submit">
              Send Reset Link
            </button>

            <div className="form-row center" style={{ marginTop: "16px" }}>
              <Link to="/login" className="forgot">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

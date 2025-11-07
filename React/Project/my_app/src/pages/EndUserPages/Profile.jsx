// import React, { useState } from 'react'

// export default function Profile() {
//   const [tab, setTab] = useState('profile')
//   return (
//     <div>
//       <h2 className="title">Profile & Settings</h2>
//       <div className="tabs">
//         <button className={`tab${tab==='profile'?' active':''}`} onClick={()=>setTab('profile')}>Profile</button>
//         <button className={`tab${tab==='security'?' active':''}`} onClick={()=>setTab('security')}>Security</button>
//         <button className={`tab${tab==='notification'?' active':''}`} onClick={()=>setTab('notification')}>Notification</button>
//       </div>
//       {tab==='profile' && (
//         <form className="stack" onSubmit={(e)=>e.preventDefault()}>
//           <input className="pill-input" placeholder="User name" />
//           <input className="pill-input" placeholder="user@gmail.com" />
//           <input className="pill-input" placeholder="91+ 9809892782" />
//           <button className="login-btn" type="submit">Save and continue</button>
//         </form>
//       )}
//       {tab==='security' && (
//         <form className="stack" onSubmit={(e)=>e.preventDefault()}>
//           <input className="pill-input" placeholder="current password" />
//           <input className="pill-input" placeholder="new password" />
//           <input className="pill-input" placeholder="confirm password" />
//           <button className="login-btn" type="submit">Save and continue</button>
//         </form>
//       )}
//       {tab==='notification' && (
//         <div className="stack">
//           <label><input type="checkbox" defaultChecked /> Email</label>
//           <label><input type="checkbox" /> SMS</label>
//           <label><input type="checkbox" defaultChecked /> Push</label>
//           <button className="login-btn">Save and continue</button>
//         </div>
//       )}
//     </div>
//   )
// }



import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import "../../styles/EUProfile.css";

const EndUserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme } = useTheme();

  return (
    <div className={`page-wrapper profile-container ${theme}`}>
      <h2 className="page-title">Profile & Settings</h2>

      <div className="tabs">
        <button
          className={activeTab === "profile" ? "tab active" : "tab"}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={activeTab === "security" ? "tab active" : "tab"}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button
          className={activeTab === "notification" ? "tab active" : "tab"}
          onClick={() => setActiveTab("notification")}
        >
          Notification
        </button>
      </div>

      <div className="divider" />

      {/* ------------------ PROFILE TAB ------------------ */}
      {activeTab === "profile" && (
        <div className="profile-content">
          <div className="avatar-wrapper">
            <div className="avatar-circle">
              <span className="avatar-icon">👤</span>
            </div>
          </div>

          <div className="input-group">
            <label>name</label>
            <input placeholder="User name" />
          </div>

          <div className="input-group">
            <label>email</label>
            <input placeholder="user@gmail.com" />
          </div>

          <div className="input-group">
            <label>mobile no.</label>
            <input placeholder="91+ 9809892782" />
          </div>

          <button className="primary-btn">Save and continue</button>
        </div>
      )}

      {/* ------------------ SECURITY TAB ------------------ */}
      {activeTab === "security" && (
        <div className="profile-content">
          <div className="avatar-wrapper">
            <div className="avatar-circle">
              <span className="avatar-icon">👤</span>
            </div>
          </div>

          <div className="input-group">
            <label>current password</label>
            <input type="password" placeholder="Test@123" />
          </div>

          <div className="input-group">
            <label>new password</label>
            <input type="password" placeholder="Test@12345" />
          </div>

          <div className="input-group">
            <label>confirm password</label>
            <input type="password" placeholder="Test@12345" />
          </div>

          <button className="primary-btn">Save and continue</button>
        </div>
      )}

      {/* ------------------ NOTIFICATION TAB ------------------ */}
      {activeTab === "notification" && (
        <div className="profile-content notify-content">
          <p className="notify-title">You can get notifications from</p>

          {["Email", "SMS", "Push"].map((t) => (
            <div className="notify-row" key={t}>
              <span>{t}</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          ))}

          <button className="primary-btn notify-btn">Save and continue</button>
        </div>
      )}
    </div>
  );
};

export default EndUserProfile;

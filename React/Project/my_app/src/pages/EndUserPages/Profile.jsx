import React, { useState } from 'react'

export default function Profile() {
  const [tab, setTab] = useState('profile')
  return (
    <div>
      <h2 className="title">Profile & Settings</h2>
      <div className="tabs">
        <button className={`tab${tab==='profile'?' active':''}`} onClick={()=>setTab('profile')}>Profile</button>
        <button className={`tab${tab==='security'?' active':''}`} onClick={()=>setTab('security')}>Security</button>
        <button className={`tab${tab==='notification'?' active':''}`} onClick={()=>setTab('notification')}>Notification</button>
      </div>
      {tab==='profile' && (
        <form className="stack" onSubmit={(e)=>e.preventDefault()}>
          <input className="pill-input" placeholder="User name" />
          <input className="pill-input" placeholder="user@gmail.com" />
          <input className="pill-input" placeholder="91+ 9809892782" />
          <button className="login-btn" type="submit">Save and continue</button>
        </form>
      )}
      {tab==='security' && (
        <form className="stack" onSubmit={(e)=>e.preventDefault()}>
          <input className="pill-input" placeholder="current password" />
          <input className="pill-input" placeholder="new password" />
          <input className="pill-input" placeholder="confirm password" />
          <button className="login-btn" type="submit">Save and continue</button>
        </form>
      )}
      {tab==='notification' && (
        <div className="stack">
          <label><input type="checkbox" defaultChecked /> Email</label>
          <label><input type="checkbox" /> SMS</label>
          <label><input type="checkbox" defaultChecked /> Push</label>
          <button className="login-btn">Save and continue</button>
        </div>
      )}
    </div>
  )
}



import React from 'react'

export default function Alerts() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      <div>
        <h2 className="title">Alerts & Notifications</h2>
        <div className="list">
          {Array.from({length:4}).map((_,i)=> (
            <div key={i} className="list-item">Title of the notification<br/><span className="muted">Description of the notification</span></div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="title">Title of the notification</h3>
        <div className="card-lite" style={{minHeight:240}}>Detail content placeholder</div>
      </div>
    </div>
  )
}



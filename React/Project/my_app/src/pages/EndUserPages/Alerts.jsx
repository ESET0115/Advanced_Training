// import React from 'react'

// export default function Alerts() {
//   return (
//     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
//       <div>
//         <h2 className="title">Alerts & Notifications</h2>
//         <div className="list">
//           {Array.from({length:4}).map((_,i)=> (
//             <div key={i} className="list-item">Title of the notification<br/><span className="muted">Description of the notification</span></div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h3 className="title">Title of the notification</h3>
//         <div className="card-lite" style={{minHeight:240}}>Detail content placeholder</div>
//       </div>
//     </div>
//   )
// }

import React, { useState } from "react";
import "../../styles/EUAlerts.css";
import "../../assets/bell.svg";

const notificationsData = [
  {
    id: 1,
    date: "05 May 2025",
    time: "06 : 15 PM",
    title: "Title of the notification",
    desc: "Description of the notification",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  { id: 2, date: "05 May 2025", time: "06 : 10 PM", title: "Title of the notification", desc: "Description of the notification", content: "Lorem Ipsum short text..." },
  { id: 3, date: "05 May 2025", time: "05 : 45 PM", title: "Title of the notification", desc: "Description of the notification", content: "Lorem Ipsum short text..." },
  { id: 4, date: "03 May 2025", time: "02 : 10 PM", title: "Title of the notification", desc: "Description of the notification", content: "Lorem Ipsum short text..." },
];

export default function Alerts() {
  const [active, setActive] = useState(1);
  const activeItem = notificationsData.find(x => x.id === active);

  const grouped = notificationsData.reduce((acc, n) => {
    acc[n.date] = acc[n.date] ? [...acc[n.date], n] : [n];
    return acc;
  }, {});

  return (
    <div className="alert-wrapper">
      {/* Left Pane */}
      <div className="alert-left">
        {Object.keys(grouped).map(date => (
          <div key={date}>
            <div className="alert-date">{date}</div>

            {grouped[date].map(n => (
              <div
                key={n.id}
                className={`alert-card ${active === n.id ? "active" : ""}`}
                onClick={() => setActive(n.id)}
              >
                <img className="alert-bell" src="../../assets/bell.svg" alt="bell" />  
                <div className="alert-texts">
                  <div className="alert-title">{n.title}</div>
                  <div className="alert-desc">{n.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Right Pane */}
      <div className="alert-right">
        <div className="alert-detail-header">
          <h3>{activeItem.title}</h3>
          <div className="alert-detail-time">
            <div>{activeItem.date}</div>
            <div>{activeItem.time}</div>
          </div>
        </div>
        <p className="alert-detail-content">{activeItem.content}</p>
      </div>
    </div>
  );
}

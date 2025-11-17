// import React from 'react'

// export default function SettingConfiguration() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Setting & Configuration</h1>
//         <p className="text-gray-600">Configure system settings and parameters.</p>
//       </div>
//     </div>
//   )
// }


import React, { useState } from "react";
import "../../styles/ELSettingsConfig.css";

export default function SettingsConfig() {
  const [activeTab, setActiveTab] = useState("settings");

  // settings state
  const [dataRetention, setDataRetention] = useState(30);
  const [auditRetention, setAuditRetention] = useState(30);
  const [autoLogout, setAutoLogout] = useState(30);
  const [timezone, setTimezone] = useState("UTC+0");
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("English");

  // notification states
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);
  const [notifyPush, setNotifyPush] = useState(true);

  const handleSaveSettings = () => {
    alert(`
Saved settings:
- Data retention: ${dataRetention} days
- Audit retention: ${auditRetention} days
- Auto logout: ${autoLogout} minutes
- Timezone: ${timezone}
- Currency: ${currency}
- Language: ${language}
`);
  };

  const handleSaveNotification = () => {
    alert(`
Saved notifications:
- Email: ${notifyEmail}
- SMS: ${notifySMS}
- Push: ${notifyPush}
`);
  };

  return (
    <div className="settings-wrapper">

      <h2 className="settings-title">Setting and Configuration</h2>
      <p className="settings-sub">Manage organization-wide configurations and integrations</p>

      {/* TAB SWITCH */}
      <div className="tab-header">
        <button
          className={activeTab === "settings" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
        <button
          className={activeTab === "notification" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("notification")}
        >
          Notification
        </button>
      </div>

      {/* ---------------- SETTINGS TAB ---------------- */}
      {activeTab === "settings" && (
        <div className="settings-section">

          <h3 className="section-title">Policies & Rules</h3>

          <div className="settings-grid">
            <div>
              <label>Data Retention Period (in days)</label>
              <input
                type="number"
                value={dataRetention}
                onChange={(e) => setDataRetention(e.target.value)}
              />
            </div>

            <div>
              <label>Auto Logout Timer (minutes)</label>
              <input
                type="number"
                value={autoLogout}
                onChange={(e) => setAutoLogout(e.target.value)}
              />
            </div>

            <div>
              <label>Audit Log Retention (in days)</label>
              <input
                type="number"
                value={auditRetention}
                onChange={(e) => setAuditRetention(e.target.value)}
              />
            </div>
          </div>

          <h3 className="section-title">Localization</h3>

          <div className="settings-grid">
            <div>
              <label>Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option>UTC+0</option>
                <option>UTC+5:30</option>
                <option>UTC-4</option>
                <option>UTC+8</option>
              </select>
            </div>

            <div>
              <label>Default Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Hindi</option>
                <option>Arabic</option>
                <option>Spanish</option>
              </select>
            </div>

            <div>
              <label>Currency Format</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>AED</option>
              </select>
            </div>
          </div>

          <button className="save-btn" onClick={handleSaveSettings}>
            Save the changes
          </button>
        </div>
      )}

      {/* ---------------- NOTIFICATION TAB ---------------- */}
      {activeTab === "notification" && (
        <div className="notification-section">

          <div className="notify-row">
            <span>Email</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={() => setNotifyEmail(!notifyEmail)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="notify-row">
            <span>SMS</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifySMS}
                onChange={() => setNotifySMS(!notifySMS)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="notify-row">
            <span>Push</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifyPush}
                onChange={() => setNotifyPush(!notifyPush)}
              />
              <span className="slider" />
            </label>
          </div>

          <button className="save-btn" onClick={handleSaveNotification}>
            Save and continue
          </button>
        </div>
      )}
    </div>
  );
}

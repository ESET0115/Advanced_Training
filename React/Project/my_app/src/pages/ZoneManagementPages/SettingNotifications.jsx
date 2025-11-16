// import React from 'react'

// export default function SettingNotifications() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Setting & Notifications</h1>
//         <p className="text-gray-600">Configure zone settings and notification preferences.</p>
//       </div>
//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import "../../styles/ZMSettingNotifications.css";

export default function SettingNotifications() {
  // Tab: "settings" or "notification"
  const [tab, setTab] = useState("settings");

  // Thresholds (persisted to localStorage so page reload keeps values)
  const [highThreshold, setHighThreshold] = useState(() => {
    const v = localStorage.getItem("zn_highThreshold");
    return v ? Number(v) : 800;
  });
  const [lowThreshold, setLowThreshold] = useState(() => {
    const v = localStorage.getItem("zn_lowThreshold");
    return v ? Number(v) : 200;
  });
  const [abnormalFreq, setAbnormalFreq] = useState(() => {
    const v = localStorage.getItem("zn_abnormalFreq");
    return v ? Number(v) : 6;
  });
  const [inactiveDay, setInactiveDay] = useState(() => {
    return localStorage.getItem("zn_inactiveDay") || "Sunday";
  });

  // Notification toggles
  const [notifyEmail, setNotifyEmail] = useState(() => localStorage.getItem("zn_notifyEmail") === "1");
  const [notifySms, setNotifySms] = useState(() => localStorage.getItem("zn_notifySms") === "1");
  const [notifyPush, setNotifyPush] = useState(() => localStorage.getItem("zn_notifyPush") === "1");

  // Save handler (persists to localStorage and shows a small confirmation)
  const [saved, setSaved] = useState(false);
  const saveSettings = () => {
    localStorage.setItem("zn_highThreshold", String(highThreshold));
    localStorage.setItem("zn_lowThreshold", String(lowThreshold));
    localStorage.setItem("zn_abnormalFreq", String(abnormalFreq));
    localStorage.setItem("zn_inactiveDay", inactiveDay);

    localStorage.setItem("zn_notifyEmail", notifyEmail ? "1" : "0");
    localStorage.setItem("zn_notifySms", notifySms ? "1" : "0");
    localStorage.setItem("zn_notifyPush", notifyPush ? "1" : "0");

    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  // small helpers for input visuals
  function formatNumber(n) {
    return String(n);
  }

  return (
    <div className="zn-wrapper">
      <header className="zn-header">
        <h1>User Management</h1>
        <p className="zn-sub">Manage your alert rules and communication preferences.</p>
      </header>

      <div className="zn-tabs">
        <button
          className={`zn-tab ${tab === "settings" ? "active" : ""}`}
          onClick={() => setTab("settings")}
        >
          Settings
        </button>
        <button
          className={`zn-tab ${tab === "notification" ? "active" : ""}`}
          onClick={() => setTab("notification")}
        >
          Notification
        </button>
      </div>

      {tab === "settings" && (
        <section className="zn-card-grid">
          {/* High threshold */}
          <div className="zn-card">
            <h4 className="card-title">High Consumption Threshold (kWh)</h4>
            <p className="card-sub">Set the upper limit to trigger alerts when a meter goes above this.</p>

            <div className="slider-row">
              <input
                className="range"
                type="range"
                min="0"
                max="1000"
                step="10"
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
              />
              <div className="slider-value">{formatNumber(highThreshold)}</div>
            </div>
          </div>

          {/* Low threshold */}
          <div className="zn-card">
            <h4 className="card-title">Low Consumption Threshold (kWh)</h4>
            <p className="card-sub">Alert when consumption drops below this value.</p>

            <div className="slider-row">
              <input
                className="range"
                type="range"
                min="0"
                max="1000"
                step="10"
                value={lowThreshold}
                onChange={(e) => setLowThreshold(Number(e.target.value))}
              />
              <div className="slider-value">{formatNumber(lowThreshold)}</div>
            </div>
          </div>

          {/* Abnormal frequency */}
          <div className="zn-card">
            <h4 className="card-title">Abnormal Reading Frequency (hours)</h4>
            <p className="card-sub">If meter readings arrive more frequently than this, mark abnormal.</p>

            <div className="slider-row">
              <input
                className="range"
                type="range"
                min="0"
                max="24"
                step="1"
                value={abnormalFreq}
                onChange={(e) => setAbnormalFreq(Number(e.target.value))}
              />
              <div className="slider-value">{abnormalFreq}h</div>
            </div>
          </div>

          {/* Inactive meters day */}
          <div className="zn-card">
            <h4 className="card-title">Inactive Meters Duration (day)</h4>
            <p className="card-sub">Choose the preferred weekly day to mark meters inactive.</p>
            <select
              className="select-input"
              value={inactiveDay}
              onChange={(e) => setInactiveDay(e.target.value)}
            >
              {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </section>
      )}

      {tab === "notification" && (
        <section className="zn-card-grid zn-notif">
          <div className="zn-card notif-row">
            <h4>Email</h4>
            <label className="toggle">
              <input type="checkbox" checked={notifyEmail} onChange={() => setNotifyEmail(v => !v)} />
              <span className="slider-round" />
            </label>
          </div>

          <div className="zn-card notif-row">
            <h4>SMS</h4>
            <label className="toggle">
              <input type="checkbox" checked={notifySms} onChange={() => setNotifySms(v => !v)} />
              <span className="slider-round" />
            </label>
          </div>

          <div className="zn-card notif-row">
            <h4>Push</h4>
            <label className="toggle">
              <input type="checkbox" checked={notifyPush} onChange={() => setNotifyPush(v => !v)} />
              <span className="slider-round" />
            </label>
          </div>
        </section>
      )}

      <div className="zn-actions">
        <button className="save-btn" onClick={saveSettings}>
          Save and continue
        </button>
        {saved && <div className="saved-toast">Saved ✓</div>}
      </div>
    </div>
  );
}

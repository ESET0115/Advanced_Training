
// // src/pages/EnterpriseLevelPages/EnterpriseDashboard.jsx
// import React from "react";
// import MapComponent from "../../components/MapComponent";
// import "../../styles/ELDashboard.css";

// export default function EnterpriseDashboard() {
//   // sample numbers - replace with dynamic data if/when available
//   const stats = [
//     { id: 1, title: "Total zones", value: 256, icon: "bar-chart" },
//     { id: 2, title: "Total meters", value: 55, icon: "trending-up" },
//     { id: 3, title: "Critical Alerts", value: 26, icon: "alert" },
//     { id: 4, title: "Average Consumption per Zone", value: "26%", icon: "pulse" },
//   ];

//   return (
//     <div className="ed-wrapper">
//       <h2 className="ed-title">Enterprise Dashboard</h2>

//       {/* 4 cards in a row */}
//       <div className="ed-stats-row">
//         {stats.map((s) => (
//           <div className="stat-card" key={s.id}>
//             <div className="stat-icon" aria-hidden>
//               {/* simple decorative circle/icon; you can swap for an SVG/icon */}
//               <div className="stat-icon-inner" />
//             </div>
//             <div className="stat-body">
//               <div className="stat-value">{s.value}</div>
//               <div className="stat-label">{s.title}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Map + alerts section: map takes full width */}
//       <div className="ed-map-row">
//         <div className="ed-map-col">
//           <h3 className="section-subtitle">Geographical Overview</h3>
//           <MapComponent />
//         </div>

//         <div className="ed-alerts-col">
//           <h3 className="section-subtitle">Recent Alerts</h3>
//           <div className="alerts-list">
//             <div className="alert-item">
//               <strong>Alert 1</strong>
//               <div className="alert-desc">a dummy or placeholder text commonly used in graphic design.</div>
//             </div>
//             <div className="alert-item">
//               <strong>Alert 2</strong>
//               <div className="alert-desc">a dummy or placeholder text commonly used in graphic design.</div>
//             </div>
//             <div className="alert-item">
//               <strong>Alert 3</strong>
//               <div className="alert-desc">a dummy or placeholder text commonly used in graphic design.</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import React from "react";
import MapComponent from "../../components/MapComponent";
import "../../styles/ELDashboard.css";

export default function EnterpriseDashboard() {
  const stats = [
    { id: 1, title: "Total zones", value: 256, icon: "📊" },
    { id: 2, title: "Total meters", value: 55, icon: "📈" },
    { id: 3, title: "Critical Alerts", value: 26, icon: "⚠️" },
    { id: 4, title: "Avg. Consumption per Zone", value: "26%", icon: "💡" },
  ];

  return (
    <div className="ed-wrapper">
      {/* Page title */}
      <h2 className="ed-title">Enterprise Dashboard</h2>

      {/* Top stats row */}
      <div className="ed-stats-row">
        {stats.map((s) => (
          <div className="stat-card" key={s.id}>
            <div className="stat-icon">
              <span className="stat-emoji">{s.icon}</span>
            </div>

            <div className="stat-body">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Map + Alerts */}
      <div className="ed-map-row">
        {/* Map Section */}
        <div className="ed-map-col">
          <h3 className="section-subtitle">Geographical Overview</h3>
          <div className="map-card">
            <MapComponent />
          </div>
        </div>

        {/* Alerts Section */}
        <div className="ed-alerts-col">
          <h3 className="section-subtitle">Recent Alerts</h3>

          <div className="alerts-list">
            {[1, 2, 3].map((i) => (
              <div className="alert-item" key={i}>
                <strong>Alert {i}</strong>
                <p className="alert-desc">
                  A dummy or placeholder text commonly used in graphic design.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

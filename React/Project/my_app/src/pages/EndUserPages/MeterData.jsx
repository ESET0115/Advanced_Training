


// import React, { useState } from "react";
// import {
//   LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
// } from "recharts";
// import "../../styles/EUMeterData.css";

// export default function MeterData() {
//   const dayData = [
//     { name: "Mon", current: 320, previous: 280 },
//     { name: "Tue", current: 340, previous: 160 },
//     { name: "Wed", current: 170, previous: 220 },
//     { name: "Thu", current: 310, previous: 290 },
//     { name: "Fri", current: 330, previous: 380 },
//     { name: "Sat", current: 420, previous: 340 },
//     { name: "Sun", current: 400, previous: 290 },
//   ];

//   const weekData = [
//     { name: "Week 1", current: 1500, previous: 1200 },
//     { name: "Week 2", current: 1650, previous: 1350 },
//     { name: "Week 3", current: 1780, previous: 1490 },
//     { name: "Week 4", current: 1900, previous: 1620 },
//   ];

//   const monthData = [
//     { name: "Jan", current: 6000, previous: 5400 },
//     { name: "Feb", current: 5800, previous: 5000 },
//     { name: "Mar", current: 6200, previous: 5600 },
//     { name: "Apr", current: 6400, previous: 6000 },
//     { name: "May", current: 7000, previous: 6600 },
//     { name: "Jun", current: 6900, previous: 6400 },
//     { name: "Jul", current: 7200, previous: 6900 },
//   ];

//   const dataMap = { day: dayData, week: weekData, month: monthData };
//   const [range, setRange] = useState("day");

//   return (
//     <div className="meterdata-container">
//       <h2 className="md-title">Select Date Range</h2>

//       <div className="md-range-buttons">
//         {["day", "week", "month"].map((r) => (
//           <button
//             key={r}
//             className={`md-btn ${range === r ? "active" : ""}`}
//             onClick={() => setRange(r)}
//           >
//             {r.charAt(0).toUpperCase() + r.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="md-chart-wrapper">
//         <ResponsiveContainer width="100%" height={320}>
//           <LineChart data={dataMap[range]}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />

//             <Line type="monotone" dataKey="current" stroke="#a855f7" strokeWidth={2} dot />
//             <Line type="monotone" dataKey="previous" stroke="#d97706" strokeWidth={2} dot />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="md-table-wrapper">
//         <table className="md-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Reading</th>
//               <th>Difference</th>
//               <th>Notes</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr>
//               <td>01 Sep 2025</td>
//               <td>25 kWh</td>
//               <td>25 kWh</td>
//               <td>hello world</td>
//             </tr>

//             {/* blank rows like your UI */}
//             <tr><td colSpan="4">&nbsp;</td></tr>
//             <tr><td colSpan="4">&nbsp;</td></tr>
//             <tr><td colSpan="4">&nbsp;</td></tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../styles/EUMeterData.css";

export default function MeterData() {
  const dayData = [
    { name: "Mon", current: 320, previous: 280 },
    { name: "Tue", current: 340, previous: 160 },
    { name: "Wed", current: 170, previous: 220 },
    { name: "Thu", current: 310, previous: 290 },
    { name: "Fri", current: 330, previous: 380 },
    { name: "Sat", current: 420, previous: 340 },
    { name: "Sun", current: 400, previous: 290 },
  ];

  const weekData = [
    { name: "Week 1", current: 1500, previous: 1200 },
    { name: "Week 2", current: 1650, previous: 1350 },
    { name: "Week 3", current: 1780, previous: 1490 },
    { name: "Week 4", current: 1900, previous: 1620 },
  ];

  const monthData = [
    { name: "Jan", current: 6000, previous: 5400 },
    { name: "Feb", current: 5800, previous: 5000 },
    { name: "Mar", current: 6200, previous: 5600 },
    { name: "Apr", current: 6400, previous: 6000 },
    { name: "May", current: 7000, previous: 6600 },
    { name: "Jun", current: 6900, previous: 6400 },
    { name: "Jul", current: 7200, previous: 6900 },
  ];

  const dataMap = { day: dayData, week: weekData, month: monthData };
  const [range, setRange] = useState("day");

  return (
    <div className="meterdata-container">

      <h1 className="md-page-title">Select Date Range</h1>

      {/* Range Buttons */}
      <div className="md-range-buttons">
        {["day", "week", "month"].map((r) => (
          <button
            key={r}
            className={`md-btn ${range === r ? "active" : ""}`}
            onClick={() => setRange(r)}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Card */}
      <div className="md-card md-chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={dataMap[range]}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--chart-grid)"
            />
            <XAxis
              dataKey="name"
              stroke="var(--text)"
              tick={{ fill: "var(--text-muted)" }}
            />
            <YAxis
              stroke="var(--text)"
              tick={{ fill: "var(--text-muted)" }}
            />

            <Tooltip
              contentStyle={{
                background: "var(--card-bg)",
                border: "1px solid var(--table-border)",
                borderRadius: "10px",
                color: "var(--text)",
              }}
            />

            <Legend wrapperStyle={{ color: "var(--text)" }} />

            <Line
              type="monotone"
              dataKey="current"
              stroke="var(--accent)"
              strokeWidth={3}
              dot={{ fill: "var(--accent)", r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="previous"
              stroke="#d97706"
              strokeWidth={3}
              dot={{ fill: "#d97706", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table Card */}
      <div className="md-card md-table-wrapper">
        <table className="md-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reading</th>
              <th>Difference</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>01 Sep 2025</td>
              <td>25 kWh</td>
              <td>25 kWh</td>
              <td>hello world</td>
            </tr>

            {/* Empty Rows */}
            <tr><td colSpan="4" className="empty-row"></td></tr>
            <tr><td colSpan="4" className="empty-row"></td></tr>
            <tr><td colSpan="4" className="empty-row"></td></tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

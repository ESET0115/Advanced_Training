// import React from 'react'

// export default function MeterData() {
//   return (
//     <div>
//       <h2 className="title">Select Date Range</h2>
//       <div className="card-graph" style={{height:300,display:'flex',alignItems:'center',justifyContent:'center'}}>Usage graph placeholder</div>
//       <div className="table-wrap" style={{marginTop:24}}>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Date</th><th>Reading</th><th>Difference</th><th>Notes</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>01 Sep 2025</td><td>25 kWh</td><td>25 kWh</td><td>hello world</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }



// import React, { useState } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
// } from "recharts";

// const dayData = [
//   { day: "Mon", previous: 260, current: 330 },
//   { day: "Tue", previous: 170, current: 350 },
//   { day: "Wed", previous: 230, current: 180 },
//   { day: "Thu", previous: 280, current: 320 },
//   { day: "Fri", previous: 400, current: 350 },
//   { day: "Sat", previous: 370, current: 430 },
//   { day: "Sun", previous: 290, current: 410 },
//   { day: "Mon", previous: 310, current: 300 }
// ];

// const weekData = [
//   { day: "Week 1", previous: 1800, current: 2100 },
//   { day: "Week 2", previous: 2200, current: 1900 },
//   { day: "Week 3", previous: 2000, current: 2300 },
//   { day: "Week 4", previous: 2500, current: 2400 }
// ];

// const monthData = [
//   { day: "Jan", previous: 5200, current: 6100 },
//   { day: "Feb", previous: 4800, current: 5400 },
//   { day: "Mar", previous: 6000, current: 6500 },
//   { day: "Apr", previous: 6200, current: 5800 },
//   { day: "May", previous: 7100, current: 7500 },
//   { day: "Jun", previous: 6900, current: 7200 }
// ];

// export default function MeterData() {
//   const [activeRange, setActiveRange] = useState("day");

//   const getData = () => {
//     if (activeRange === "week") return weekData;
//     if (activeRange === "month") return monthData;
//     return dayData;
//   };

//   return (
//     <div className="space-y-6">

//       <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
//         Select Date Range
//       </h2>

//       {/* Toggle Buttons */}
//       <div className="flex gap-3 mb-4">
//         {["day", "week", "month"].map((range) => (
//           <button
//             key={range}
//             onClick={() => setActiveRange(range)}
//             className={`px-5 py-2 rounded-full border text-sm transition
//               ${activeRange === range
//                 ? "bg-purple-500 text-white border-purple-500"
//                 : "bg-gray-100 dark:bg-[#0b1220] text-gray-700 dark:text-gray-300 border-gray-300"
//               }`}
//           >
//             {range.charAt(0).toUpperCase() + range.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Chart */}
//       <div className="card-graph p-6 rounded-xl shadow-sm">
//         <ResponsiveContainer width="100%" height={320}>
//           <LineChart data={getData()}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Legend />

//             <Line
//               type="monotone"
//               dataKey="previous"
//               stroke="#d97706"
//               strokeWidth={2}
//               dot={{ r: 5 }}
//               name="Previous"
//             />
//             <Line
//               type="monotone"
//               dataKey="current"
//               stroke="#a855f7"
//               strokeWidth={2}
//               dot={{ r: 5 }}
//               name="Current"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Table */}
//       <div className="table-wrap mt-4">
//         <table className="table">
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

//             {/* Empty rows to keep the UI clean like screenshot */}
//             <tr><td colSpan="4" style={{ height: "35px" }}></td></tr>
//             <tr><td colSpan="4" style={{ height: "35px" }}></td></tr>
//             <tr><td colSpan="4" style={{ height: "35px" }}></td></tr>
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }





import React, { useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
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
      <h2 className="md-title">Select Date Range</h2>

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

      <div className="md-chart-wrapper">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={dataMap[range]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="current" stroke="#a855f7" strokeWidth={2} dot />
            <Line type="monotone" dataKey="previous" stroke="#d97706" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="md-table-wrapper">
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

            {/* blank rows like your UI */}
            <tr><td colSpan="4">&nbsp;</td></tr>
            <tr><td colSpan="4">&nbsp;</td></tr>
            <tr><td colSpan="4">&nbsp;</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React from 'react'

// export default function ReportsAnalytics() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Reports & Analytics</h1>
//         <p className="text-gray-600">View reports and analytics for your zone.</p>
//       </div>
//     </div>
//   )
// }

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "../../styles/ZMReportAnalytics.css";

export default function ReportsAnalytics() {
  /* -------------------------
        1. LINE CHART DATA
  -------------------------- */
  const trendData = [
    { month: "Jan", value: 340 },
    { month: "Feb", value: 360 },
    { month: "Mar", value: 180 },
    { month: "Apr", value: 220 },
    { month: "May", value: 370 },
    { month: "Jun", value: 390 },
    { month: "Jul", value: 280 },
    { month: "Aug", value: 450 },
    { month: "Sep", value: 430 },
    { month: "Oct", value: 310 },
  ];

  /* -------------------------
        2. BAR CHART DATA
  -------------------------- */
  const zones = [
    "Mangalore",
    "Bejai",
    "Pumpwell",
    "PVS",
    "Kotekar",
    "Surathkal",
    "Kankanady",
    "Bajpe",
    "Udupi",
    "Mulki"
  ];


  const allData = {
    2024: [40, 25, 70, 35, 60, 55, 48, 30, 52, 41],
    2025: [60, 30, 90, 45, 70, 68, 54, 33, 60, 50],
    2026: [48, 22, 75, 41, 64, 57, 45, 28, 49, 39],
    2027: [52, 28, 82, 43, 68, 62, 50, 32, 55, 44],
  };


  const [year, setYear] = useState(2025);
  const [search, setSearch] = useState("");

  const filteredZones = zones.filter((z) =>
    z.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = useMemo(() => {
    const values = allData[year];
    return filteredZones.map((zone, idx) => ({
      zone,
      value: values[idx] || 0,
    }));
  }, [filteredZones, year]);

  /* -------------------------
        3. TABLE DATA
  -------------------------- */
  const tableData = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    meterId: i % 2 === 0 ? 123 : 124,
    date: `2025-10-${String((i % 30) + 1).padStart(2, "0")}T07:15:13Z`,
    user: i % 2 === 0 ? "abc" : "xyz",
    consumption: i % 2 === 0 ? "24kWh" : "16kWh",
    status: i % 2 === 0 ? "Active" : "De-Activated",
  }));

  const rowsPerPage = 12;
  const [page, setPage] = useState(1);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return tableData.slice(start, start + rowsPerPage);
  }, [page]);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  /* -------------------------
        4. EXPORT FILES
  -------------------------- */
  const downloadCSV = () => {
    let csv = "Meter ID,Date,User,Consumption,Status\n";
    tableData.forEach((r) => {
      csv += `${r.meterId},${r.date},${r.user},${r.consumption},${r.status}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
  };

  const downloadPDF = () => {
    alert("PDF download mock — integrate jsPDF if needed.");
  };

  return (
    <div className="ra-wrapper">
      <h2 className="ra-title">Reports and Analytics</h2>
      <p className="ra-subtitle">Trend of energy usage over time.</p>

      {/* ----------------------- LINE CHART ----------------------- */}
      <div className="ra-card ra-linechart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", stroke: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ----------------------- ZONE BAR CHART ----------------------- */}
      <div className="ra-card compare-box">
        <div className="compare-header-row">
          <div>
            <h3 className="section-title">Compare zone consumption</h3>
          </div>

          <div className="compare-controls-row">
            <input
              type="text"
              className="filter-input improved"
              placeholder="Search zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="year-nav">
              <button onClick={() => setYear((p) => p - 1)}>‹</button>
              <span>{year}</span>
              <button onClick={() => setYear((p) => p + 1)}>›</button>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10 }}
              barCategoryGap="30%"   // adds spacing between bars
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="value"
                fill="#8b5cf6"
                barSize={38}                // thinner bars
                radius={[20, 20, 6, 6]}     // more pill-like top
              />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* ------------------------- TABLE ------------------------- */}
      <div className="ra-table-section">
        <div className="table-header-row">
          <h3 className="ra-section-title">Reports</h3>

          <div className="ra-export-buttons">
            <button onClick={downloadCSV}>Export CSV</button>
            <button onClick={downloadPDF}>Export PDF</button>
          </div>
        </div>

        <table className="ra-table">
          <thead>
            <tr>
              <th>Meter ID</th>
              <th>Date</th>
              <th>User</th>
              <th>Consumption</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.id}>
                <td>{row.meterId}</td>
                <td>{row.date}</td>
                <td>{row.user}</td>
                <td>{row.consumption}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ra-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ← Previous
          </button>

          {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <span>…</span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next →
          </button>
        </div>
      </div>

    </div>
  );
}

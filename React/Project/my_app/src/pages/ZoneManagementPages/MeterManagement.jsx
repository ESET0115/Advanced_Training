// import React from 'react'

// export default function MeterManagement() {
//   return (
//     <div className="space-y-6">
//       <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Zone Meter Management</h1>
//         <p className="text-gray-600">Manage meters within your zone.</p>
//       </div>

//       <div className="table-wrap">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>MeterID</th><th>Zone</th><th>Owner</th><th>Status</th><th>Last Reading</th><th>More Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.from({length:8}).map((_,i)=> (
//               <tr key={i}>
//                 <td>123</td><td>Mangalore</td><td>abc</td><td>Active</td><td>2025-10-07T07:15:14Z</td>
//                 <td><button className="pill-action">⫶</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <p><b>Note:</b> All bills are generated on the first day of each month.</p>
//       </div>
//     </div>
//   )
// }








import React, { useEffect, useMemo, useState, useRef } from "react";
import { FiMoreVertical, FiDownload, FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "../../styles/ZMMeterManagement.css"; // <-- new file

// helper to generate sample data (100 rows)
const ZONES = ["Mangalore", "Bajpe", "Udupi", "Bengaluru", "Mysore", "PVS"];
function generateSampleMeters(count = 100, startId = 1001) {
  const statuses = ["Active", "De-Activated"];
  const owners = ["abc", "xyz", "sunil", "rita", "ajay", "neha", "mani", "ramesh"];
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push({
      meterId: String(startId + i),
      zone: ZONES[i % ZONES.length],
      owner: owners[i % owners.length],
      status: i % 6 === 4 ? "De-Activated" : "Active", // some deactivated
      lastReading: new Date(2025, (i % 12), 7, 7, 15, 13).toISOString(),
    });
  }
  return rows;
}

export default function MeterManagement() {
  // core data
  const [meters, setMeters] = useState(() => generateSampleMeters(100));
  // UI state
  const [search, setSearch] = useState("");
  const [filterZone, setFilterZone] = useState("All");
  const [actionIndex, setActionIndex] = useState(null); // for per-row menu
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;
  const [importOpen, setImportOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Derived unique zone list
  const zones = useMemo(() => {
    const s = new Set(meters.map((m) => m.zone));
    return ["All", ...Array.from(s)];
  }, [meters]);

  // filter + search
  const filtered = useMemo(() => {
    return meters.filter((m) => {
      const matchZone = filterZone === "All" || m.zone === filterZone;
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        m.meterId.toLowerCase().includes(q) ||
        m.owner.toLowerCase().includes(q) ||
        m.zone.toLowerCase().includes(q);
      return matchZone && matchSearch;
    });
  }, [meters, search, filterZone]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // select handlers
  function toggleSelect(meterId) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(meterId)) n.delete(meterId);
      else n.add(meterId);
      return n;
    });
  }
  function selectAllOnPage(checked) {
    setSelected((prev) => {
      const n = new Set(prev);
      paged.forEach((r) => {
        if (checked) n.add(r.meterId);
        else n.delete(r.meterId);
      });
      return n;
    });
  }

  // bulk deactivate
  function bulkDeactivate() {
    if (selected.size === 0) {
      alert("Please select at least one meter to deactivate.");
      return;
    }
    if (!confirm(`Deactivate ${selected.size} selected meter(s)?`)) return;
    setMeters((prev) =>
      prev.map((m) => (selected.has(m.meterId) ? { ...m, status: "De-Activated" } : m))
    );
    setSelected(new Set());
    setActionIndex(null);
  }

  // single row actions
  function viewMeter(row) {
    alert(`View meter ${row.meterId}\nZone: ${row.zone}\nOwner: ${row.owner}\nStatus: ${row.status}`);
    setActionIndex(null);
  }
  function editMeter(row) {
    const newOwner = prompt("Edit owner name:", row.owner);
    if (newOwner !== null) {
      setMeters((prev) => prev.map((m) => (m.meterId === row.meterId ? { ...m, owner: newOwner } : m)));
    }
    setActionIndex(null);
  }
  function activateMeter(row) {
    const newStatus = row.status === "Active" ? "De-Activated" : "Active";
    setMeters((prev) => prev.map((m) => (m.meterId === row.meterId ? { ...m, status: newStatus } : m)));
    setActionIndex(null);
  }

  // CSV export (all filtered rows)
  function exportCSV() {
    const toExport = filtered.map((r) => ({
      "Meter ID": r.meterId,
      Zone: r.zone,
      Owner: r.owner,
      Status: r.status,
      "Last Reading": r.lastReading,
    }));
    const header = Object.keys(toExport[0] || { "Meter ID": "", Zone: "", Owner: "", Status: "", "Last Reading": "" });
    const csv = [header.join(",")]
      .concat(toExport.map((row) => header.map((h) => `"${(row[h] || "").toString().replace(/"/g, '""')}"`).join(",")))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meters_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // CSV import — expects header row: meterId,zone,owner,status,lastReading
  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length === 0) return;
      const header = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
      const mapping = header.map((h) => h.toLowerCase());
      const added = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]);
        if (cols.length === 0) continue;
        const obj = {};
        for (let j = 0; j < mapping.length; j++) {
          obj[mapping[j]] = cols[j] ? cols[j].replace(/^"|"$/g, "").trim() : "";
        }
        if (!obj.meterid) continue;
        added.push({
          meterId: String(obj.meterid),
          zone: obj.zone || "Unknown",
          owner: obj.owner || "unknown",
          status: obj.status || "Active",
          lastReading: obj.lastreading || new Date().toISOString(),
        });
      }
      if (added.length) {
        setMeters((prev) => [...added, ...prev]);
        alert(`Imported ${added.length} rows`);
      } else {
        alert("No valid rows imported.");
      }
    };
    reader.readAsText(file);
    // reset input
    e.target.value = "";
    setImportOpen(false);
  }

  // basic CSV line parser that handles quoted commas
  function parseCSVLine(line) {
    const result = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"' && line[i + 1] === '"') {
        // escaped quote
        cur += '"';
        i++;
        continue;
      }
      if (ch === '"') {
        inQ = !inQ;
        continue;
      }
      if (ch === "," && !inQ) {
        result.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    result.push(cur);
    return result;
  }

  // small helper for page buttons generation
  function pageButtons() {
    const arr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      // show: 1,2,3,...,last-1,last with current window
      arr.push(1);
      arr.push(2);
      arr.push(3);
      arr.push("...");
      arr.push(totalPages - 1);
      arr.push(totalPages);
    }
    return arr;
  }

  // keyboard/escape to close action menus
  useEffect(() => {
    function onDocClick(e) {
      // close menu if click outside
      setActionIndex(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // stop propagation on menu clicks to keep menu open (we manage open/close manually)
  function stopProp(e) {
    e.stopPropagation();
  }

  return (
    <div className="mm-page">
      <div className="mm-header-row">
        <h2 className="mm-title">Meter Management</h2>
        <div className="mm-actions">
          <button
            className="mm-btn mm-btn-soft"
            onClick={() => {
              fileInputRef.current?.click();
              setImportOpen(true);
            }}
            title="Import CSV"
          >
            <FiUpload /> <span>Import CSV</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="mm-hidden"
            onChange={handleFileUpload}
          />

          <button className="mm-btn mm-btn-soft" onClick={exportCSV} title="Export CSV">
            <FiDownload /> <span>Export CSV</span>
          </button>

          <button
            className="mm-btn mm-btn-danger"
            onClick={bulkDeactivate}
            title="Deactivate selected meters"
          >
            De-Activate meters
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mm-filter-row">
        <div className="mm-filter-left">
          <label className="mm-label">Zone</label>
          <select value={filterZone} onChange={(e) => setFilterZone(e.target.value)} className="mm-select">
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>

        <div className="mm-filter-right">
          <input
            placeholder="Search by meter id, owner or zone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mm-input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mm-table-wrap card border-default">
        <table className="mm-table">
          <thead>
            <tr>
              <th className="mm-th">
                <input
                  type="checkbox"
                  aria-label="select all"
                  onChange={(e) => selectAllOnPage(e.target.checked)}
                  checked={paged.every((r) => selected.has(r.meterId)) && paged.length > 0}
                />
              </th>
              <th className="mm-th">Meter ID</th>
              <th className="mm-th">Zone</th>
              <th className="mm-th">Owner</th>
              <th className="mm-th">Status</th>
              <th className="mm-th">Last Reading</th>
              <th className="mm-th">More Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((row, idx) => (
              <tr key={row.meterId} className="mm-tr">
                <td className="mm-td">
                  <input
                    type="checkbox"
                    checked={selected.has(row.meterId)}
                    onChange={() => toggleSelect(row.meterId)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="mm-td">{row.meterId}</td>
                <td className="mm-td">{row.zone}</td>
                <td className="mm-td">{row.owner}</td>
                <td className={`mm-td ${row.status === "Active" ? "mm-status-active" : "mm-status-deact"}`}>
                  {row.status}
                </td>
                <td className="mm-td">{row.lastReading}</td>
                <td className="mm-td mm-action-cell" onClick={(e) => stopProp(e)}>
                  <FiMoreVertical
                    className="mm-action-icon"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setActionIndex(actionIndex === idx ? null : idx);
                    }}
                  />
                  {actionIndex === idx && (
                    <div className="mm-action-menu" onClick={(ev) => ev.stopPropagation()}>
                      <button className="mm-action-item" onClick={() => viewMeter(row)}>
                        • View
                      </button>
                      <button className="mm-action-item" onClick={() => editMeter(row)}>
                        ✎ Edit
                      </button>
                      <button className="mm-action-item" onClick={() => activateMeter(row)}>
                        ⊘ {row.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td className="mm-td" colSpan={7} style={{ textAlign: "center", padding: "2rem 0" }}>
                  No meters found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mm-pagination">
        <button
          className="mm-page-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ← Previous
        </button>

        {pageButtons().map((b, i) =>
          b === "..." ? (
            <span key={`dot-${i}`} className="mm-page-dots">
              …
            </span>
          ) : (
            <button
              key={b}
              className={b === page ? "mm-page-current" : "mm-page-btn"}
              onClick={() => setPage(b)}
            >
              {b}
            </button>
          )
        )}

        <button
          className="mm-page-btn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next →
        </button>
        <div className="mm-pagination-info">
          <small>
            Showing {(page - 1) * PAGE_SIZE + 1} -{" "}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
          </small>
        </div>
      </div>

      {/* Import preview modal (simple) */}
      {importOpen && (
        <div className="mm-modal-overlay" onClick={() => setImportOpen(false)}>
          <div className="mm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 className="mm-modal-title">Import CSV</h3>
              <button className="mm-icon-btn" onClick={() => setImportOpen(false)}>
                <IoClose />
              </button>
            </div>

            <p className="mm-modal-desc">Select a CSV file with header: meterId,zone,owner,status,lastReading</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input type="file" accept=".csv" onChange={handleFileUpload} />
              <button className="mm-btn" onClick={() => setImportOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

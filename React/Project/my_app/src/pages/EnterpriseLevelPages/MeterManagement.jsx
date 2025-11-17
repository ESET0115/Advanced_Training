// import React from 'react'

// export default function MeterManagement() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Enterprise Meter Management</h1>
//         <p className="text-gray-600">Manage all meters across the enterprise system.</p>
//       </div>
//     </div>
//   )
// }


import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import "../../styles/ELMeterManagement.css";

/* ---------- Small helper: dropdown component (searchable) ---------- */
function FilterDropdown({ label, options, value, onChange, placeholder = "" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fm-dropdown" ref={ref}>
      <button
        className="fm-trigger"
        type="button"
        onClick={() => {
          setOpen((s) => !s);
          setQuery("");
        }}
      >
        <span className="fm-label">{label}</span>
        <span className="fm-value">{value || placeholder}</span>
        <span className="fm-caret">▾</span>
      </button>

      {open && (
        <div className="fm-panel">
          <div className="fm-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
            />
            <button
              className="fm-clear"
              onClick={() => {
                setQuery("");
                onChange("");
              }}
              title="Clear"
            >
              ✕
            </button>
          </div>

          <div className="fm-options" role="listbox">
            <div
              className={`fm-option ${value === "" ? "active" : ""}`}
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              All
            </div>

            {filtered.length === 0 && <div className="fm-empty">No results</div>}

            {filtered.map((opt) => (
              <div
                key={opt}
                className={`fm-option ${value === opt ? "active" : ""}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------ Main Page ------------------------ */
export default function MeterManagement() {
  /* ---------- static data ---------- */
  const zones = [
    "Mangalore",
    "Bejai",
    "Pumpwell",
    "PVS",
    "Kotekar",
    "Bajpe",
    "Deralakatte",
    "Padil",
    "Udupi",
    "Bantwal",
    "Suratkal",
  ];
  const owners = ["abc", "xyz", "ramesh", "neha", "mani"];
  const statuses = ["Active", "De-Activated"];

  // generate table sample rows
  const tableData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      arr.push({
        id: 1000 + i + 1,
        meterId: `${123 + (i % 3)}`,
        zone: zones[i % zones.length],
        owner: owners[i % owners.length],
        status: statuses[i % statuses.length],
        lastReading: `2025-${String(((i % 10) + 1)).padStart(2, "0")}-0${((i%28)+1)}T07:15:13Z`,
      });
    }
    return arr;
  }, []);

  /* ---------- filters & search ---------- */
  const [zoneFilter, setZoneFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [textSearch, setTextSearch] = useState("");

  /* ---------- pagination ---------- */
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(
    tableData.filter((r) => {
      if (zoneFilter && r.zone !== zoneFilter) return false;
      if (ownerFilter && r.owner !== ownerFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (textSearch) {
        const q = textSearch.toLowerCase();
        if (
          !(
            String(r.meterId).includes(q) ||
            r.zone.toLowerCase().includes(q) ||
            r.owner.toLowerCase().includes(q)
          )
        )
          return false;
      }
      return true;
    }).length / rowsPerPage
  );

  const filteredRows = useMemo(() => {
    const f = tableData.filter((r) => {
      if (zoneFilter && r.zone !== zoneFilter) return false;
      if (ownerFilter && r.owner !== ownerFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (textSearch) {
        const q = textSearch.toLowerCase();
        if (
          !(
            String(r.meterId).includes(q) ||
            r.zone.toLowerCase().includes(q) ||
            r.owner.toLowerCase().includes(q)
          )
        )
          return false;
      }
      return true;
    });
    const start = (page - 1) * rowsPerPage;
    return f.slice(start, start + rowsPerPage);
  }, [tableData, zoneFilter, ownerFilter, statusFilter, textSearch, page]);

  useEffect(() => {
    setPage(1); // reset to first page when filters change
  }, [zoneFilter, ownerFilter, statusFilter, textSearch]);

  /* ---------- action menu & modals ---------- */
  const [openActionFor, setOpenActionFor] = useState(null); // id of row that has menu open
  const [viewRow, setViewRow] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  /* ---------- fake delete / edit handlers (mock) ---------- */
  const handleDelete = (id) => {
    // demo: just close
    setShowDeleteConfirm(null);
    setOpenActionFor(null);
    alert(`Mock delete for meter row id ${id} (no backend)`);
  };

  const handleSaveEdit = (row) => {
    setEditRow(null);
    alert("Mock save (no backend). Updated: " + JSON.stringify(row));
  };

  /* ---------- chart data (trend) ---------- */
  const trendData = useMemo(() => {
    // aggregate by zone sample for the current filtered rows: compute a value per zone
    const sample = zones.map((z, idx) => {
      const base = 20 + idx * 6 + (idx % 3) * 8;
      return { zone: z, value: base + (Math.abs(Math.sin(idx * 1.3)) * 40) | 0 };
    });
    return sample;
  }, []);

  /* ---------- CSV export ---------- */
  const exportCSV = () => {
    let csv = "Meter ID,Zone,Owner,Status,LastReading\n";
    const dataToExport = tableData.filter((r) => {
      if (zoneFilter && r.zone !== zoneFilter) return false;
      if (ownerFilter && r.owner !== ownerFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (textSearch) {
        const q = textSearch.toLowerCase();
        if (
          !(
            String(r.meterId).includes(q) ||
            r.zone.toLowerCase().includes(q) ||
            r.owner.toLowerCase().includes(q)
          )
        )
          return false;
      }
      return true;
    });
    dataToExport.forEach((r) => {
      csv += `${r.meterId},${r.zone},${r.owner},${r.status},${r.lastReading}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meters.csv";
    a.click();
  };

  return (
    <div className="elm-wrapper">
      <h2 className="elm-title">Global Meter Management</h2>

      <div className="elm-controls">
        <div className="elm-left-controls">
          <FilterDropdown
            label="Zone"
            options={zones}
            value={zoneFilter}
            onChange={setZoneFilter}
            placeholder="Select zone"
          />
          <FilterDropdown
            label="Owner"
            options={owners}
            value={ownerFilter}
            onChange={setOwnerFilter}
            placeholder="Select owner"
          />
          <FilterDropdown
            label="Status"
            options={statuses}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Select status"
          />

          <div className="elm-searchbox">
            <input
              placeholder="Search meters, owner or zone..."
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
            <button onClick={() => setTextSearch("")} title="Clear search">
              ✕
            </button>
          </div>
        </div>

        <div className="elm-actions">
          <button className="primary-btn" onClick={() => alert("Import mock (no backend)")}>
            ⬆ Import CSV
          </button>
          <button className="secondary-btn" onClick={exportCSV}>
            ⬇ Export CSV
          </button>
        </div>
      </div>

      <div className="elm-table-wrap card">
        <table className="elm-table">
          <thead>
            <tr>
              <th>Meter ID</th>
              <th>Zone</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Last Reading</th>
              <th>More Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((r) => (
              <tr key={r.id}>
                <td>{r.meterId}</td>
                <td>{r.zone}</td>
                <td>{r.owner}</td>
                <td>
                  <span className={`status-pill ${r.status === "Active" ? "active" : "deact"}`}>
                    {r.status}
                  </span>
                </td>
                <td>{r.lastReading}</td>
                <td className="actions-col">
                  <button
                    className="more-btn"
                    onClick={() => setOpenActionFor(openActionFor === r.id ? null : r.id)}
                    aria-haspopup="true"
                    aria-expanded={openActionFor === r.id}
                  >
                    ⋯
                  </button>

                  {openActionFor === r.id && (
                    <div className="action-menu">
                      <div
                        className="action-row"
                        onClick={() => {
                          setViewRow(r);
                          setOpenActionFor(null);
                        }}
                      >
                        View
                      </div>
                      <div
                        className="action-row"
                        onClick={() => {
                          setEditRow(r);
                          setOpenActionFor(null);
                        }}
                      >
                        Edit
                      </div>
                      <div
                        className="action-row danger"
                        onClick={() => {
                          setShowDeleteConfirm(r.id);
                          setOpenActionFor(null);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">
                  No meters found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* pagination */}
        <div className="elm-pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ← Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: Math.min(totalPages || 1, 7) }).map((_, i) => {
              const idx = i + 1;
              return (
                <button
                  key={idx}
                  className={page === idx ? "active" : ""}
                  onClick={() => setPage(idx)}
                >
                  {idx}
                </button>
              );
            })}
            {totalPages > 7 && <span className="dots"> … </span>}
            {totalPages > 7 && (
              <button onClick={() => setPage(totalPages)}>{totalPages}</button>
            )}
          </div>

          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next →
          </button>
        </div>
      </div>

      {/* trend chart */}
      <div className="elm-trend card">
        <h3 className="trend-title">Each zone's trend of energy usage over time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={trendData} margin={{ top: 8, right: 20, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
            <XAxis dataKey="zone" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="var(--accent)" fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* View Modal */}
      {viewRow && (
        <div className="elm-modal-backdrop">
          <div className="elm-modal">
            <h3>Meter — {viewRow.meterId}</h3>
            <div className="modal-grid">
              <div><strong>Zone</strong><div>{viewRow.zone}</div></div>
              <div><strong>Owner</strong><div>{viewRow.owner}</div></div>
              <div><strong>Status</strong><div>{viewRow.status}</div></div>
              <div><strong>Last reading</strong><div>{viewRow.lastReading}</div></div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setViewRow(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editRow && (
        <EditModal
          initial={editRow}
          onClose={() => setEditRow(null)}
          onSave={(r) => handleSaveEdit(r)}
          zones={zones}
          owners={owners}
          statuses={statuses}
        />
      )}

      {/* Delete confirm */}
      {showDeleteConfirm && (
        <div className="elm-modal-backdrop">
          <div className="elm-modal small">
            <h3>Delete meter</h3>
            <p>Are you sure you want to delete this meter? This cannot be undone.</p>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="danger" onClick={() => handleDelete(showDeleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Edit modal extracted for clarity ---------- */
function EditModal({ initial, onClose, onSave, zones, owners, statuses }) {
  const [form, setForm] = useState({ ...initial });

  return (
    <div className="elm-modal-backdrop">
      <div className="elm-modal">
        <h3>Edit Meter — {initial.meterId}</h3>

        <div className="edit-grid">
          <label>
            Zone
            <select
              value={form.zone}
              onChange={(e) => setForm((s) => ({ ...s, zone: e.target.value }))}
            >
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </label>

          <label>
            Owner
            <select
              value={form.owner}
              onChange={(e) => setForm((s) => ({ ...s, owner: e.target.value }))}
            >
              {owners.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            Last reading
            <input
              value={form.lastReading}
              onChange={(e) => setForm((s) => ({ ...s, lastReading: e.target.value }))}
            />
          </label>
        </div>

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="primary"
            onClick={() => {
              onSave(form);
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

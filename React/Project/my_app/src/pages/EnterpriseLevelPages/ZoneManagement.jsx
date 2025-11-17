// import React from 'react'

// export default function ZoneManagement() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Zone Management</h1>
//         <p className="text-gray-600">Manage zones across the enterprise system.</p>
//       </div>
//     </div>
//   )
// }


import React, { useMemo, useState, useEffect, useRef } from "react";
import "../../styles/ELZoneManagement.css";

const initialZones = [
  { id: 123, name: "Mangalore", admin: "abc", totalMeters: 5, status: "Active", location: "Mangalore, KA", description: "Central zone" },
  { id: 124, name: "Bajpe", admin: "xyz", totalMeters: 23, status: "De-Activated", location: "Bajpe, KA", description: "Airport area" },
  { id: 125, name: "Bejai", admin: "john", totalMeters: 8, status: "Active", location: "Bejai, KA", description: "Residential" },
  { id: 126, name: "Pumpwell", admin: "rita", totalMeters: 12, status: "Active", location: "Pumpwell, KA", description: "Market" },
  { id: 127, name: "PVS", admin: "mani", totalMeters: 7, status: "Active", location: "PVS, KA", description: "Industrial" },
  { id: 128, name: "Kotekar", admin: "ram", totalMeters: 11, status: "Active", location: "Kotekar, KA", description: "Suburban" },
  { id: 129, name: "Udupi", admin: "arun", totalMeters: 4, status: "Active", location: "Udupi, KA", description: "Coastal" },
  { id: 130, name: "Mysore", admin: "neha", totalMeters: 18, status: "De-Activated", location: "Mysore, KA", description: "Outskirts" },
  // add more so pagination looks normal
  { id: 131, name: "Kundapura", admin: "sara", totalMeters: 9, status: "Active", location: "Kundapura, KA", description: "" },
  { id: 132, name: "Manipal", admin: "tony", totalMeters: 6, status: "Active", location: "Manipal, KA", description: "" },
  { id: 133, name: "Puttur", admin: "hema", totalMeters: 2, status: "Active", location: "Puttur, KA", description: "" },
  { id: 134, name: "Bantwal", admin: "ajay", totalMeters: 3, status: "Active", location: "Bantwal, KA", description: "" },
];

export default function ZoneManagement() {
  const [zones, setZones] = useState(initialZones);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  // modals / UI state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);

  // add/edit form state
  const emptyForm = { id: "", name: "", admin: "", totalMeters: 0, status: "Active", location: "", description: "" };
  const [form, setForm] = useState(emptyForm);

  // refs for closing action menu on outside click
  const actionRef = useRef(null);

  // filter & pagination
  const filtered = useMemo(() => {
    if (!query.trim()) return zones;
    const q = query.toLowerCase();
    return zones.filter(
      (z) =>
        String(z.id).includes(q) ||
        z.name.toLowerCase().includes(q) ||
        z.admin.toLowerCase().includes(q) ||
        (z.location || "").toLowerCase().includes(q)
    );
  }, [zones, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages]);

  const displayed = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  // close action menu clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setActionMenuOpenFor(null);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // keyboard close for modals
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setIsAddOpen(false);
        setIsEditOpen(false);
        setIsViewOpen(false);
        setActionMenuOpenFor(null);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ACTIONS
  function openAdd() {
    setForm({ ...emptyForm, id: Math.max(...zones.map(z=>z.id)) + 1 });
    setIsAddOpen(true);
  }

  function submitAdd(e) {
    e.preventDefault();
    const newZone = { ...form, id: Number(form.id), totalMeters: Number(form.totalMeters) };
    setZones((s) => [newZone, ...s]);
    setIsAddOpen(false);
    setPage(1);
  }

  function openView(zone) {
    setActiveZone(zone);
    setIsViewOpen(true);
    setActionMenuOpenFor(null);
  }

  function openEdit(zone) {
    setForm({ ...zone });
    setIsEditOpen(true);
    setActionMenuOpenFor(null);
  }

  function submitEdit(e) {
    e.preventDefault();
    setZones((list) => list.map((z) => (z.id === form.id ? { ...form, id: Number(form.id), totalMeters: Number(form.totalMeters) } : z)));
    setIsEditOpen(false);
  }

  function doDelete(zone) {
    setActionMenuOpenFor(null);
    if (confirm(`Delete zone "${zone.name}"?`)) {
      setZones((list) => list.filter((z) => z.id !== zone.id));
    }
  }

  function toggleStatus(zone) {
    setZones((list) => list.map((z) => (z.id === zone.id ? { ...z, status: z.status === "Active" ? "De-Activated" : "Active" } : z)));
    setActionMenuOpenFor(null);
  }

  // helpers
  const resetForms = () => {
    setForm(emptyForm);
    setActiveZone(null);
  };

  // small pagination helpers shown like screenshot
  const pageButtons = () => {
    const out = [];
    const max = totalPages;
    const start = Math.max(1, page - 2);
    const end = Math.min(max, page + 2);
    for (let i = start; i <= end; i++) out.push(i);
    return out;
  };

  return (
    <div className="ezm-wrapper">
      <div className="ezm-header">
        <h2>Zone management</h2>
        <div className="ezm-controls">
          <button className="btn btn-add" onClick={openAdd}>＋ Add zone</button>
        </div>
      </div>

      <div className="ezm-tools">
        <div className="ezm-search">
          <input placeholder="Search zone / admin / id..." value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} />
        </div>
        <div className="ezm-filler" />
      </div>

      <div className="ezm-table-wrap card">
        <table className="ezm-table" role="table">
          <thead>
            <tr>
              <th>Zone ID</th>
              <th>Zone name</th>
              <th>Admin assigned</th>
              <th>Total Meters</th>
              <th>Status</th>
              <th className="col-actions">More Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayed.map((z) => (
              <tr key={z.id}>
                <td>{z.id}</td>
                <td>{z.name}</td>
                <td>{z.admin}</td>
                <td>{z.totalMeters}</td>
                <td>
                  <span className={`status-pill ${z.status === "Active" ? "active" : "deact"}`}>{z.status}</span>
                </td>
                <td className="col-actions">
                  <div className="action-wrap" ref={actionRef}>
                    <button className="three-dots" onClick={(ev)=>{ ev.stopPropagation(); setActionMenuOpenFor(actionMenuOpenFor===z.id ? null : z.id); }}>
                      ⋮
                    </button>

                    {actionMenuOpenFor === z.id && (
                      <div className="action-menu" role="menu" aria-label={`Actions for ${z.name}`}>
                        <button onClick={()=>openView(z)}>● View</button>
                        <button onClick={()=>openEdit(z)}>✎ Edit</button>
                        <button onClick={()=>{ toggleStatus(z); }}>{z.status === "Active" ? "⦿ De-Activate" : "⦿ Activate"}</button>
                        <button className="danger" onClick={()=>doDelete(z)}>🗑 Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {displayed.length === 0 && (
              <tr><td colSpan={6} className="empty">No zones found.</td></tr>
            )}
          </tbody>
        </table>

        {/* pagination */}
        <div className="ezm-pagination">
          <button disabled={page === 1} onClick={()=>setPage(p=>Math.max(1,p-1))}>← Previous</button>

          {pageButtons().map((p) => (
            <button key={p} className={p===page ? "active" : ""} onClick={()=>setPage(p)}>{p}</button>
          ))}

          {totalPages > 5 && <span className="dots">…</span>}

          <button disabled={page === totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next →</button>
        </div>
      </div>

      {/* ==========================
          View Modal (centered)
         ========================== */}
      {isViewOpen && activeZone && (
        <div className="ezm-modal-backdrop" onClick={()=>{ setIsViewOpen(false); setActiveZone(null); }}>
          <div className="ezm-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Zone details</h3>
              <button className="close" onClick={()=>{ setIsViewOpen(false); setActiveZone(null); }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-row"><strong>Zone ID</strong><span>{activeZone.id}</span></div>
              <div className="detail-row"><strong>Name</strong><span>{activeZone.name}</span></div>
              <div className="detail-row"><strong>Admin</strong><span>{activeZone.admin}</span></div>
              <div className="detail-row"><strong>Total meters</strong><span>{activeZone.totalMeters}</span></div>
              <div className="detail-row"><strong>Status</strong><span>{activeZone.status}</span></div>
              <div className="detail-row"><strong>Location</strong><span>{activeZone.location}</span></div>
              <div className="detail-row"><strong>Description</strong><span>{activeZone.description}</span></div>
            </div>
            <div className="modal-actions">
              <button onClick={()=>{ setIsViewOpen(false); setActiveZone(null); }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================
          Add / Edit slide-in drawer
         ========================== */}
      <div className={`ezm-drawer ${isAddOpen || isEditOpen ? "open" : ""}`} role="dialog" aria-hidden={!(isAddOpen||isEditOpen)}>
        <div className="drawer-header">
          <h3>{isAddOpen ? "Add zone" : "Edit zone"}</h3>
          <button className="close" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); resetForms(); }}>✕</button>
        </div>

        <form className="drawer-body" onSubmit={isAddOpen ? submitAdd : submitEdit}>
          <label>
            Zone name
            <input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
          </label>

          <label>
            Zone ID
            <input required type="number" value={form.id} onChange={(e)=>setForm({...form, id: e.target.value})} />
          </label>

          <label>
            Admin
            <input value={form.admin} onChange={(e)=>setForm({...form, admin: e.target.value})} />
          </label>

          <label>
            Total meters
            <input type="number" value={form.totalMeters} onChange={(e)=>setForm({...form, totalMeters: e.target.value})} />
          </label>

          <label>
            Status
            <select value={form.status} onChange={(e)=>setForm({...form, status: e.target.value})}>
              <option>Active</option>
              <option>De-Activated</option>
            </select>
          </label>

          <label>
            Location
            <input value={form.location} onChange={(e)=>setForm({...form, location: e.target.value})} />
          </label>

          <label>
            Description
            <textarea value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} />
          </label>

          <div className="drawer-actions">
            <button type="button" className="btn ghost" onClick={()=>{ setIsAddOpen(false); setIsEditOpen(false); resetForms(); }}>Cancel</button>
            <button type="submit" className="btn primary">{isAddOpen ? "Add zone" : "Save changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

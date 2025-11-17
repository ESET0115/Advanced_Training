// import React from 'react'

// export default function UserRoleManagement() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">User & Role Management</h1>
//         <p className="text-gray-600">Manage users and their roles across the enterprise system.</p>
//       </div>
//     </div>
//   )
// }

import React, { useMemo, useState, useRef } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "../../styles/ELUserRoleManagement.css";

/**
 * Enterprise User & Role Management (JSX)
 * - Static sample data
 * - Search + role filter
 * - Export CSV
 * - Invite user modal
 * - Edit user modal
 * - Row actions menu
 * - Pagination
 * - Small chart below
 *
 * Paste this file to: src/pages/EnterpriseLevelPages/UserRoleManagement.jsx
 */

const SAMPLE_USERS = [
  { id: 123, name: "abc", email: "abc@gmail.com", role: "Admin", status: "Active", zone: "Mangalore" },
  { id: 124, name: "xyz", email: "xyz@gmail.com", role: "User", status: "De-Activated", zone: "Bajpe" },
  { id: 125, name: "abc2", email: "abc2@gmail.com", role: "User", status: "Active", zone: "Pumpwell" },
  { id: 126, name: "xyz2", email: "xyz2@gmail.com", role: "Manager", status: "De-Activated", zone: "Kotekar" },
  // add more so pagination looks realistic
  { id: 127, name: "sam", email: "sam@example.com", role: "Admin", status: "Active", zone: "Padil" },
  { id: 128, name: "leena", email: "leena@example.com", role: "User", status: "Active", zone: "Udupi" },
  { id: 129, name: "nina", email: "nina@example.com", role: "User", status: "De-Activated", zone: "Bantwal" },
  { id: 130, name: "roy", email: "roy@example.com", role: "Manager", status: "Active", zone: "Suratkal" },
  { id: 131, name: "tara", email: "tara@example.com", role: "User", status: "Active", zone: "Kotekar" },
  { id: 132, name: "aziz", email: "aziz@example.com", role: "User", status: "Active", zone: "Mangalore" },
  { id: 133, name: "maya", email: "maya@example.com", role: "User", status: "De-Activated", zone: "Padil" },
  { id: 134, name: "ravi", email: "ravi@example.com", role: "Admin", status: "Active", zone: "Pumpwell" },
  { id: 135, name: "john", email: "john@example.com", role: "User", status: "Active", zone: "Udupi" },
];

const ROWS_PER_PAGE = 8;

export default function UserRoleManagement() {
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [actionsOpenRow, setActionsOpenRow] = useState(null);
  const actionsRef = useRef({});

  // Chart data (Active vs Deactivated)
  const [chartYear, setChartYear] = useState(2025);
  const chartData = useMemo(() => {
    const active = users.filter((u) => u.status === "Active").length;
    const deact = users.length - active;
    return [
      { category: "Active", value: active },
      { category: "De-Activated", value: deact },
    ];
  }, [users, chartYear]);
  

  // Unique roles list
  const roles = useMemo(() => ["All", ...Array.from(new Set(users.map((u) => u.role)))], [users]);

  // Filtered results
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== "All" && u.role !== roleFilter) return false;
      if (!q) return true;
      return (
        String(u.id).includes(q) ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.zone && u.zone.toLowerCase().includes(q))
      );
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  // CSV export
  const exportCSV = () => {
    const header = ["User ID", "Name", "Email", "Role", "Zone", "Status"];
    const rows = users.map((u) => [u.id, u.name, u.email, u.role, u.zone || "", u.status]);
    const csv = [header, ...rows].map((r) => r.map(String).map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "users_export.csv";
    a.click();
  };

  // Invite user
  const [inviteForm, setInviteForm] = useState({ email: "", role: "User", zone: "" });
  const submitInvite = (e) => {
    e.preventDefault();
    const newUser = {
      id: Math.floor(1000 + Math.random() * 9000),
      name: inviteForm.email.split("@")[0],
      email: inviteForm.email,
      role: inviteForm.role,
      zone: inviteForm.zone,
      status: "Active",
    };
    setUsers((s) => [newUser, ...s]);
    setInviteOpen(false);
    setInviteForm({ email: "", role: "User", zone: "" });
    setPage(1);
  };

  // Edit user handlers
  const openEdit = (user) => {
    setEditingUser({ ...user });
    setEditOpen(true);
  };
  const saveEdit = () => {
    setUsers((list) => list.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditOpen(false);
    setEditingUser(null);
  };

  // Toggle active/deactivate
  const toggleStatus = (userId) => {
    setUsers((list) => list.map((u) => (u.id === userId ? { ...u, status: u.status === "Active" ? "De-Activated" : "Active" } : u)));
    setActionsOpenRow(null);
  };

  // Row actions menu
  const toggleRowActions = (id) => {
    if (actionsOpenRow === id) setActionsOpenRow(null);
    else setActionsOpenRow(id);
  };

  // close menus when clicking outside (basic)
  React.useEffect(() => {
    const onDoc = (e) => {
      // if click is outside any action menu, close
      if (!Object.values(actionsRef.current).some((el) => el && el.contains(e.target))) {
        setActionsOpenRow(null);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="urm-wrapper">
      <div className="urm-header-row">
        <h2 className="urm-title">User and Role Management</h2>

        <div className="urm-actions">
          <button className="btn btn-export" onClick={exportCSV}>⬇ Export as CSV</button>
          <button className="btn btn-invite" onClick={() => setInviteOpen(true)}>👤 Invite user</button>
        </div>
      </div>

      {/* Filters */}
      <div className="urm-filters">
        <input
          className="filter-search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="filter-select" value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="urm-table-wrap">
        <table className="urm-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>More Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td className="urm-actions-cell">
                  <button className="more-btn" onClick={(ev) => { ev.stopPropagation(); toggleRowActions(u.id); }}>
                    ⋮
                  </button>

                  {actionsOpenRow === u.id && (
                    <div className="row-actions-pop" ref={(el) => (actionsRef.current[u.id] = el)}>
                      <button onClick={() => { setActionsOpenRow(null); alert(`View ${u.name} (mock)`); }}>View</button>
                      <button onClick={() => { setActionsOpenRow(null); openEdit(u); }}>Edit</button>
                      <button className="danger" onClick={() => toggleStatus(u.id)}>{u.status === "Active" ? "Deactivate" : "Activate"}</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr><td colSpan="6" className="no-data">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="urm-pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← Previous</button>

        <div className="urm-page-numbers">
          {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => (
            <button key={i} className={page === i + 1 ? "active" : ""} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          {totalPages > 7 && <span className="dots">…</span>}
        </div>

        <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next →</button>
      </div>

      {/* Chart area */}
      <div className="urm-chart-card">
        <div className="chart-header">
          <div className="chart-title">Comparison between Active and De-Active users on each year</div>
          <div className="chart-year-controls">
            <button onClick={() => setChartYear((y) => y - 1)}>‹</button>
            <div className="year-box">{chartYear}</div>
            <button onClick={() => setChartYear((y) => y + 1)}>›</button>
          </div>
        </div>

        <div className="chart-body">
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                </linearGradient>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0.15}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* two areas (we have two points only) - render a single area with pill styling */}
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#purpleGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invite Modal */}
      {inviteOpen && (
        <div className="modal-backdrop" onClick={() => setInviteOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Invite user</h3>
            <p className="muted">This is a dialogue for inviting user.</p>
            <form onSubmit={submitInvite} className="modal-form">
              <label>Email</label>
              <input type="email" required value={inviteForm.email} onChange={(e) => setInviteForm((s) => ({ ...s, email: e.target.value }))} />

              <label>Role</label>
              <select value={inviteForm.role} onChange={(e) => setInviteForm((s) => ({ ...s, role: e.target.value }))}>
                <option>Admin</option>
                <option>User</option>
                <option>Manager</option>
              </select>

              <label>Zone</label>
              <input value={inviteForm.zone} onChange={(e) => setInviteForm((s) => ({ ...s, zone: e.target.value }))} />

              <div className="modal-actions">
                <button type="button" onClick={() => setInviteOpen(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Invite user</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && editingUser && (
        <div className="modal-backdrop" onClick={() => setEditOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Edit User</h3>
            <p className="muted">Update user details.</p>

            <div className="modal-form">
              <label>Name</label>
              <input value={editingUser.name} onChange={(e) => setEditingUser((s) => ({ ...s, name: e.target.value }))} />
              <label>Email</label>
              <input value={editingUser.email} onChange={(e) => setEditingUser((s) => ({ ...s, email: e.target.value }))} />
              <label>Role</label>
              <select value={editingUser.role} onChange={(e) => setEditingUser((s) => ({ ...s, role: e.target.value }))}>
                <option>Admin</option>
                <option>User</option>
                <option>Manager</option>
              </select>
              <label>Zone</label>
              <input value={editingUser.zone} onChange={(e) => setEditingUser((s) => ({ ...s, zone: e.target.value }))} />
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setEditOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

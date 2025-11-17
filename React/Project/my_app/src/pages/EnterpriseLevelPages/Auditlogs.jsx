// import React from 'react'

// export default function Auditlogs() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Audit Logs</h1>
//         <p className="text-gray-600">View system audit logs and user activities.</p>
//       </div>
//     </div>
//   )
// }


// import React, { useState } from "react";
// import "../../styles/ELAuditLogs.css";

// export default function AuditLogs() {
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [search, setSearch] = useState("");
//   const [openActionMenu, setOpenActionMenu] = useState(null);

//   const logs = [
//     { id: 123, timestamp: "2025-10-07T07:15:13Z", user: "abc", resource: "Meter", status: "Active" },
//     { id: 123, timestamp: "2025-10-07T07:15:13Z", user: "abc", resource: "Zone", status: "Active" },
//     { id: 124, timestamp: "2025-10-07T07:15:13Z", user: "xyz", resource: "meter", status: "Active" },
//     { id: 124, timestamp: "2025-10-07T07:15:13Z", user: "xyz", resource: "zone", status: "De-Activated" },
//     { id: 124, timestamp: "2025-10-07T07:15:13Z", user: "xyz", resource: "user", status: "De-Activated" },
//   ];

//   const filteredLogs = logs.filter(
//     (l) =>
//       (statusFilter === "All" || l.status === statusFilter) &&
//       (l.user.toLowerCase().includes(search.toLowerCase()) ||
//         l.resource.toLowerCase().includes(search.toLowerCase()))
//   );

//   return (
//     <div className="audit-wrapper">
//       <h2 className="audit-title">Audit Logs</h2>

//       <div className="audit-top-row">
//         {/* Status filter dropdown */}
//         <div className="audit-filter">
//           <button className="audit-filter-btn">
//             {statusFilter}
//             <span className="arrow">▾</span>
//           </button>
//           <div className="audit-filter-menu">
//             <div onClick={() => setStatusFilter("All")}>All</div>
//             <div onClick={() => setStatusFilter("Active")}>Active</div>
//             <div onClick={() => setStatusFilter("De-Activated")}>De-Activated</div>
//           </div>
//         </div>

//         {/* Search bar */}
//         <div className="audit-search">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         {/* Export buttons */}
//         <button className="export-btn">⬇ Export as CSV</button>
//         <button className="export-btn">⬇ Export as PDF</button>
//       </div>

//       {/* Table */}
//       <div className="audit-table-container">
//         <table className="audit-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Timestamp</th>
//               <th>User</th>
//               <th>Resource</th>
//               <th>Status</th>
//               <th>More Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredLogs.map((log, index) => (
//               <tr key={index}>
//                 <td>{log.id}</td>
//                 <td>{log.timestamp}</td>
//                 <td>{log.user}</td>
//                 <td>{log.resource}</td>
//                 <td>{log.status}</td>

//                 <td className="action-cell">
//                   <button
//                     className="dots-btn"
//                     onClick={() => setOpenActionMenu(openActionMenu === index ? null : index)}
//                   >
//                     ⋮
//                   </button>

//                   {openActionMenu === index && (
//                     <div className="action-menu">
//                       <div>View</div>
//                       <div>Edit</div>
//                       <div className="delete">Delete</div>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="audit-pagination">
//         <button className="page-btn disabled">← Previous</button>
//         <button className="page-number active">1</button>
//         <button className="page-number">2</button>
//         <button className="page-number">3</button>
//         <span className="dots">...</span>
//         <button className="page-number">67</button>
//         <button className="page-number">68</button>
//         <button className="page-btn">Next →</button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "../../styles/ELAuditLogs.css";

export default function AuditLogs() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Modal States
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const logsList = [
    { id: 123, timestamp: "2025-10-07T07:15:13Z", user: "abc", resource: "Meter", status: "Active" },
    { id: 123, timestamp: "2025-10-07T07:15:13Z", user: "abc", resource: "Zone", status: "Active" },
    { id: 124, timestamp: "2025-10-07T07:15:13Z", user: "xyz", resource: "meter", status: "Active" },
    { id: 124, timestamp: "2025-10-07T07:15:13Z", user: "xyz", resource: "zone", status: "De-Activated" },
  ];

  const [logs, setLogs] = useState(logsList);

  const filteredLogs = logs.filter(
    (l) =>
      (statusFilter === "All" || l.status === statusFilter) &&
      (l.user.toLowerCase().includes(search.toLowerCase()) ||
        l.resource.toLowerCase().includes(search.toLowerCase()))
  );

  // --- MODAL ACTIONS ---
  const openView = (row) => setViewData(row);
  const openEdit = (row) => setEditData({ ...row });
  const openDelete = (row) => setDeleteData(row);

  const saveEdit = () => {
    setLogs((p) => p.map((l) => (l.id === editData.id ? editData : l)));
    setEditData(null);
  };

  const confirmDelete = () => {
    setLogs((p) => p.filter((l) => l.id !== deleteData.id));
    setDeleteData(null);
  };

  return (
    <div className="audit-wrapper">
      <h2 className="audit-title">Audit Logs</h2>

      <div className="audit-top-row">
        {/* Status filter dropdown */}
        <div className="audit-filter">
          <button className="audit-filter-btn">
            {statusFilter}
            <span className="arrow">▾</span>
          </button>
          <div className="audit-filter-menu">
            <div onClick={() => setStatusFilter("All")}>All</div>
            <div onClick={() => setStatusFilter("Active")}>Active</div>
            <div onClick={() => setStatusFilter("De-Activated")}>De-Activated</div>
          </div>
        </div>

        {/* Search bar */}
        <div className="audit-search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Export buttons */}
        <button className="export-btn">⬇ Export as CSV</button>
        <button className="export-btn">⬇ Export as PDF</button>
      </div>

      {/* TABLE */}
      <div className="audit-table-container">
        <table className="audit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>User</th>
              <th>Resource</th>
              <th>Status</th>
              <th>More Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log, i) => (
              <tr key={i}>
                <td>{log.id}</td>
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td>{log.resource}</td>
                <td>{log.status}</td>

                <td className="action-cell">
                  <button
                    className="dots-btn"
                    onClick={() =>
                      setOpenActionMenu(openActionMenu === i ? null : i)
                    }
                  >
                    ⋮
                  </button>

                  {openActionMenu === i && (
                    <div className="action-menu">
                      <div onClick={() => openView(log)}>View</div>
                      <div onClick={() => openEdit(log)}>Edit</div>
                      <div className="delete" onClick={() => openDelete(log)}>
                        Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="audit-pagination">
        <button className="page-btn disabled">← Previous</button>
        <button className="page-number active">1</button>
        <button className="page-number">2</button>
        <button className="page-number">3</button>
        <span className="dots">...</span>
        <button className="page-number">67</button>
        <button className="page-number">68</button>
        <button className="page-btn">Next →</button>
      </div>

      {/* ============= VIEW MODAL ============= */}
      {viewData && (
        <div className="modal-overlay" onClick={() => setViewData(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>View Log Details</h3>
            <p><b>ID:</b> {viewData.id}</p>
            <p><b>User:</b> {viewData.user}</p>
            <p><b>Resource:</b> {viewData.resource}</p>
            <p><b>Status:</b> {viewData.status}</p>
            <p><b>Timestamp:</b> {viewData.timestamp}</p>

            <button className="close-btn" onClick={() => setViewData(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ============= EDIT MODAL ============= */}
      {editData && (
        <div className="modal-overlay" onClick={() => setEditData(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Log</h3>

            <label>User</label>
            <input
              value={editData.user}
              onChange={(e) => setEditData({ ...editData, user: e.target.value })}
            />

            <label>Resource</label>
            <input
              value={editData.resource}
              onChange={(e) => setEditData({ ...editData, resource: e.target.value })}
            />

            <label>Status</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="De-Activated">De-Activated</option>
            </select>

            <button className="save-btn" onClick={saveEdit}>Save</button>
          </div>
        </div>
      )}

      {/* ============= DELETE MODAL ============= */}
      {deleteData && (
        <div className="modal-overlay" onClick={() => setDeleteData(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete log ID <b>{deleteData.id}</b>?</p>

            <button className="delete-btn" onClick={confirmDelete}>Delete</button>
            <button className="close-btn" onClick={() => setDeleteData(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

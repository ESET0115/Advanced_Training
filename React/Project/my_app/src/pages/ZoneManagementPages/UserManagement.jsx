
// import React, { useState, useMemo } from "react";
// import { FiMoreVertical, FiX, FiChevronDown } from "react-icons/fi";
// import "../../styles/ZMUserManagement.css"; // you will create this

// const SORT_FIELDS = ["Name", "Email", "Roles", "Zone", "Status"];

// const MOCK_USERS = [
//   { id: 1001, name: "user1", email: "user1@example.com", role: "role 1", zone: "Mangalore", status: "Active" },
//   { id: 1002, name: "user2", email: "user2@example.com", role: "role 2", zone: "Bajpe", status: "De-Activated" },
//   { id: 1003, name: "user3", email: "user3@example.com", role: "role 3", zone: "Mysore", status: "Active" },
//   { id: 1004, name: "user4", email: "user4@example.com", role: "role 1", zone: "Udupi", status: "Active" },
//   { id: 1005, name: "user5", email: "user5@example.com", role: "role 2", zone: "Bengaluru", status: "De-Activated" },
// ];

// export default function UserManagement() {
//   const [sortOpen, setSortOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("Name");

//   const [search, setSearch] = useState("");
//   const [showSearchList, setShowSearchList] = useState(false);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [openActionMenu, setOpenActionMenu] = useState(null);

//   const filtered = useMemo(() => {
//     return MOCK_USERS.filter((u) =>
//       u.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search]);

//   const sorted = useMemo(() => {
//     const key = sortBy.toLowerCase();
//     return [...filtered].sort((a, b) => (a[key] > b[key] ? 1 : -1));
//   }, [filtered, sortBy]);

//   return (
//     <div className="page-container">
//       <h1 className="page-title">User Management</h1>

//       {/* ========================== FILTERS ROW ========================== */}
//       <div className="filters-row">

//         {/* SORT DROPDOWN */}
//         <div className="sort-wrapper">
//           <button
//             className="sort-btn"
//             onClick={() => setSortOpen(!sortOpen)}
//           >
//             {sortBy} <FiChevronDown />
//           </button>

//           {sortOpen && (
//             <div className="sort-dropdown">
//               {SORT_FIELDS.map((field) => (
//                 <button
//                   key={field}
//                   className="sort-option"
//                   onClick={() => {
//                     setSortBy(field);
//                     setSortOpen(false);
//                   }}
//                 >
//                   {field}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* SEARCH BAR */}
//         <div className="search-wrapper">
//           <input
//             className="search-input"
//             placeholder="Search user"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setShowSearchList(true);
//             }}
//           />
//           {search && (
//             <FiX
//               className="search-clear"
//               onClick={() => {
//                 setSearch("");
//                 setShowSearchList(false);
//               }}
//             />
//           )}

//           {/* SEARCH AUTOCOMPLETE */}
//           {showSearchList && search && (
//             <div className="search-dropdown">
//               {filtered.slice(0, 5).map((u) => (
//                 <button
//                   key={u.id}
//                   className="search-suggestion"
//                   onClick={() => {
//                     setSearch(u.name);
//                     setShowSearchList(false);
//                   }}
//                 >
//                   {u.name}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* INVITE USER BUTTON */}
//         <button className="invite-btn" onClick={() => setModalOpen(true)}>
//           + Invite user
//         </button>
//       </div>

//       {/* ========================== TABLE ========================== */}
//       <div className="table-wrapper">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Zone</th><th>Status</th><th>More Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sorted.map((u) => (
//               <tr key={u.id}>
//                 <td>{u.id}</td>
//                 <td>{u.name}</td>
//                 <td>{u.email}</td>
//                 <td>{u.role}</td>
//                 <td>{u.zone}</td>
//                 <td>{u.status}</td>

//                 {/* ACTION DROPDOWN */}
//                 <td className="action-cell">
//                   <FiMoreVertical
//                     className="action-icon"
//                     onClick={() =>
//                       setOpenActionMenu(openActionMenu === u.id ? null : u.id)
//                     }
//                   />

//                   {openActionMenu === u.id && (
//                     <div className="action-dropdown">
//                       <button>Edit</button>
//                       <button>Activate</button>
//                       <button className="danger">Reset password</button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ========================== INVITE USER MODAL ========================== */}
//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Invite user</h2>
//             <p className="modal-sub">This is a dialogue for inviting user.</p>

//             <label>Email</label>
//             <input className="modal-input" placeholder="user@gmail.com" />

//             <label>Role</label>
//             <input className="modal-input" placeholder="role" />

//             <label>Zone</label>
//             <input className="modal-input" placeholder="mangalore" />

//             <button className="modal-submit">Invite user</button>

//             <FiX
//               className="modal-close"
//               onClick={() => setModalOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/ZMUserManagement.css";

/**
 * UserManagement.jsx
 * Fully client-side, static-data mock of the User Management page.
 *
 * Features:
 * - Static dataset (100 rows) generated automatically
 * - Search (global on name/email/role/zone)
 * - Sort filter selector (Name/Email/Role)
 * - Pagination (12 rows per page)
 * - Per-row "More actions" menu (View, Edit, Activate/De-Activate)
 * - Invite User modal (adds new user at top)
 * - View & Edit modal
 * - Activate / De-Activate toggling
 *
 * NOTE: No external icon libraries are required
 */

/* --- helpers: generate 100 sample users --- */
const ROLES = ["role 1", "role 2", "role 3"];
const ZONES = ["Mangalore", "Bajpe", "Bengaluru", "Udupi", "Mysore"];
const STATUSES = ["Active", "De-Activated"];

function generateUsers(count = 100, startId = 1001) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const name = `user-${i + 1}`;
    const email = `user${i + 1}@example.com`;
    const role = ROLES[i % ROLES.length];
    const zone = ZONES[i % ZONES.length];
    const status = STATUSES[i % STATUSES.length];
    arr.push({
      id,
      name,
      email,
      role,
      zone,
      status,
    });
  }
  return arr;
}

export default function UserManagement() {
  const PAGE_SIZE = 12;

  const [users, setUsers] = useState(() => generateUsers(100));
  const [filterBy, setFilterBy] = useState("Name"); // Name / Email / Role
  const [searchValue, setSearchValue] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchSugOpen, setSearchSugOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  // per-row action menu
  const [actionOpenIndex, setActionOpenIndex] = useState(null);
  const actionRefs = useRef({});

  // modals
  const [inviteOpen, setInviteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // invite form
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
    zone: "",
    name: "",
  });

  // edit form (populated when editing)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    zone: "",
  });

  // Close menus on outside click
  useEffect(() => {
    function onDoc(e) {
      // close sort dropdown if clicked outside
      setSortOpen((prev) => {
        if (!prev) return false;
        // if button contains target, keep open
        const btn = document.querySelector(".sort-btn");
        if (btn && btn.contains(e.target)) return prev;
        return false;
      });

      // search suggestions
      setSearchSugOpen((prev) => {
        if (!prev) return false;
        const wrapper = document.querySelector(".search-wrapper");
        if (wrapper && wrapper.contains(e.target)) return prev;
        return false;
      });

      // action menus: if click outside any action menu, close them
      const anyAction = Object.values(actionRefs.current).some((el) =>
        el ? el.contains(e.target) : false
      );
      if (!anyAction) setActionOpenIndex(null);
    }

    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // Derived: filtered users
  // const filtered = useMemo(() => {
  //   if (!searchValue) return users;
  //   const q = searchValue.toLowerCase().trim();
  //   return users.filter((u) =>
  //     [u.name, u.email, u.role, u.zone].some((s) =>
  //       String(s).toLowerCase().includes(q)
  //     )
  //   );
  // }, [users, searchValue]);

  const filtered = useMemo(() => {
    // 1. Apply search
    let arr = [...users];
    if (searchValue.trim() !== "") {
      const q = searchValue.toLowerCase().trim();
      arr = arr.filter((u) =>
        [u.name, u.email, u.role, u.zone].some((s) =>
          String(s).toLowerCase().includes(q)
        )
      );
    }
  
    // 2. Apply sorting
    if (filterBy === "Name") {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterBy === "Email") {
      arr.sort((a, b) => a.email.localeCompare(b.email));
    } else if (filterBy === "Role") {
      arr.sort((a, b) => a.role.localeCompare(b.role));
    }
  
    return arr;
  }, [users, searchValue, filterBy]);


  // pagination slice
  const pageData = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return filtered.slice(from, from + PAGE_SIZE);
  }, [filtered, page]);

  // search suggestions (simple unique recent matching names)
  const suggestions = useMemo(() => {
    if (!searchValue) return [];
    const q = searchValue.toLowerCase().trim();
    const set = new Set();
    for (let u of users) {
      if (set.size >= 6) break;
      if (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.zone.toLowerCase().includes(q)
      ) {
        set.add(u.name);
      }
    }
    return Array.from(set);
  }, [searchValue, users]);

  // helpers: open menus/modal
  function openActionMenu(index) {
    setActionOpenIndex((prev) => (prev === index ? null : index));
  }

  function openView(user) {
    setSelectedUser(user);
    setViewOpen(true);
  }
  function openEdit(user) {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      zone: user.zone,
    });
    setEditOpen(true);
  }

  function toggleActivate(userId) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === "Active" ? "De-Activated" : "Active" } : u
      )
    );
    setActionOpenIndex(null);
  }

  // invite submit
  function submitInvite(e) {
    e?.preventDefault();
    const name = inviteForm.name?.trim() || inviteForm.email.split("@")[0] || "new-user";
    const nextId = Math.max(...users.map((u) => u.id)) + 1;
    const newUser = {
      id: nextId,
      name,
      email: inviteForm.email || `user${nextId}@example.com`,
      role: inviteForm.role || "role 1",
      zone: inviteForm.zone || "Mangalore",
      status: "Active",
    };
    setUsers((prev) => [newUser, ...prev]);
    setInviteOpen(false);
    setInviteForm({ email: "", role: "", zone: "", name: "" });
    setPage(1); // show newest
  }

  // edit submit
  function submitEdit(e) {
    e?.preventDefault();
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, ...editForm } : u
      )
    );
    setEditOpen(false);
    setSelectedUser(null);
  }

  // change page guard
  useEffect(() => {
    // if page is out of range due to filtering, reset
    const newTotal = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (page > newTotal) setPage(1);
  }, [filtered, page]);

  /* ---------------- rendering ---------------- */
  return (
    <div className="page-container">
      <h1 className="page-title">User Management</h1>

      <div className="filters-row">
        <div className="sort-wrapper">
          <button
            className="sort-btn"
            onClick={() => setSortOpen((s) => !s)}
            aria-haspopup="true"
            aria-expanded={sortOpen}
          >
            <span>{filterBy}</span>
            <span style={{ opacity: 0.6, marginLeft: 8 }}>▾</span>
          </button>

          {sortOpen && (
            <div className="sort-dropdown" role="menu">
              {["Name", "Email", "Role"].map((opt) => (
                <button
                  key={opt}
                  className="sort-option"
                  onClick={() => {
                    setFilterBy(opt);
                    setSortOpen(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder={`Search`}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPage(1);
              setSearchSugOpen(true);
            }}
            onFocus={() => setSearchSugOpen(true)}
          />
          {searchValue && (
            <button
              className="search-clear"
              onClick={() => {
                setSearchValue("");
                setSearchSugOpen(false);
              }}
              aria-label="clear"
            >
              ✕
            </button>
          )}

          {searchSugOpen && suggestions.length > 0 && (
            <div className="search-dropdown" role="listbox">
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="search-suggestion"
                  onClick={() => {
                    setSearchValue(s);
                    setSearchSugOpen(false);
                    setPage(1);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="invite-btn"
          onClick={() => setInviteOpen(true)}
          title="Invite user"
        >
          + Invite user
        </button>
      </div>

      <div className="table-wrapper" style={{ marginTop: 18 }}>
        <table className="table" role="table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Zone</th>
              <th>Status</th>
              <th style={{ width: 120 }}>More Actions</th>
            </tr>
          </thead>

          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 28, textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              pageData.map((u, idx) => {
                const globalIdx = (page - 1) * PAGE_SIZE + idx;
                return (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.zone}</td>
                    <td className={u.status === "De-Activated" ? "status-deact" : ""}>
                      {u.status}
                    </td>
                    <td className="action-cell">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openActionMenu(globalIdx);
                        }}
                        aria-haspopup="true"
                        aria-expanded={actionOpenIndex === globalIdx}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 20,
                        }}
                      >
                        ⋮
                      </button>

                      {actionOpenIndex === globalIdx && (
                        <div
                          ref={(el) => (actionRefs.current[globalIdx] = el)}
                          className="action-dropdown"
                        >
                          <button
                            onClick={() => {
                              openView(u);
                              setActionOpenIndex(null);
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              openEdit(u);
                              setActionOpenIndex(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              toggleActivate(u.id);
                            }}
                          >
                            {u.status === "Active" ? "De-Activate" : "Activate"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* pagination controls */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            className="pill-action"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>

          {/* show up to first 5 page buttons then ellipsis then last */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {Array.from({ length: Math.min(5, Math.max(1, totalPages)) }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  className={page === p ? "um-page-current" : "um-page-btn"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              );
            })}

            {totalPages > 6 && <span style={{ padding: "0 8px" }}>…</span>}

            {totalPages > 6 && (
              <>
                <button className="um-page-btn" onClick={() => setPage(totalPages - 1)}>
                  {totalPages - 1}
                </button>
                <button className="um-page-btn" onClick={() => setPage(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            className="pill-action"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      </div>

      {/* ---------------- INVITE MODAL ---------------- */}
      {inviteOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setInviteOpen(false)}
              aria-label="close"
            >
              ✕
            </button>
            <h2>Invite user</h2>
            <div className="modal-sub">This is a dialogue for inviting user.</div>

            <form onSubmit={submitInvite} className="modal-body">
              <div className="modal-field">
                <label>email</label>
                <input
                  className="modal-input"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="modal-field">
                <label>role</label>
                <input
                  className="modal-input"
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  placeholder="role 1"
                />
              </div>

              <div className="modal-field">
                <label>zone</label>
                <input
                  className="modal-input"
                  value={inviteForm.zone}
                  onChange={(e) => setInviteForm({ ...inviteForm, zone: e.target.value })}
                  placeholder="Mangalore"
                />
              </div>

              <div className="modal-field">
                <label>name</label>
                <input
                  className="modal-input"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="Full Name (optional)"
                />
              </div>

              <button type="submit" className="modal-submit">
                + Invite user
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- VIEW MODAL ---------------- */}
      {viewOpen && selectedUser && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setViewOpen(false);
            setSelectedUser(null);
          }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 420 }}
          >
            <button
              className="modal-close"
              onClick={() => {
                setViewOpen(false);
                setSelectedUser(null);
              }}
            >
              ✕
            </button>
            <h2>View user</h2>
            <div className="modal-sub">Details</div>

            <div className="modal-body">
              <div className="detail-row">
                <div className="detail-label">Name</div>
                <div className="detail-value">{selectedUser.name}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Email</div>
                <div className="detail-value">{selectedUser.email}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Role</div>
                <div className="detail-value">{selectedUser.role}</div>
              </div>
              <div className="detail-row" style={{ borderBottom: "none" }}>
                <div className="detail-label">Zone</div>
                <div className="detail-value">{selectedUser.zone}</div>
              </div>

              <div style={{ marginTop: 14 }}>
                <button
                  className="modal-submit"
                  onClick={() => {
                    setViewOpen(false);
                    openEdit(selectedUser);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {editOpen && selectedUser && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setEditOpen(false);
            setSelectedUser(null);
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => {
                setEditOpen(false);
                setSelectedUser(null);
              }}
            >
              ✕
            </button>

            <h2>Edit user</h2>
            <div className="modal-sub">Update fields and click Save</div>

            <form onSubmit={submitEdit} className="modal-body">
              <div className="modal-field">
                <label>Name</label>
                <input
                  className="modal-input"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label>Email</label>
                <input
                  className="modal-input"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label>Role</label>
                <input
                  className="modal-input"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label>Zone</label>
                <input
                  className="modal-input"
                  value={editForm.zone}
                  onChange={(e) => setEditForm({ ...editForm, zone: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="pill-action"
                  onClick={() => {
                    setEditOpen(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="modal-submit" style={{ flex: 1 }}>
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

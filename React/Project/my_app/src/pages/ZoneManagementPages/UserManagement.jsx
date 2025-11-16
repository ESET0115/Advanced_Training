// import React from 'react'

// export default function UserManagement() {
//   return (
//     <div className="space-y-6">
//   <div className="card">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Zone User Management</h1>
//         <p className="text-gray-600">Manage users within your zone.</p>
//       </div>
//     </div>
//   )
// }







// src/pages/ZoneManagementPages/UserManagement.jsx


import React, { useState, useMemo } from "react";
import { FiMoreVertical, FiX } from "react-icons/fi";
import "../../styles/ZMUserManagement.css"; // create this for small dropdown styling if needed

const MOCK_USERS = [
  { id: 1001, name: "user-1", email: "user1@example.com", role: "role 1", zone: "Mangalore", status: "Active" },
  { id: 1002, name: "user-2", email: "user2@example.com", role: "role 2", zone: "Bajpe", status: "De-Activated" },
  { id: 1003, name: "user-3", email: "user3@example.com", role: "role 3", zone: "Bengaluru", status: "Active" },
  { id: 1004, name: "user-4", email: "user4@example.com", role: "role 1", zone: "Udupi", status: "Active" },
  { id: 1005, name: "user-5", email: "user5@example.com", role: "role 2", zone: "Mysore", status: "De-Activated" },
  { id: 1006, name: "user-6", email: "user6@example.com", role: "role 3", zone: "Mangalore", status: "Active" },
  { id: 1007, name: "user-7", email: "user7@example.com", role: "role 1", zone: "Bajpe", status: "Active" },
  { id: 1008, name: "user-8", email: "user8@example.com", role: "role 2", zone: "Bengaluru", status: "Active" },
  { id: 1009, name: "user-9", email: "user9@example.com", role: "role 3", zone: "Udupi", status: "Active" },
  { id: 1010, name: "user-10", email: "user10@example.com", role: "role 1", zone: "Bengaluru", status: "De-Activated" },
  { id: 1011, name: "user-11", email: "user11@example.com", role: "role 2", zone: "Mangalore", status: "Active" },
  { id: 1012, name: "user-12", email: "user12@example.com", role: "role 3", zone: "Bajpe", status: "Active" },
];

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [openMenuId, setOpenMenuId] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
    );
  }, [filtered, sortBy]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="page-container">
      <h1 className="page-title">User Management</h1>

      {/* Filters */}
      <div className="filters-row">
        {/* sort dropdown */}
        <div className="relative">
          <select
            className="border px-4 py-2 rounded-md bg-[var(--card-bg)] text-[var(--text)]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="zone">Zone</option>
            <option value="role">Role</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* search */}
        <div className="relative">
          <input
            className="border px-4 py-2 rounded-md w-64 bg-[var(--card-bg)] text-[var(--text)]"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <FiX
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>

        {/* Invite user */}
        <button className="ml-auto px-4 py-2 rounded-md bg-[var(--card-bg)] border text-[var(--text)] flex items-center gap-2">
          + Invite user
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Zone</th>
              <th>Status</th>
              <th>More Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.zone}</td>
                <td>{u.status}</td>
                <td className="more-actions-cell relative">
                  <FiMoreVertical
                    className="cursor-pointer"
                    onClick={() =>
                      setOpenMenuId(openMenuId === u.id ? null : u.id)
                    }
                  />

                  {openMenuId === u.id && (
                    <div className="absolute right-0 mt-2 bg-[var(--card-bg)] border rounded-md shadow-md w-32 z-50">
                      <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                        View
                      </button>
                      <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                        Edit
                      </button>
                      <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                        Activate
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button
          className="px-4 py-2 border rounded-md bg-[var(--card-bg)]"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-2 rounded-md border ${
              page === i + 1
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card-bg)] text-[var(--text)]"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 border rounded-md bg-[var(--card-bg)]"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

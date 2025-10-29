import React from 'react'

export default function MeterManagement() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Zone Meter Management</h1>
        <p className="text-gray-600">Manage meters within your zone.</p>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>MeterID</th><th>Zone</th><th>Owner</th><th>Status</th><th>Last Reading</th><th>More Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length:8}).map((_,i)=> (
              <tr key={i}>
                <td>123</td><td>Mangalore</td><td>abc</td><td>Active</td><td>2025-10-07T07:15:14Z</td>
                <td><button className="pill-action">⫶</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><b>Note:</b> All bills are generated on the first day of each month.</p>
      </div>
    </div>
  )
}

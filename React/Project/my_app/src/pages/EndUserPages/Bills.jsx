import React from 'react'

export default function Bills() {
  return (
    <div>
      <h2 className="title">My Bills</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Month</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length:4}).map((_,i)=> (
              <tr key={i}>
                <td>Sep 2025</td><td>1230.00</td><td>12 Oct</td><td>Pending</td>
                <td><button className="pill-action">View / Pay</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><b>Note:</b> All bills are generated on the first day of each month.</p>
      </div>
    </div>
  )
}



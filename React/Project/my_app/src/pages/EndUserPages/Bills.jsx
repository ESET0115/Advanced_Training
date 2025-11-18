// import React from 'react'

// export default function Bills() {
//   return (
//     <div>
//       <h2 className="title">My Bills</h2>
//       <div className="table-wrap">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Month</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.from({length:4}).map((_,i)=> (
//               <tr key={i}>
//                 <td>Sep 2025</td><td>1230.00</td><td>12 Oct</td><td>Pending</td>
//                 <td><button className="pill-action">View / Pay</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <p><b>Note:</b> All bills are generated on the first day of each month.</p>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { useTranslation } from 'react-i18next'
import '../../styles/EUBills.css'  // reuse some dashboard styles

export default function Bills() {
  const { t } = useTranslation()

  // demo rows - replace with real data later
  const rows = [
    { month: 'Sep 2025', amount: '₹1230.00', due: '12 Oct', status: 'Pending' },
    { month: 'Aug 2025', amount: '₹980.00', due: '12 Sep', status: 'Pending' },
    { month: 'Jul 2025', amount: '₹1125.00', due: '12 Aug', status: 'Paid' },
    { month: 'Jun 2025', amount: '₹1010.00', due: '12 Jul', status: 'Pending' }
  ]

  const statusClass = (s) => {
    if (!s) return ''
    return s.toLowerCase().includes('paid') ? 'status-paid' : 'status-pending'
  }

  return (
    <div className="bills-page page-section">
      <h1 className="page-title">My Bills</h1>

      <div className="bills-card">
        <div className="bills-table-wrap">
          <table className="bills-table" role="table" aria-label="My bills">
            <thead>
              <tr>
                <th>{t('month') || 'Month'}</th>
                <th>{t('amount') || 'Amount'}</th>
                <th>{t('dueDate') || 'Due Date'}</th>
                <th>{t('status') || 'Status'}</th>
                <th className="col-actions">{t('actions') || 'Actions'}</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.month}</td>
                  <td>{r.amount}</td>
                  <td>{r.due}</td>
                  <td>
                    <span className={`status-pill ${statusClass(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="col-actions">
                    <button className="btn-primary-pill">View / Pay</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="bills-note"><strong>Note:</strong> All bills are generated on the first day of each month.</p>
      </div>
    </div>
  )
}

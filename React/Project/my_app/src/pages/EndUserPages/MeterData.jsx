import React from 'react'

export default function MeterData() {
  return (
    <div>
      <h2 className="title">Select Date Range</h2>
      <div className="card-graph" style={{height:300,display:'flex',alignItems:'center',justifyContent:'center'}}>Usage graph placeholder</div>
      <div className="table-wrap" style={{marginTop:24}}>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th><th>Reading</th><th>Difference</th><th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01 Sep 2025</td><td>25 kWh</td><td>25 kWh</td><td>hello world</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}



import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const analyticsData = [
  { time: '00:00', value: 350 },
  { time: '04:00', value: 180 },
  { time: '08:00', value: 220 },
  { time: '12:00', value: 350 },
  { time: '16:00', value: 380 },
  { time: '20:00', value: 270 },
  { time: '24:00', value: 420 },
  { time: '28:00', value: 390 },
  { time: '32:00', value: 300 }
]

export default function ZoneDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Zone Dashboard Header */}
  <div className="card">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Zone Dashboard</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Zone: {user?.zone || 'Mangalore Zone'}</span>
          <span>•</span>
          <span>Last updated: 10:45 AM</span>
        </div>
      </div>

      {/* Zone Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-2xl">🤖</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">256</div>
              <div className="text-sm text-gray-600">Active meters</div>
            </div>
          </div>
        </div>

  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-2xl">📈</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">55%</div>
              <div className="text-sm text-gray-600">Avg usage</div>
            </div>
          </div>
        </div>

  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-2xl">⚠️</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">26</div>
              <div className="text-sm text-gray-600">Pending alert</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
  <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Analytics Chart</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium">
              ✓ Week
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
              Month
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" domain={[0, 500]} />
              <Tooltip 
                formatter={(value, name) => [`${value}`, 'Usage']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--accent)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-3 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <span className="text-xl">⊕</span>
          <span className="font-medium">Add meter</span>
        </button>
        <button className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <span className="text-xl">⚙</span>
          <span className="font-medium">Generate Report</span>
        </button>
      </div>
    </div>
  )
}

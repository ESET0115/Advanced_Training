import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const consumptionData = [
  { day: 'Mon', consumption: 457, percentage: 19.4 },
  { day: 'Tue', consumption: 346, percentage: 14.8 },
  { day: 'Wed', consumption: 222, percentage: 9.4 },
  { day: 'Thu', consumption: 230, percentage: 9.8 },
  { day: 'Fri', consumption: 81, percentage: 3.4 },
  { day: 'Sat', consumption: 293, percentage: 12.5 },
  { day: 'Sun', consumption: 364, percentage: 15.5 },
  { day: 'Mon', consumption: 228, percentage: 9.3 },
  { day: 'Tue', consumption: 65, percentage: 2.8 }
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col items-start">
  <h1 className="page-title text-3xl font-bold text-gray-900 mb-2 dark:text-white">Welcome, {user?.name || 'User'}</h1>
        
        {/* First line: Date and Zone */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-1 dark:text-gray-400">
            <span>As of Oct 5, 2025</span>
            <span>•</span>
            <span>Zone: {user?.zone || 'Bangalore North'}</span>
        </div>
        
        {/* Second line: Sync time and Data Source */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Last synced at 10:45 AM</span>
            <span>•</span>
            <span>Data Source: Smart Meter #{user?.meterId || '1023'}</span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">⚡</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">256 kWh</div>
              <div className="text-sm text-gray-600">Current Consumption</div>
            </div>
          </div>
        </div>

          <div className="card border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">⏰</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">₹1,230</div>
              <div className="text-sm text-gray-600">Due on 12 Oct</div>
            </div>
          </div>
        </div>

          <div className="card border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600">⚠️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">₹120</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

          <div className="card border-l-4 border-purple-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">✔️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">₹1,200</div>
              <div className="text-sm text-gray-600">Paid on 10 Sep</div>
            </div>
          </div>
        </div>
      </div>

      {/* Electricity Consumption Overview */}
        <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Electricity Consumption Overview</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium">
              Day
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
              Week
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
              Month
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" domain={[0, 500]} />
              <Tooltip 
                formatter={(value, name) => [`${value} kWh`, 'Consumption']}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="var(--accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--accent)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
        <div className="card">
  <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <span className="text-blue-600 text-xl">💰</span>
            <span className="font-medium text-gray-800">Pay Bill</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <span className="text-green-600 text-xl">📄</span>
            <span className="font-medium text-gray-800">View Bill History</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <span className="text-purple-600 text-xl">📊</span>
            <span className="font-medium text-gray-800">View Detailed Usage</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <span className="text-orange-600 text-xl">⚙️</span>
            <span className="font-medium text-gray-800">Manage Notifications</span>
          </button>
        </div>
      </div>
    </div>
  )
}



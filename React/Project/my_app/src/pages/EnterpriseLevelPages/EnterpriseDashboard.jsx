import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function EnterpriseDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Enterprise Dashboard Header */}
  <div className="card">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Enterprise Dashboard</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>System Overview</span>
          <span>•</span>
          <span>Last updated: 10:45 AM</span>
        </div>
      </div>

      {/* Enterprise Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-2xl">📊</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">256</div>
              <div className="text-sm text-gray-600">Total zones</div>
            </div>
          </div>
        </div>

  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-2xl">📈</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">55</div>
              <div className="text-sm text-gray-600">Total meters</div>
            </div>
          </div>
        </div>

  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">26</div>
              <div className="text-sm text-gray-600">Critical Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metric */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-2xl">📊</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">26%</div>
              <div className="text-sm text-gray-600">Average Consumption per Zone</div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
  <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Geographical Overview</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <div className="text-gray-600">Map View</div>
              <div className="text-sm text-gray-500 mt-2">Mangaluru Zone</div>
            </div>
            
            {/* Map markers */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-red-500 rounded-full"></div>
            
            {/* Popup */}
            <div className="absolute top-12 left-12 card-compact">
              <div className="text-sm font-semibold">Mangalore zone</div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-blue-600">⚡</span>
                  <span className="text-xs">12</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600">⏰</span>
                  <span className="text-xs">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts Section */}
  <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Alerts</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-xl">⛶</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alert List */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Alert List</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((alert) => (
                <div key={alert} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="text-sm text-gray-700">
                    Alert {alert}: a dummy or placeholder text commonly used in gr...
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Detail */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Alert Details</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-lg">⚠️</span>
                </div>
                <span className="font-medium text-gray-800">Alert 2</span>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                a dummy or placeholder text commonly used in graphic design, publishing, and web development. Its purpose is to permit a page layout to be designed.
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                  <span>👍</span>
                  <span>Acknowledge</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                  <span>👎</span>
                  <span>Dismiss</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

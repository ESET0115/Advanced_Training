
// import React from 'react'
// import { useAuth } from '../../hooks/useAuth'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// import { useTranslation } from 'react-i18next'

// const consumptionData = [
//   { day: 'Mon', consumption: 457, percentage: 19.4 },
//   { day: 'Tue', consumption: 346, percentage: 14.8 },
//   { day: 'Wed', consumption: 222, percentage: 9.4 },
//   { day: 'Thu', consumption: 230, percentage: 9.8 },
//   { day: 'Fri', consumption: 81, percentage: 3.4 },
//   { day: 'Sat', consumption: 293, percentage: 12.5 },
//   { day: 'Sun', consumption: 364, percentage: 15.5 },
//   { day: 'Mon', consumption: 228, percentage: 9.3 },
//   { day: 'Tue', consumption: 65, percentage: 2.8 }
// ]

// export default function Dashboard() {
//   const { user } = useAuth()
//   const { t } = useTranslation()

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="flex flex-col items-start">
//         <h1 className="page-title text-3xl font-bold text-gray-900 mb-2 dark:text-white">
//           {t('welcome')}, {user?.name || t('user')}
//         </h1>

//         {/* Date and Zone */}
//         <div className="flex items-center gap-4 text-sm text-gray-600 mb-1 dark:text-gray-400">
//           <span>{t('asOfDate', { date: 'Oct 5, 2025' })}</span>
//           <span>•</span>
//           <span>{t('zone')}: {user?.zone || 'Bangalore North'}</span>
//         </div>

//         {/* Sync Info */}
//         <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//           <span>{t('lastSynced', { time: '10:45 AM' })}</span>
//           <span>•</span>
//           <span>{t('dataSource')}: {t('smartMeter')} #{user?.meterId || '1023'}</span>
//         </div>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="card border-l-4 border-blue-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <span className="text-blue-600">⚡</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800">256 kWh</div>
//               <div className="text-sm text-gray-600">{t('currentConsumption')}</div>
//             </div>
//           </div>
//         </div>

//         <div className="card border-l-4 border-green-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//               <span className="text-green-600">⏰</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800">₹1,230</div>
//               <div className="text-sm text-gray-600">{t('dueOn', { date: '12 Oct' })}</div>
//             </div>
//           </div>
//         </div>

//         <div className="card border-l-4 border-yellow-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
//               <span className="text-yellow-600">⚠️</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800">₹120</div>
//               <div className="text-sm text-gray-600">{t('pending')}</div>
//             </div>
//           </div>
//         </div>

//         <div className="card border-l-4 border-purple-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//               <span className="text-purple-600">✔️</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800">₹1,200</div>
//               <div className="text-sm text-gray-600">{t('paidOn', { date: '10 Sep' })}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Electricity Consumption Overview */}
//       <div className="card">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//             {t('electricityOverview')}
//           </h2>
//           <div className="flex gap-2">
//             <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium">
//               {t('day')}
//             </button>
//             <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
//               {t('week')}
//             </button>
//             <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200">
//               {t('month')}
//             </button>
//           </div>
//         </div>

//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={consumptionData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//               <XAxis dataKey="day" stroke="#666" />
//               <YAxis stroke="#666" domain={[0, 500]} />
//               <Tooltip
//                 formatter={(value) => [`${value} kWh`, t('consumption')]}
//                 labelFormatter={(label) => `${t('day')}: ${label}`}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="consumption"
//                 stroke="var(--accent)"
//                 strokeWidth={3}
//                 dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 4 }}
//                 activeDot={{ r: 6, stroke: 'var(--accent)', strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="card">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
//           {t('quickActions')}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
//             <span className="text-blue-600 text-xl">💰</span>
//             <span className="font-medium text-gray-800">{t('payBill')}</span>
//           </button>
//           <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
//             <span className="text-green-600 text-xl">📄</span>
//             <span className="font-medium text-gray-800">{t('viewBillHistory')}</span>
//           </button>
//           <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
//             <span className="text-purple-600 text-xl">📊</span>
//             <span className="font-medium text-gray-800">{t('viewDetailedUsage')}</span>
//           </button>
//           <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
//             <span className="text-orange-600 text-xl">⚙️</span>
//             <span className="font-medium text-gray-800">{t('manageNotifications')}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }














// import React, { useMemo, useState } from 'react'
// import { useAuth } from '../../hooks/useAuth'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts'
// import { useTranslation } from 'react-i18next'
// import '../../styles/EUDashboard.css'

// export default function Dashboard() {
//   const { user } = useAuth()
//   const { t } = useTranslation()
//   const [range, setRange] = useState('day') // 'day' | 'week' | 'month'

//   // --- datasets for day / week / month ---
//   const dayData = [
//     { day: 'Mon', consumption: 457 },
//     { day: 'Tue', consumption: 346 },
//     { day: 'Wed', consumption: 222 },
//     { day: 'Thu', consumption: 230 },
//     { day: 'Fri', consumption: 81 },
//     { day: 'Sat', consumption: 293 },
//     { day: 'Sun', consumption: 364 }
//   ]

//   // weekly example (7 weeks)
//   const weekData = [
//     { day: 'Wk1', consumption: 1800 },
//     { day: 'Wk2', consumption: 2100 },
//     { day: 'Wk3', consumption: 2000 },
//     { day: 'Wk4', consumption: 2350 },
//     { day: 'Wk5', consumption: 1900 },
//     { day: 'Wk6', consumption: 2480 },
//     { day: 'Wk7', consumption: 2250 }
//   ]

//   // monthly example (10 months)
//   const monthData = [
//     { day: 'Jan', consumption: 8500 },
//     { day: 'Feb', consumption: 8200 },
//     { day: 'Mar', consumption: 9200 },
//     { day: 'Apr', consumption: 9800 },
//     { day: 'May', consumption: 8800 },
//     { day: 'Jun', consumption: 10200 },
//     { day: 'Jul', consumption: 9500 },
//     { day: 'Aug', consumption: 10400 },
//     { day: 'Sep', consumption: 10900 },
//     { day: 'Oct', consumption: 10600 }
//   ]

//   // choose dataset based on selected range
//   const chartData = useMemo(() => {
//     if (range === 'day') return dayData
//     if (range === 'week') return weekData
//     return monthData
//   }, [range])

//   // helper to style active range buttons
//   const rangeBtnClass = (btn) =>
//     `px-4 py-2 rounded-lg text-sm font-medium focus:outline-none ${
//       range === btn
//         ? 'bg-black text-white dark:bg-white/10 dark:text-white'
//         : 'bg-gray-900/5 text-gray-800 hover:bg-gray-900/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5'
//     }`

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="flex flex-col items-start">
//         <h1 className="page-title text-3xl font-bold text-gray-900 mb-2 dark:text-white">
//           {t('welcome')}, {user?.name || t('user')}
//         </h1>

//         {/* Date and Zone */}
//         <div className="flex items-center gap-4 text-sm text-gray-600 mb-1 dark:text-gray-400">
//           <span>{t('asOfDate', { date: 'Oct 5, 2025' })}</span>
//           <span>•</span>
//           <span>
//             {t('zone')}: {user?.zone || 'Bangalore North'}
//           </span>
//         </div>

//         {/* Sync Info */}
//         <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//           <span>{t('lastSynced', { time: '10:45 AM' })}</span>
//           <span>•</span>
//           <span>
//             {t('dataSource')}: {t('smartMeter')} #{user?.meterId || '1023'}
//           </span>
//         </div>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="card border-l-4 border-blue-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <span className="text-blue-600">⚡</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800 dark:text-white">
//                 256 kWh
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {t('currentConsumption')}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card border-l-4 border-green-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//               <span className="text-green-600">⏰</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800 dark:text-white">
//                 ₹1,230
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {t('dueOn', { date: '12 Oct' })}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card border-l-4 border-yellow-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
//               <span className="text-yellow-600">⚠️</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800 dark:text-white">
//                 ₹120
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {t('pending')}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card border-l-4 border-purple-500">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//               <span className="text-purple-600">✔️</span>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-800 dark:text-white">
//                 ₹1,200
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 {t('paidOn', { date: '10 Sep' })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Electricity Consumption Overview */}
//       <div className="card">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//             {t('electricityOverview')}
//           </h2>

//           <div className="flex gap-3 items-center">
//             <button
//               onClick={() => setRange('day')}
//               className={rangeBtnClass('day')}
//               aria-pressed={range === 'day'}
//             >
//               {t('day')}
//             </button>
//             <button
//               onClick={() => setRange('week')}
//               className={rangeBtnClass('week')}
//               aria-pressed={range === 'week'}
//             >
//               {t('week')}
//             </button>
//             <button
//               onClick={() => setRange('month')}
//               className={rangeBtnClass('month')}
//               aria-pressed={range === 'month'}
//             >
//               {t('month')}
//             </button>
//           </div>
//         </div>

//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData}>
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 stroke="rgba(0,0,0,0.06)"
//                 className="dark:opacity-10"
//               />
//               <XAxis
//                 dataKey="day"
//                 stroke="#6b7280"
//                 tick={{ fill: 'var(--muted)' }}
//               />
//               <YAxis
//                 stroke="#6b7280"
//                 tick={{ fill: 'var(--muted)' }}
//                 domain={[0, 'dataMax + dataMax * 0.1']}
//               />
//               <Tooltip
//                 formatter={(value) => [`${value} kWh`, t('consumption')]}
//                 labelFormatter={(label) => `${t('day')}: ${label}`}
//                 wrapperStyle={{
//                   borderRadius: 8,
//                   border: '1px solid var(--table-border)'
//                 }}
//                 contentStyle={{
//                   background: 'var(--card-bg)',
//                   color: 'var(--text)'
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="consumption"
//                 stroke="var(--accent)"
//                 strokeWidth={3}
//                 dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 4 }}
//                 activeDot={{
//                   r: 6,
//                   stroke: 'var(--accent)',
//                   strokeWidth: 2,
//                   fill: 'var(--card-bg)'
//                 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="card">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
//           {t('quickActions')}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors dark:bg-transparent dark:hover:bg-white/5">
//             <span className="text-blue-600 text-xl">💰</span>
//             <span className="font-medium text-gray-800 dark:text-white">
//               {t('payBill')}
//             </span>
//           </button>
//           <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors dark:bg-transparent dark:hover:bg-white/5">
//             <span className="text-green-600 text-xl">📄</span>
//             <span className="font-medium text-gray-800 dark:text-white">
//               {t('viewBillHistory')}
//             </span>
//           </button>
//           <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors dark:bg-transparent dark:hover:bg-white/5">
//             <span className="text-purple-600 text-xl">📊</span>
//             <span className="font-medium text-gray-800 dark:text-white">
//               {t('viewDetailedUsage')}
//             </span>
//           </button>
//           <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors dark:bg-transparent dark:hover:bg-white/5">
//             <span className="text-orange-600 text-xl">⚙️</span>
//             <span className="font-medium text-gray-800 dark:text-white">
//               {t('manageNotifications')}
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }





import React, { useMemo, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useTranslation } from 'react-i18next'
import '../../styles/EUDashboard.css'

export default function Dashboard() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [range, setRange] = useState('day')

  // --- datasets for day / week / month ---
  const dayData = [
    { day: 'Mon', consumption: 457 },
    { day: 'Tue', consumption: 346 },
    { day: 'Wed', consumption: 222 },
    { day: 'Thu', consumption: 230 },
    { day: 'Fri', consumption: 81 },
    { day: 'Sat', consumption: 293 },
    { day: 'Sun', consumption: 364 }
  ]

  const weekData = [
    { day: 'Wk1', consumption: 1800 },
    { day: 'Wk2', consumption: 2100 },
    { day: 'Wk3', consumption: 2000 },
    { day: 'Wk4', consumption: 2350 },
    { day: 'Wk5', consumption: 1900 },
    { day: 'Wk6', consumption: 2480 },
    { day: 'Wk7', consumption: 2250 }
  ]

  const monthData = [
    { day: 'Jan', consumption: 8500 },
    { day: 'Feb', consumption: 8200 },
    { day: 'Mar', consumption: 9200 },
    { day: 'Apr', consumption: 9800 },
    { day: 'May', consumption: 8800 },
    { day: 'Jun', consumption: 10200 },
    { day: 'Jul', consumption: 9500 },
    { day: 'Aug', consumption: 10400 },
    { day: 'Sep', consumption: 10900 },
    { day: 'Oct', consumption: 10600 }
  ]

  const chartData = useMemo(() => {
    if (range === 'day') return dayData
    if (range === 'week') return weekData
    return monthData
  }, [range])

  const rangeBtnClass = (btn) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      range === btn
        ? 'bg-accent text-white dark:bg-white/20'
        : 'bg-white/40 dark:bg-white/5 text-theme hover:bg-white/60 dark:hover:bg-white/10'
    }`

  return (
    <div className="eud-wrapper space-y-10">

      {/* Welcome Section */}
      <div className="flex flex-col items-start neo-card p-6">
        <h1 className="page-title text-4xl font-bold text-theme mb-3">
          {t('welcome')}, {user?.name || t('user')}
        </h1>

        <div className="flex items-center gap-4 text-sm text-theme/70 mb-1">
          <span>{t('asOfDate', { date: 'Oct 5, 2025' })}</span>
          <span>•</span>
          <span>{t('zone')}: {user?.zone || 'Bangalore North'}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-theme/70">
          <span>{t('lastSynced', { time: '10:45 AM' })}</span>
          <span>•</span>
          <span>{t('dataSource')}: {t('smartMeter')} #{user?.meterId || '1023'}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="neo-card metric-card p-5">
          <div className="flex items-center gap-4">
            <div className="metric-icon bg-blue-200 dark:bg-blue-900/40">
              ⚡
            </div>
            <div>
              <div className="value text-theme">256 kWh</div>
              <div className="label text-theme">{t('currentConsumption')}</div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="neo-card metric-card p-5">
          <div className="flex items-center gap-4">
            <div className="metric-icon bg-green-200 dark:bg-green-900/40">
              ⏰
            </div>
            <div>
              <div className="value text-theme">₹1,230</div>
              <div className="label text-theme">{t('dueOn', { date: '12 Oct' })}</div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="neo-card metric-card p-5">
          <div className="flex items-center gap-4">
            <div className="metric-icon bg-yellow-200 dark:bg-yellow-900/40">
              ⚠️
            </div>
            <div>
              <div className="value text-theme">₹120</div>
              <div className="label text-theme">{t('pending')}</div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="neo-card metric-card p-5">
          <div className="flex items-center gap-4">
            <div className="metric-icon bg-purple-200 dark:bg-purple-900/40">
              ✔️
            </div>
            <div>
              <div className="value text-theme">₹1,200</div>
              <div className="label text-theme">{t('paidOn', { date: '10 Sep' })}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Electricity Consumption Overview */}
      <div className="neo-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-theme">
            {t('electricityOverview')}
          </h2>

          <div className="flex gap-3">
            <button onClick={() => setRange('day')} className={rangeBtnClass('day')}>
              {t('day')}
            </button>
            <button onClick={() => setRange('week')} className={rangeBtnClass('week')}>
              {t('week')}
            </button>
            <button onClick={() => setRange('month')} className={rangeBtnClass('month')}>
              {t('month')}
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fill: 'var(--text-muted)' }} />
              <Tooltip
                wrapperStyle={{ borderRadius: 8 }}
                contentStyle={{
                  background: 'var(--card-bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--table-border)'
                }}
                formatter={(value) => [`${value} kWh`, t('consumption')]}
                labelFormatter={(label) => `${t('day')}: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="consumption"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ fill: 'var(--accent)', r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2, fill: 'var(--card-bg)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="neo-card p-6">
        <h2 className="text-2xl font-semibold text-theme mb-4">
          {t('quickActions')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="quick-btn neo-inner">
            <span className="action-icon">💰</span>
            <span className="action-label text-theme">{t('payBill')}</span>
          </button>

          <button className="quick-btn neo-inner">
            <span className="action-icon">📄</span>
            <span className="action-label text-theme">{t('viewBillHistory')}</span>
          </button>

          <button className="quick-btn neo-inner">
            <span className="action-icon">📊</span>
            <span className="action-label text-theme">{t('viewDetailedUsage')}</span>
          </button>

          <button className="quick-btn neo-inner">
            <span className="action-icon">⚙️</span>
            <span className="action-label text-theme">{t('manageNotifications')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

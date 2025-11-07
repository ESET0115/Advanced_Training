// import React from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { useTheme } from '../context/ThemeContext'

// export default function Header() {
//   const { user } = useAuth()
//   const { theme, toggle } = useTheme()
//   const dark = theme === 'dark'

//   return (
//     <header className="bg-[#d9d9d9] dark:bg-[#5b5b5b] h-14 flex items-center justify-between px-4 text-sm text-black dark:text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">
//       <div className="font-bold text-xl">MDMS</div>
//       <div className="flex items-center gap-4">
//         {/* Notifications */}
//         <button className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
//           <span className="text-lg">🔔</span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             3
//           </span>
//         </button>
        
//         {/* Theme Toggle (uses global ThemeContext) */}
//         <button
//           type="button"
//           aria-label="toggle theme"
//           onClick={toggle}
//           className={`relative rounded-full border border-black/70 dark:border-white/60 transition-colors w-[14vw] max-w-[56px] min-w-[44px] h-[8vw] max-h-[32px] min-h-[28px] ${dark ? 'bg-purple-300/70' : 'bg-[#e6dff0]'}`}
//         >
//           <span className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-black/60 dark:border-white/60 bg-white dark:bg-zinc-700 flex items-center justify-center transition-all size-knob ${dark ? 'right-1' : 'left-1'}`}>
//             <span className="text-[10px]">{dark ? '🌙' : '☀️'}</span>
//           </span>
//         </button>
        
//         {/* Language Selector */}
//         <div className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded">en ▾</div>
        
//         {/* User Profile */}
//         <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded">
//           <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
//             {user?.name?.charAt(0) || 'U'}
//           </div>
//           <span className="hidden md:block text-sm">{user?.name || 'User'}</span>
//         </div>
//       </div>
//     </header>
//   )
// }


import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setIsDark(savedTheme === "dark");
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <header className="header-bar">
      {/* Logo */}
      <div className="header-brand">MDMS</div>

      <div className="header-actions">
        {/* Notifications */}
        <button className="header-icon relative" aria-label="Notifications">
          <span className="material-icons">notifications</span>
          <span className="badge">3</span>
        </button>

        {/* Theme toggle */}
        <button
          className="header-icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="material-icons">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>

        {/* Language */}
        <div className="lang-switch">
          en <span className="material-icons text-sm">expand_more</span>
        </div>

        {/* Profile */}
        <div className="profile">
          <div className="avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="profile-name">{user?.name || "User"}</span>
        </div>
      </div>
    </header>
  );
}


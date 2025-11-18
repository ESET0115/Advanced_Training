// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useTranslation } from "react-i18next";
// import { changeLanguage } from "../i18n";

// export default function Header() {
//   const { user } = useAuth();
//   const { t, i18n } = useTranslation();
//   const [isDark, setIsDark] = useState(false);
//   const [showLangMenu, setShowLangMenu] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     document.documentElement.classList.toggle("dark", savedTheme === "dark");
//     setIsDark(savedTheme === "dark");
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = isDark ? "light" : "dark";
//     document.documentElement.classList.toggle("dark", !isDark);
//     localStorage.setItem("theme", newTheme);
//     setIsDark(!isDark);
//   };

//   const handleLanguageChange = (lng) => {
//     changeLanguage(lng);
//     setShowLangMenu(false);
//   };

//   return (
//     <header className="header-bar flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
//       {/* ✅ Brand title fixed */}
//       <div className="header-brand text-xl font-bold text-gray-800 dark:text-white">
//         MDMS
//       </div>

//       <div className="header-actions flex items-center space-x-4">
//         {/* Notifications */}
//         <button
//           className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
//           aria-label="Notifications"
//         >
//           <span className="material-icons text-gray-700 dark:text-gray-200">
//             notifications
//           </span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//             3
//           </span>
//         </button>

//         {/* Theme toggle */}
//         <button
//           className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
//           onClick={toggleTheme}
//         >
//           <span className="material-icons text-gray-700 dark:text-gray-200">
//             {isDark ? "light_mode" : "dark_mode"}
//           </span>
//         </button>

//         {/* Language switcher */}
//         <div className="relative">
//           <button
//             className="flex items-center p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
//             onClick={() => setShowLangMenu(!showLangMenu)}
//           >
//             <span className="text-gray-800 dark:text-gray-200 uppercase text-sm font-medium">
//               {i18n.language}
//             </span>
//             <span className="material-icons text-gray-600 dark:text-gray-300 text-sm ml-1">
//               expand_more
//             </span>
//           </button>

//           {showLangMenu && (
//             <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
//               <button
//                 onClick={() => handleLanguageChange("en")}
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
//               >
//                 English
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("hi")}
//                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
//               >
//                 हिन्दी
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Profile */}
//         <div className="flex items-center space-x-2">
//           <div className="avatar w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
//             {user?.name?.charAt(0)?.toUpperCase() || "U"}
//           </div>
//           <span className="profile-name text-gray-800 dark:text-gray-100 font-medium">
//             {user?.name || t("roleEndUser")}
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }




import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../i18n";

// Icons
import { FiBell } from "react-icons/fi";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import "../styles/Layout.css";

export default function Header() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const [isDark, setIsDark] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Load current theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setIsDark(savedTheme === "dark");
  }, []);

  // Theme toggle switch
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setShowLangMenu(false);
  };

  return (
    <header className="glass-header-bar">
      {/* Brand */}
      <div className="glass-header-brand">MDMS</div>

      {/* Right Actions */}
      <div className="glass-header-actions">
        {/* Notifications */}
        <button className="glass-icon-btn relative">
          <FiBell className="glass-icon" size={16} />
          <span className="notif-badge">3</span>
        </button>

        {/* Theme Toggle Switch */}
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-thumb ${isDark ? "dark" : ""}`}>
            {isDark ? (
              <IoMoonOutline size={16} />
            ) : (
              <IoSunnyOutline size={16} />
            )}
          </div>
        </div>

        {/* Language Selector */}
        <div className="lang-wrapper">
          <button
            className="glass-lang-btn"
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            <span className="lang-text">{i18n.language.toUpperCase()}</span>
            <FiChevronDown size={16} className="lang-arrow" />
          </button>

          {showLangMenu && (
            <div className="lang-dropdown">
              <button onClick={() => handleLanguageChange("en")}>English</button>
              <button onClick={() => handleLanguageChange("hi")}>हिन्दी</button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="glass-profile">
          <div className="glass-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span className="glass-profile-name">
            {user?.name || t("roleEndUser")}
          </span>
        </div>
      </div>
    </header>
  );
}

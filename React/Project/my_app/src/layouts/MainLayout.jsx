
// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import Header from "../components/Header";
// import "../styles/Layout.css";
// import { useTranslation } from "react-i18next";

// export default function MainLayout() {
//   const { user, logout } = useAuth();
//   const { t } = useTranslation();

//   const getNavigationItems = () => {
//     const role = user?.role;

//     switch (role) {
//       case "end_user":
//         return [
//           { path: "/end-user", label: t("dashboard") },
//           { path: "/end-user/bills", label: t("billsPayments") },
//           { path: "/end-user/meter-data", label: t("meterData") },
//           { path: "/end-user/alerts", label: t("alertsNotifications") },
//           { path: "/end-user/profile", label: t("profileSettings") },
//           { path: "/end-user/logs", label: t("logs") },
//         ];

//       case "zone_manager":
//         return [
//           { path: "/zone-management", label: t("dashboard") },
//           { path: "/zone-management/meter-management", label: t("meterManagement") },
//           { path: "/zone-management/user-management", label: t("userManagement") },
//           { path: "/zone-management/reports-analytics", label: t("reportsAnalytics") },
//           { path: "/zone-management/setting-notifications", label: t("settingsNotifications") },
//         ];

//       case "enterprise_admin":
//         return [
//           { path: "/enterprise", label: t("dashboard") },
//           { path: "/enterprise/zone-management", label: t("zoneManagement") },
//           { path: "/enterprise/meter-management", label: t("meterManagement") },
//           { path: "/enterprise/user-role-management", label: t("userRoleManagement") },
//           { path: "/enterprise/audit-logs", label: t("auditLogs") },
//           { path: "/enterprise/setting-configuration", label: t("settingsConfiguration") },
//         ];

//       default:
//         return [];
//     }
//   };

//   const navigationItems = getNavigationItems();

//   // Translate role name dynamically
//   const getTranslatedRole = (role) => {
//     if (!role) return "";
//     switch (role) {
//       case "end_user":
//         return t("roleEndUser");
//       case "zone_manager":
//         return t("roleZoneManager");
//       case "enterprise_admin":
//         return t("roleEnterpriseAdmin");
//       default:
//         return role;
//     }
//   };

//   return (
//     <div className="app-shell">
//       <div className="app-header-wrapper">
//         <Header />
//       </div>

//       <div className="app-body">
//         <aside className="sidebar">
//           {/* <div className="brand">{t("appTitle")}</div> */}

//           <div className="sidebar-section-title">{t("menu")}</div>

//           <nav className="menu">
//             {navigationItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) => `menu-item${isActive ? " active" : ""}`}
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="sidebar-footer">
//             <div className="user-info">
//               <span className="user-name">{user?.name}</span>
//               <span className="user-role">{getTranslatedRole(user?.role)}</span>
//             </div>
//             <button onClick={logout} className="logout-btn">
//               {t("logout")}
//             </button>
//           </div>
//         </aside>

//         <main className="content">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }




import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import "../styles/Layout.css";
import { useTranslation } from "react-i18next";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const getNavigationItems = () => {
    const role = user?.role;

    switch (role) {
      case "end_user":
        return [
          { path: "/end-user", label: t("dashboard") },
          { path: "/end-user/bills", label: t("billsPayments") },
          { path: "/end-user/meter-data", label: t("meterData") },
          { path: "/end-user/alerts", label: t("alertsNotifications") },
          { path: "/end-user/profile", label: t("profileSettings") },
          { path: "/end-user/logs", label: t("logs") },
        ];
      case "zone_manager":
        return [
          { path: "/zone-management", label: t("dashboard") },
          { path: "/zone-management/meter-management", label: t("meterManagement") },
          { path: "/zone-management/user-management", label: t("userManagement") },
          { path: "/zone-management/reports-analytics", label: t("reportsAnalytics") },
          { path: "/zone-management/setting-notifications", label: t("settingsNotifications") },
        ];
      case "enterprise_admin":
        return [
          { path: "/enterprise", label: t("dashboard") },
          { path: "/enterprise/zone-management", label: t("zoneManagement") },
          { path: "/enterprise/meter-management", label: t("meterManagement") },
          { path: "/enterprise/user-role-management", label: t("userRoleManagement") },
          { path: "/enterprise/audit-logs", label: t("auditLogs") },
          { path: "/enterprise/setting-configuration", label: t("settingsConfiguration") },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const getTranslatedRole = (role) => {
    if (!role) return "";
    switch (role) {
      case "end_user":
        return t("roleEndUser");
      case "zone_manager":
        return t("roleZoneManager");
      case "enterprise_admin":
        return t("roleEnterpriseAdmin");
      default:
        return role;
    }
  };

  return (
    <div className="app-shell">
      <div className="app-header-wrapper">
        <Header />
      </div>

      <div className="app-body">
        <aside className="sidebar">
          {/* ✅ Brand title fixed */}
          {/* <div className="brand">{t("appTitle")}</div> */}

          {/* <div className="sidebar-section-title">{t("menu")}</div> */}

          <nav className="menu">
            {navigationItems.map((item) => (
              // <NavLink
              //   key={item.path}
              //   to={item.path}
              //   className={({ isActive }) => `menu-item${isActive ? " active" : ""}`}
              // >
              //   {item.label}
              // </NavLink>
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === navigationItems[0].path}   // Only Dashboard gets "end"
                className={({ isActive }) => `menu-item${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>

            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <div className="user-role">
                {t("role")}: {getTranslatedRole(user?.role)}
              </div>
            </div>
            <button onClick={logout} className="logout-btn">
              {t("logout")}
            </button>
          </div>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

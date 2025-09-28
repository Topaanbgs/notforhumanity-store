import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { pathname } = useLocation();

  // Navigation items
  const navItems = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/admin",
        icon: (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7-7 7 7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        ),
      },
      {
        name: "Products",
        path: "/admin/products",
        icon: (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        ),
      },
      {
        name: "Orders",
        path: "/admin/orders",
        icon: (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        name: "Profile Admin",
        path: "/admin/profile",
        icon: (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
    ],
    []
  );

  // Active detection
  const isPathActive = (path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <>
      <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:shadow-md flex flex-col`}>
        {/* Brand */}
        <div className="p-6 border-b border-gray-200 flex justify-center">
          <Link to="/" className="font-bold text-xl px-3 py-1 rectangle-sm bg-red-600 text-white transition-colors duration-200 hover:bg-transparent hover:text-black">
            NOTFORHUMANITY
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 flex items-center gap-3 transition-colors duration-200 text-sm ${isPathActive(item.path) ? "bg-red-600 text-white font-semibold shadow-md" : "text-gray-800 hover:bg-red-50 hover:text-red-600"}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black opacity-30 z-40 md:hidden" />}
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function MobileSidebar({ isMenuOpen, setIsMenuOpen }) {
  // overlay and sidebar handled by parent rendering; this component is the sidebar content
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-50 p-6 md:hidden flex flex-col transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      tabIndex={-1}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 focus:outline-none" onClick={() => setIsMenuOpen(false)} aria-label="Close sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <nav className="flex flex-col space-y-2 text-sm font-medium mt-8">
        <Link to="/" className={`px-3 py-2 rectangle ${window.location.pathname === "/" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/newarrivals" className={`px-3 py-2 rectangle ${window.location.pathname === "/newarrivals" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          New Arrivals
        </Link>
        <Link to="/collaborations" className={`px-3 py-2 rectangle ${window.location.pathname === "/collaborations" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          Collaborations
        </Link>
        <Link to="/tshirt" className={`px-3 py-2 rectangle ${window.location.pathname === "/tshirt" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          T-Shirt
        </Link>
        <Link to="/shorts" className={`px-3 py-2 rectangle ${window.location.pathname === "/shorts" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          Shorts
        </Link>
        <Link to="/headwear" className={`px-3 py-2 rectangle ${window.location.pathname === "/headwear" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          Headwear
        </Link>
        <Link to="/jersey" className={`px-3 py-2 rectangle ${window.location.pathname === "/jersey" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          Jersey
        </Link>
        <Link to="/accessories" className={`px-3 py-2 rectangle ${window.location.pathname === "/accessories" ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`} onClick={() => setIsMenuOpen(false)}>
          Accessories
        </Link>
      </nav>
    </div>
  );
}

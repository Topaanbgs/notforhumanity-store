import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function MobileNavbar({ isMenuOpen, setIsMenuOpen, showSearch, setShowSearch, handleDropdownToggle, selectedCountry, setShowSearchState }) {
  const { openCart, cart } = useCart();

  return (
    <nav className="bg-white text-gray-800 px-4 py-3 flex md:hidden justify-between items-center border-b border-gray-200 shadow-sm">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
        <svg className="w-7 h-7 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Link to="/" className="font-bold text-lg">
        NFHMN
      </Link>

      <div className="flex items-center gap-3">
        <button onClick={() => setShowSearch((s) => !s)} className="hover:text-red-600">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button onClick={handleDropdownToggle} className="flex items-center gap-1 text-gray-800 hover:text-red-600 focus:outline-none">
          <img src={selectedCountry.flag} alt={selectedCountry.name} className="h-4 rounded" />
          <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Link to="/wishlist" className="hover:text-red-600">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </Link>

        <button onClick={openCart} className="relative hover:text-red-600">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">{cart.length}</span>}
        </button>

        <Link to="/profile" className="hover:text-red-600">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

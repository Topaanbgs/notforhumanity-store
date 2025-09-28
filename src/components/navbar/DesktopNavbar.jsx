import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { slugify } from "../../utils/Slugify";
import { useSearch } from "../../context/SearchContext";

export default function DesktopNavbar({
  marqueeRef,
  showDropdown,
  dropdownRef,
  dropdownToggleRef,
  selectedCountry,
  selectedCurrency,
  tempCountry,
  tempLanguage,
  tempCurrency,
  showCountryOptions,
  showLanguageOptions,
  showCurrencyOptions,
  setShowCountryOptions,
  setShowLanguageOptions,
  setShowCurrencyOptions,
  setTempCountry,
  setTempLanguage,
  setTempCurrency,
  countries,
  languages,
  currencies,
  handleDropdownToggle,
  handleSave,
}) {
  // Cart, wishlist, and search context
  const { openCart, cart } = useCart();
  const { openWishlist, wishlist } = useWishlist();
  const { query, setQuery } = useSearch();

  const [searchText, setSearchText] = useState(query || "");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialize local search from URL param
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q) setSearchText(q);
  }, [searchParams]);

  // Local input handling
  const handleInputChange = (e) => setSearchText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchText.trim();
    setQuery(trimmed); // update context on submit
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/search");
    }
  };

  const handleClear = () => {
    setSearchText("");
    setQuery("");
    navigate("/search");
  };

  const handleLogoClick = () => {
    setSearchText("");
    setQuery("");
    navigate("/");
  };

  const navItems = ["New Arrivals", "Collaborations", "T-Shirt", "Shorts", "Headwear", "Jersey", "Accessories"];

  return (
    <nav className="bg-white text-gray-800 px-10 py-4 hidden md:flex flex-col items-center border-b border-gray-200 shadow-xl">
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0">
        {/* Logo */}
        <button onClick={handleLogoClick} className="font-bold text-xl mb-4 md:mb-0 px-3 py-1 rectangle-sm bg-red-600 text-white transition-colors duration-200 hover:bg-transparent hover:text-black">
          NOTFORHUMANITY
        </button>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex-1 w-full md:max-w-3xl md:mx-auto relative">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type any products here"
              className="w-full px-4 py-1 pl-10 pr-10 border border-gray-300 rectangle-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-base"
              value={searchText}
              onChange={handleInputChange}
            />

            {/* Search icon */}
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Clear input */}
            {searchText && (
              <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Right icons */}
        <div className="flex gap-4 items-center mt-4 md:mt-0 md:ml-4 text-base font-medium relative">
          <Dropdown
            showDropdown={showDropdown}
            dropdownRef={dropdownRef}
            dropdownToggleRef={dropdownToggleRef}
            selectedCountry={selectedCountry}
            selectedCurrency={selectedCurrency}
            tempCountry={tempCountry}
            tempLanguage={tempLanguage}
            tempCurrency={tempCurrency}
            showCountryOptions={showCountryOptions}
            showLanguageOptions={showLanguageOptions}
            showCurrencyOptions={showCurrencyOptions}
            setShowCountryOptions={setShowCountryOptions}
            setShowLanguageOptions={setShowLanguageOptions}
            setShowCurrencyOptions={setShowCurrencyOptions}
            setTempCountry={setTempCountry}
            setTempLanguage={setTempLanguage}
            setTempCurrency={setTempCurrency}
            countries={countries}
            languages={languages}
            currencies={currencies}
            handleDropdownToggle={handleDropdownToggle}
            handleSave={handleSave}
          />

          {/* Wishlist */}
          <button onClick={openWishlist} className="hover:text-red-600 relative" aria-label="Open wishlist">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">{wishlist.length}</span>}
          </button>

          {/* Cart */}
          <button onClick={openCart} className="relative hover:text-red-600" aria-label="Open cart">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">{cart.length}</span>}
          </button>

          {/* Profile */}
          <Link to="/profile" className="hover:text-red-600" aria-label="Profile">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <div className="w-full mt-4 md:mt-4">
        <div className="flex justify-center gap-4 text-sm font-medium">
          {navItems.map((item) => {
            const slug = slugify(item);
            const isActive = location.pathname.includes(`/category/${slug}`);
            return (
              <Link key={item} to={`/category/${slug}`} className={`px-3 py-1 rectangle-sm transition-colors ${isActive ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white"}`}>
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

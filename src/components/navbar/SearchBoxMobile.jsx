import React from "react";

export default function SearchBoxMobile({ showSearch, searchText, setSearchText, handleClear }) {
  if (!showSearch) return null;
  return (
    <div className="bg-white px-4 py-2 border-b border-gray-200 md:hidden">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

import React from "react";

export default function Dropdown({
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
  return (
    <div ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center gap-1 text-gray-800 hover:text-red-600 focus:outline-none"
        ref={dropdownToggleRef}
      >
        <img src={selectedCountry.flag} alt={selectedCountry.name} className="h-4 rounded" />
        <span className="text-sm">{selectedCurrency.split(" - ")[0]}</span>
        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-10 mt-2 w-72 bg-white rounded-md shadow-lg py-4 px-4 z-50">
          {/* Country */}
          <div className="relative mb-4">
            <span className="text-gray-500 text-sm">Deliver to</span>
            <button
              onClick={() => setShowCountryOptions(!showCountryOptions)}
              className={`w-full mt-1 flex items-center justify-between p-2 border-2 rounded ${showCountryOptions ? "border-red-600" : "border-gray-300"} hover:border-red-600`}
            >
              <span className="flex items-center gap-2">
                <img src={tempCountry.flag} alt={tempCountry.name} className="h-4 rounded" />
                {tempCountry.name}
              </span>
              <svg className={`w-4 h-4 text-gray-400 ${showCountryOptions ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCountryOptions && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-50">
                {countries.map((country) => (
                  <li
                    key={country.name}
                    onClick={() => {
                      setTempCountry(country);
                      setShowCountryOptions(false);
                    }}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${tempCountry.name === country.name ? "bg-gray-200" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={country.flag} alt={country.name} className="h-4 rounded" />
                      {country.name}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Language */}
          <div className="relative mb-4">
            <span className="text-gray-500 text-sm">Language</span>
            <button
              onClick={() => setShowLanguageOptions(!showLanguageOptions)}
              className={`w-full mt-1 flex items-center justify-between p-2 border-2 rounded ${showLanguageOptions ? "border-red-600" : "border-gray-300"} hover:border-red-600`}
            >
              <span>{tempLanguage}</span>
              <svg className={`w-4 h-4 text-gray-400 ${showLanguageOptions ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLanguageOptions && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-50">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
                      setTempLanguage(lang);
                      setShowLanguageOptions(false);
                    }}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${tempLanguage === lang ? "bg-gray-200" : ""}`}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Currency */}
          <div className="relative mb-4">
            <span className="text-gray-500 text-sm">Currency</span>
            <button
              onClick={() => setShowCurrencyOptions(!showCurrencyOptions)}
              className={`w-full mt-1 flex items-center justify-between p-2 border-2 rounded ${showCurrencyOptions ? "border-red-600" : "border-gray-300"} hover:border-red-600`}
            >
              <span>{tempCurrency}</span>
              <svg className={`w-4 h-4 text-gray-400 ${showCurrencyOptions ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCurrencyOptions && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-50">
                {currencies.map((curr) => (
                  <li
                    key={curr}
                    onClick={() => {
                      setTempCurrency(curr);
                      setShowCurrencyOptions(false);
                    }}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${tempCurrency === curr ? "bg-gray-200" : ""}`}
                  >
                    {curr}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={handleSave} className="w-full bg-red-600 text-white rounded-md py-2 font-semibold border-2 border-transparent hover:border-red-700 hover:text-red-700 hover:bg-white transition-colors">
            Save
          </button>
        </div>
      )}
    </div>
  );
}
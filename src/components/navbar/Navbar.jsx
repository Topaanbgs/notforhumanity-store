import { useState, useRef, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileSidebar from "./MobileSidebar";
import MarqueeBanner from "../shop/MarqueeBanner";
import SearchBoxMobile from "./SearchBoxMobile";
import Cart from "../cart/Cart";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  // general states
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCountryOptions, setShowCountryOptions] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // cart states
  const { cart, openCart } = useCart();
  const cartCount = cart.length;

  // Applied states
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Indonesia",
    flag: "https://flagcdn.com/w20/id.png",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("IDR - Indonesian Rupiah");

  // Temporary states
  const [tempCountry, setTempCountry] = useState(selectedCountry);
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);
  const [tempCurrency, setTempCurrency] = useState(selectedCurrency);

  const marqueeRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownToggleRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;
    marqueeElement.innerHTML += marqueeElement.innerHTML;

    let start;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const speed = 0.05;
      const position = -progress * speed;
      const maxScroll = marqueeElement.scrollWidth / 2;

      marqueeElement.style.transform = `translateX(${position % maxScroll}px)`;

      if (position % maxScroll < -maxScroll) {
        start = timestamp;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && dropdownToggleRef.current && !dropdownToggleRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowCountryOptions(false);
        setShowLanguageOptions(false);
        setShowCurrencyOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => setSearchText("");
  const handleDropdownToggle = () => {
    setTempCountry(selectedCountry);
    setTempLanguage(selectedLanguage);
    setTempCurrency(selectedCurrency);
    setShowDropdown((s) => !s);
  };

  const handleSave = () => {
    setSelectedCountry(tempCountry);
    setSelectedLanguage(tempLanguage);
    setSelectedCurrency(tempCurrency);
    setShowDropdown(false);
  };

  const countries = [
    { name: "Indonesia", flag: "https://flagcdn.com/w20/id.png" },
    { name: "Malaysia", flag: "https://flagcdn.com/w20/my.png" },
    { name: "Singapore", flag: "https://flagcdn.com/w20/sg.png" },
    { name: "Thailand", flag: "https://flagcdn.com/w20/th.png" },
  ];

  const languages = ["English", "Bahasa"];
  const currencies = ["IDR - Indonesian Rupiah", "USD - United States Dollar", "SGD - Singapore Dollar", "MYR - Malaysian Ringgit"];

  return (
    <div className="sticky top-0 z-50 font-futura">
      <MarqueeBanner marqueeRef={marqueeRef} />

      <DesktopNavbar
        searchText={searchText}
        setSearchText={setSearchText}
        handleClear={handleClear}
        // dropdown props
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
        // cart props
        openCart={openCart}
        cartCount={cartCount}
      />

      <MobileNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleDropdownToggle={handleDropdownToggle}
        selectedCountry={selectedCountry}
        // cart props
        openCart={openCart}
        cartCount={cartCount}
      />

      <SearchBoxMobile showSearch={showSearch} searchText={searchText} setSearchText={setSearchText} handleClear={handleClear} />

      {/* Mobile sidebar */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity duration-300" onClick={() => setIsMenuOpen(false)} />}
      <MobileSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
}

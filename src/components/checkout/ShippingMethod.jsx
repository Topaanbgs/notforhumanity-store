import { formatCurrency } from "../../utils/Currency";

const LoadingSpinner = ({ message }) => (
  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span className="text-sm text-gray-600">{message}</span>
  </div>
);

const ShippingOption = ({ option, onSelect }) => (
  <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => onSelect(option)}>
    <img src={option.logo} alt={option.name} className="w-16 h-8 object-contain" />
    <div>
      <span className="font-medium text-sm">{option.name}</span>
      <p className="text-xs text-gray-500">
        Est: {option.est} | <span className="font-semibold">{formatCurrency(option.price)}</span>
      </p>
    </div>
  </div>
);

const ShippingDropdown = ({ options, isOpen, onSelectOption, onRecalculate }) => {
  const handleOptionSelect = (option) => {
    onSelectOption(option);
    onRecalculate(option.name);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
      {options.map((option, index) => (
        <ShippingOption key={index} option={option} onSelect={handleOptionSelect} />
      ))}
    </div>
  );
};

const SelectedShippingDisplay = ({ selectedShipment, onClick, isDropdownOpen }) => (
  <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onClick}>
    <div className="flex items-center gap-4">
      <img src={selectedShipment.logo} alt={selectedShipment.name} className="w-16 h-8 object-contain" />
      <span className="text-sm font-medium">
        {selectedShipment.name} ({selectedShipment.est})
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-semibold text-sm">{formatCurrency(selectedShipment.price)}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const ShippingMethod = ({ selectedShipment, shipmentOptions, isLoading, isDropdownOpen, onToggleDropdown, onSelectShipment, onRecalculateShipping, destinationZipCode }) => {
  const loadingMessage = `Calculating shipping cost to ${destinationZipCode}...`;

  return (
    <div className="border border-gray-200 rounded-lg p-6 relative">
      <h2 className="font-semibold text-lg mb-4">Shipment Method</h2>
      {isLoading ? (
        <LoadingSpinner message={loadingMessage} />
      ) : (
        <>
          <SelectedShippingDisplay selectedShipment={selectedShipment} onClick={() => onToggleDropdown(!isDropdownOpen)} isDropdownOpen={isDropdownOpen} />
          <ShippingDropdown
            options={shipmentOptions}
            isOpen={isDropdownOpen}
            onSelectOption={(option) => {
              onSelectShipment(option);
              onToggleDropdown(false);
            }}
            onRecalculate={onRecalculateShipping}
          />
        </>
      )}
    </div>
  );
};

export default ShippingMethod;

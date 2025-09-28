const PaymentOption = ({ option, onSelect }) => (
  <div
    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
    onClick={() => onSelect(option)}
  >
    <img src={option.logo} alt={option.name} className="w-16 h-8 object-contain" />
    <div>
      <span className="font-medium text-sm">{option.name}</span>
    </div>
  </div>
);

const PaymentDropdown = ({ options, isOpen, onSelectOption }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
      {options.map((option, index) => (
        <PaymentOption
          key={index}
          option={option}
          onSelect={onSelectOption}
        />
      ))}
    </div>
  );
};

const SelectedPaymentDisplay = ({ selectedPayment, onClick, isDropdownOpen }) => (
  <div 
    className="flex items-center justify-between border border-gray-300 rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-50 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <img src={selectedPayment.logo} alt={selectedPayment.name} className="w-16 h-8 object-contain" />
      <span className="text-sm font-medium">{selectedPayment.name}</span>
    </div>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={`h-4 w-4 text-gray-400 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

const PaymentMethod = ({ 
  selectedPayment, 
  paymentOptions, 
  isDropdownOpen, 
  onToggleDropdown, 
  onSelectPayment 
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 relative">
      <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
      <SelectedPaymentDisplay
        selectedPayment={selectedPayment}
        onClick={() => onToggleDropdown(!isDropdownOpen)}
        isDropdownOpen={isDropdownOpen}
      />
      <PaymentDropdown
        options={paymentOptions}
        isOpen={isDropdownOpen}
        onSelectOption={(option) => {
          onSelectPayment(option);
          onToggleDropdown(false);
        }}
      />
    </div>
  );
};

export default PaymentMethod;
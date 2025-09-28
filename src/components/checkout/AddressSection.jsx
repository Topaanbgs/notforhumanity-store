const DropshipperFields = ({ isDropshipper, senderName, senderPhone, onSenderNameChange, onSenderPhoneChange }) => {
  if (!isDropshipper) return null;

  return (
    <div className="mt-4 space-y-4">
      <input
        type="text"
        placeholder="Sender Name"
        value={senderName}
        onChange={(e) => onSenderNameChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
      <input
        type="text"
        placeholder="Sender Phone"
        value={senderPhone}
        onChange={(e) => onSenderPhoneChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />
    </div>
  );
};

const AddressDisplay = ({ address, onChangeAddress }) => (
  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex justify-between items-center">
    <div>
      <p className="font-semibold text-sm">{address.fullName}</p>
      <p className="text-xs text-gray-600">+{address.phone}</p>
      <p className="text-xs text-gray-600">
        {address.address} ({address.zipCode})
      </p>
    </div>
    <button 
      type="button" 
      onClick={onChangeAddress} 
      className="text-red-600 text-xs font-semibold hover:underline"
    >
      Change
    </button>
  </div>
);

const DropshipperToggle = ({ isDropshipper, onToggle }) => (
  <label className="flex items-center text-sm font-medium cursor-pointer">
    <input 
      type="checkbox" 
      checked={isDropshipper} 
      onChange={(e) => onToggle(e.target.checked)}
      className="w-4 h-4 rounded text-red-600 border-gray-300 focus:ring-red-500" 
    />
    <span className="ml-2">Make as a dropship order</span>
  </label>
);

const AddressSection = ({ 
  selectedAddress, 
  onChangeAddress,
  isDropshipper,
  onToggleDropshipper,
  senderName,
  senderPhone,
  onSenderNameChange,
  onSenderPhoneChange
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h2 className="font-semibold text-lg mb-4">Address Details</h2>
      <AddressDisplay 
        address={selectedAddress}
        onChangeAddress={onChangeAddress}
      />
      <div className="mt-4">
        <DropshipperToggle 
          isDropshipper={isDropshipper}
          onToggle={onToggleDropshipper}
        />
        <DropshipperFields
          isDropshipper={isDropshipper}
          senderName={senderName}
          senderPhone={senderPhone}
          onSenderNameChange={onSenderNameChange}
          onSenderPhoneChange={onSenderPhoneChange}
        />
      </div>
    </div>
  );
};

export default AddressSection;
import React, { useState } from "react";
import BaseModal from "../common/BaseModal";

/* Address form used for adding a new address */
const AddressForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    zipCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.zipCode) {
      console.error("Validation: all fields required");
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-semibold text-sm">Add New Address</h4>

      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />

      <textarea
        placeholder="Full Address"
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        rows={2}
        required
      />

      <input
        type="text"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={(e) => handleChange("zipCode", e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />

      <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors">
        Save New Address
      </button>
      <button type="button" onClick={onCancel} className="w-full mt-2 text-gray-600 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition-colors">
        Back to Selection
      </button>
    </form>
  );
};

/* List of saved addresses */
const AddressList = ({ addresses, selectedAddress, onSelectAddress, onAddNew }) => (
  <>
    <h4 className="font-semibold text-sm">Select Existing Address</h4>
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          onClick={() => onSelectAddress(addr)}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddress.id === addr.id ? "border-red-600 ring-1 ring-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}
        >
          <p className="font-semibold text-sm">
            {addr.fullName}
            {selectedAddress.id === addr.id && <span className="ml-2 text-xs font-bold text-red-600">(Selected)</span>}
          </p>
          <p className="text-xs text-gray-600">+{addr.phone}</p>
          <p className="text-xs text-gray-600">
            {addr.address}, {addr.zipCode}
          </p>
        </div>
      ))}
    </div>
    <button onClick={onAddNew} className="w-full text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-50 text-sm transition-colors">
      + Add New Address
    </button>
  </>
);

/* Modal wrapper that toggles between list and add form */
const AddressModal = ({ isOpen, onClose, addresses, selectedAddress, onSelectAddress, onAddAddress }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddNew = (formData) => {
    onAddAddress(formData);
    setIsAddingNew(false);
  };

  const handleSelectAddress = (address) => {
    onSelectAddress(address);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="md">
      {!isAddingNew ? (
        <>
          <AddressList addresses={addresses} selectedAddress={selectedAddress} onSelectAddress={handleSelectAddress} onAddNew={() => setIsAddingNew(true)} />
          <button onClick={onClose} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold transition-colors mt-4">
            Confirm Address
          </button>
        </>
      ) : (
        <AddressForm onSubmit={handleAddNew} onCancel={() => setIsAddingNew(false)} />
      )}
    </BaseModal>
  );
};

export default AddressModal;

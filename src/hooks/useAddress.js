import { useState } from 'react';

const initialAddresses = [
  { 
    id: 1, 
    fullName: "topaanbgs", 
    phone: "628999958241", 
    address: "Wakatobi, Tomia Timur, Jl. Pantai Utara RT07/02", 
    zipCode: "93797", 
    isDefault: true 
  },
  { 
    id: 2, 
    fullName: "Ani Permata", 
    phone: "6281234567890", 
    address: "Jl. Sudirman No. 12, Kebayoran Baru, Jakarta Selatan", 
    zipCode: "12190", 
    isDefault: false 
  },
  { 
    id: 3, 
    fullName: "Budi Santoso", 
    phone: "6285555555555", 
    address: "Gg. Merpati No. 45, Dago, Bandung", 
    zipCode: "40135", 
    isDefault: false 
  },
];

export const useAddress = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(
    initialAddresses.find(addr => addr.isDefault) || initialAddresses[0]
  );

  const addAddress = (newAddress) => {
    const id = Date.now();
    const addressWithId = { ...newAddress, id, isDefault: false };
    setAddresses(prev => [...prev, addressWithId]);
    if (!selectedAddress) {
      setSelectedAddress(addressWithId);
    }
  };

  const selectAddress = (address) => {
    setSelectedAddress(address);
  };

  return { addresses, selectedAddress, addAddress, selectAddress };
};
import { useState, useCallback, useMemo } from 'react';

const getShippingCost = async (destinationZipCode, shipmentName) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const basePrice = {
    "J&T Express": 25000,
    "JNE Express": 28000,
    "DHL Express": 40000,
  }[shipmentName] || 25000;

  let priceAdjustment = 0;

  if (destinationZipCode === "12190") {
    priceAdjustment = basePrice * -0.7; // Local area
  } else if (destinationZipCode === "40135") {
    priceAdjustment = 0; // Medium distance
  } else if (destinationZipCode === "93797") {
    priceAdjustment = basePrice * 2; // Long distance
  }

  const newPrice = Math.max(10000, Math.round(basePrice + priceAdjustment));

  return {
    price: newPrice,
    est: destinationZipCode === "93797" ? "5 - 10 days" : 
         destinationZipCode === "12190" ? "1 - 2 days" : "2 - 5 days",
  };
};

export const useShipping = () => {
  const initialShipmentOptions = useMemo(() => [
    { 
      name: "J&T Express", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/J%26T_Express_logo.svg/2560px-J%26T_Express_logo.svg.png", 
      price: 25000, 
      est: "3 - 6 days", 
      initialPrice: 25000 
    },
    { 
      name: "JNE Express", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/New_Logo_JNE.png/250px-New_Logo_JNE.png", 
      price: 28000, 
      est: "2 - 5 days", 
      initialPrice: 28000 
    },
    { 
      name: "DHL Express", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/1200px-DHL_Logo.svg.png", 
      price: 40000, 
      est: "1 - 3 days", 
      initialPrice: 40000 
    },
  ], []);

  const [shipmentOptions, setShipmentOptions] = useState(initialShipmentOptions);
  const [selectedShipment, setSelectedShipment] = useState(initialShipmentOptions[0]);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  const calculateShippingCosts = useCallback(async (zipCode, currentSelectedShipmentName) => {
    setIsLoadingShipping(true);
    setSelectedShipment(prev => ({ ...prev, price: 0, est: "..." }));

    const updatedShipmentOptions = await Promise.all(
      initialShipmentOptions.map(async (option) => {
        const result = await getShippingCost(zipCode, option.name);
        return {
          ...option,
          price: result.price,
          est: result.est,
        };
      })
    );

    setShipmentOptions(updatedShipmentOptions);
    const newSelectedShipment = updatedShipmentOptions.find(
      opt => opt.name === currentSelectedShipmentName
    ) || updatedShipmentOptions[0];
    
    setSelectedShipment(newSelectedShipment);
    setIsLoadingShipping(false);
  }, [initialShipmentOptions]);

  return {
    shipmentOptions,
    selectedShipment,
    isLoadingShipping,
    setSelectedShipment,
    calculateShippingCosts
  };
};
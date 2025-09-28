import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";

// Components
import AddressModal from "../../components/checkout/AddressModal";
import AddressSection from "../../components/checkout/AddressSection";
import ShippingMethod from "../../components/checkout/ShippingMethod";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";

// Hooks
import { useAddress } from "../../hooks/useAddress";
import { useShipping } from "../../hooks/useShipping";

// Data & Utils
import { paymentOptions } from "../../data/paymentOption";
import { normalizePrice } from "../../utils/Currency";
import { validateAddress, validateDropshipper, validateCheckoutItems } from "../../utils/Validation";

export default function Checkout() {
  const { cart: contextCart } = useCart();
  const { addOrder } = useOrder();
  const location = useLocation();
  const navigate = useNavigate();

  // Address state
  const { addresses, selectedAddress, addAddress, selectAddress } = useAddress();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Shipping state
  const { shipmentOptions, selectedShipment, isLoadingShipping, setSelectedShipment, calculateShippingCosts } = useShipping();
  const [isShipmentDropdownOpen, setIsShipmentDropdownOpen] = useState(false);

  // Payment state
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  // Dropshipper state
  const [isDropshipper, setIsDropshipper] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  // Derived values
  const insuranceFee = 1300;
  const buyNowItem = location.state?.buyNowItem ?? null;
  const itemsToCheckout = buyNowItem ? [buyNowItem] : Array.isArray(contextCart) && contextCart.length > 0 ? contextCart : [];

  const subtotal = itemsToCheckout.reduce((sum, item) => {
    const priceNum = normalizePrice(item.price || item.priceNumber || 0);
    return sum + priceNum * (item.quantity || 1);
  }, 0);

  const total = subtotal + (selectedShipment?.price || 0) + insuranceFee;

  // Auto-recalculate shipping cost when address/shipment changes
  useEffect(() => {
    if (selectedAddress?.zipCode && selectedShipment?.name) {
      calculateShippingCosts(selectedAddress.zipCode, selectedShipment.name);
    }
  }, [selectedAddress?.zipCode, selectedShipment?.name, calculateShippingCosts]);

  // Address selection handler
  const handleAddressSelect = (address) => {
    selectAddress(address);
    setIsAddressModalOpen(false);
  };

  // Recalculate shipping cost manually
  const handleShippingRecalculate = (shipmentName) => {
    if (!selectedAddress?.zipCode) return;
    calculateShippingCosts(selectedAddress.zipCode, shipmentName);
  };

  // Submit checkout form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCheckoutItems(itemsToCheckout) || !validateAddress(selectedAddress) || !validateDropshipper(isDropshipper, senderName, senderPhone) || isLoadingShipping) return;

    const itemsParsed = itemsToCheckout.map((item) => ({
      id: item.id,
      name: item.name || "Unnamed",
      size: item.size || "-",
      quantity: item.quantity || 1,
      priceNumber: normalizePrice(item.price || item.priceNumber || 0),
      image: item.image || "https://via.placeholder.com/150",
    }));

    const orderData = {
      fullName: selectedAddress.fullName,
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      zipCode: selectedAddress.zipCode,
      paymentMethod: selectedPayment.name,
      payment: selectedPayment,
      items: itemsParsed,
      subtotal,
      shippingFee: selectedShipment?.price || 0,
      shipment: selectedShipment || null,
      insuranceFee,
      total,
      isDropshipper,
      sender: isDropshipper ? { name: senderName, phone: senderPhone } : null,
      createdAt: Date.now(),
    };

    const { orderId } = addOrder(orderData);
    navigate("/payment", { state: { orderId, buyNowItem } });
  };

  // Empty cart fallback
  if (!validateCheckoutItems(itemsToCheckout)) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Checkout Error</h1>
        <p className="text-gray-600 mt-2">No items found in your cart.</p>
      </div>
    );
  }

  return (
    <>
      {/* Address modal */}
      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} addresses={addresses} selectedAddress={selectedAddress} onSelectAddress={handleAddressSelect} onAddAddress={addAddress} />

      <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-5 gap-6 font-sans text-gray-800">
        {/* Left: Address, shipping, payment */}
        <div className="lg:col-span-3 space-y-6">
          <AddressSection
            selectedAddress={selectedAddress}
            onChangeAddress={() => setIsAddressModalOpen(true)}
            isDropshipper={isDropshipper}
            onToggleDropshipper={setIsDropshipper}
            senderName={senderName}
            senderPhone={senderPhone}
            onSenderNameChange={setSenderName}
            onSenderPhoneChange={setSenderPhone}
          />

          <ShippingMethod
            selectedShipment={selectedShipment}
            shipmentOptions={shipmentOptions}
            isLoading={isLoadingShipping}
            isDropdownOpen={isShipmentDropdownOpen}
            onToggleDropdown={setIsShipmentDropdownOpen}
            onSelectShipment={setSelectedShipment}
            onRecalculateShipping={handleShippingRecalculate}
            destinationZipCode={selectedAddress?.zipCode}
          />

          <PaymentMethod selectedPayment={selectedPayment} paymentOptions={paymentOptions} isDropdownOpen={isPaymentDropdownOpen} onToggleDropdown={setIsPaymentDropdownOpen} onSelectPayment={setSelectedPayment} />
        </div>

        {/* Right: Order summary */}
        <OrderSummary items={itemsToCheckout} subtotal={subtotal} shippingFee={selectedShipment?.price || 0} insuranceFee={insuranceFee} total={total} isShippingLoading={isLoadingShipping} onSubmit={handleSubmit} />
      </div>
    </>
  );
}

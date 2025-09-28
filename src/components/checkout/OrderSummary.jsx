import { formatCurrency, normalizePrice } from "../../utils/Currency";

/* Single product row */
const ProductItem = ({ item }) => {
  const qty = item.quantity || 1;
  const priceNum = normalizePrice(item.price || item.priceNumber || 0);

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
      {item.image ? (
        <img src={item.image} alt={item.name || "Product"} className="w-20 h-20 object-cover rounded-md" />
      ) : (
        <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">No Image</div>
      )}

      <div className="flex-1">
        <p className="font-semibold text-sm">{item.name || "Product"}</p>
        <p className="text-xs text-gray-500">
          Size: {item.size || "-"} | Quantity: {qty}
        </p>
      </div>

      <p className="font-semibold text-sm">{formatCurrency(priceNum * qty)}</p>
    </div>
  );
};

/* Small optional widgets */
const OptionalSections = () => (
  <div className="border-b border-gray-200 pb-4 space-y-2">
    <div className="flex items-center justify-between p-3 rounded-md border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
      <span className="text-sm text-gray-500">Leave a message for delivery (Optional)</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>

    <div className="flex items-center justify-between p-3 rounded-md border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
      <span className="text-sm text-gray-500">Vouchers</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

/* Row for price lines */
const PricingRow = ({ label, value, isLoading = false, isTotal = false }) => (
  <div className={`flex justify-between items-center ${isTotal ? "font-bold text-lg pt-4 border-t border-gray-200" : ""}`}>
    <span>{label}</span>
    {isLoading ? (
      <div className="flex items-center text-gray-500">
        <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-xs">Loading...</span>
      </div>
    ) : (
      <span className={`font-semibold ${isTotal ? "text-red-600" : ""}`}>{value}</span>
    )}
  </div>
);

/* Security helper */
const SecurityBadge = () => (
  <div className="text-center text-xs text-gray-500 mt-2">
    <p className="flex items-center justify-center gap-1 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      Secure Payment | Your payment is encrypted.
    </p>
  </div>
);

/* Primary CTA */
const OrderButton = ({ onSubmit, isLoading, isDisabled }) => (
  <button
    onClick={onSubmit}
    disabled={isLoading || isDisabled}
    className={`w-full text-white py-3 rounded-lg font-semibold transition-colors ${isLoading || isDisabled ? "bg-gray-400 cursor-not-allowed" : "border border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600"}`}
  >
    {isLoading ? "Calculating Total..." : "Order Now"}
  </button>
);

/* T&C text */
const TermsAndConditions = () => (
  <p className="text-xs text-center text-gray-500 mt-3">
    By placing your order, you agree to our{" "}
    <a href="#" className="underline text-red-600">
      Terms & Conditions
    </a>
  </p>
);

/* Main export */
const OrderSummary = ({ items, subtotal, shippingFee, insuranceFee, total, isShippingLoading, onSubmit }) => {
  return (
    <div className="lg:col-span-2 bg-white border border-gray-200 shadow-md rounded-lg p-6 space-y-4 h-fit sticky top-6">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

      {items.map((item, idx) => (
        <ProductItem key={idx} item={item} />
      ))}

      <OptionalSections />

      <div className="text-sm space-y-2">
        <PricingRow label={`Subtotal • ${items.length} items`} value={formatCurrency(subtotal)} />
        <PricingRow label="Shipping Fee • 1.0kg" value={formatCurrency(shippingFee)} isLoading={isShippingLoading} />
        <PricingRow label="Shipment Insurance Fee" value={formatCurrency(insuranceFee)} />
        <PricingRow label="Total Payment" value={isShippingLoading ? "..." : formatCurrency(total)} isTotal={true} />
      </div>

      <SecurityBadge />

      <OrderButton onSubmit={onSubmit} isLoading={isShippingLoading} isDisabled={isShippingLoading} />

      <TermsAndConditions />
    </div>
  );
};

export default OrderSummary;

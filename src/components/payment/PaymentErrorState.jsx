import React from 'react';

const PaymentErrorState = ({ 
  title = "Order Not Found", 
  message = "The payment page could not load your order details.",
  onReturnToCheckout 
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12 font-sans text-gray-800">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onReturnToCheckout}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentErrorState;
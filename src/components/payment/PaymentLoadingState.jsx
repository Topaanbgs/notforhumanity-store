import React from 'react';

const PaymentLoadingState = ({ message = "Loading payment details..." }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12 font-sans text-gray-800">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentLoadingState;
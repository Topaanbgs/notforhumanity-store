import { QRCodeCanvas } from "qrcode.react";
import { formatTime, getPaymentStatusColor, getStatusBackgroundColor } from '../../utils/Payment';

const OrderInfoRow = ({ label, value, className = "" }) => (
  <div className="flex justify-between mb-2">
    <span>{label}</span>
    <span className={className}>{value}</span>
  </div>
);

const PaymentInstructions = () => (
  <div className="border-t pt-4 mt-4 border-gray-200">
    <h3 className="font-semibold text-sm mb-2 text-gray-700">How to pay</h3>
    <ol className="list-decimal pl-5 text-gray-600 text-sm space-y-2">
      <li>Open your payment app (Mobile Banking, E-Wallet, Virtual Account, VISA, Credit Card, etc.).</li>
      <li>Select your preferred payment method or QR option.</li>
      <li>Scan the QR Code above and follow the instructions until the payment is successful.</li>
    </ol>
  </div>
);

const QRCodeDisplay = ({ qrData, isActive }) => {
  if (!qrData || !isActive) return null;
  return (
    <div className="p-4 bg-white border rounded-lg shadow-inner mb-4">
      <QRCodeCanvas value={qrData} size={220} />
    </div>
  );
};

const PaymentButton = ({ isActive, paymentStatus, onConfirmPayment }) => {
  if (isActive) {
    return (
      <button type="button" onClick={onConfirmPayment} className="w-full max-w-xs py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md">
        Confirm Payment (Simulation)
      </button>
    );
  }

  return (
    <div className={`p-3 text-center rounded-lg font-semibold w-full max-w-xs ${getStatusBackgroundColor(paymentStatus, paymentStatus === "Paid")}`}>
      Order Status: {paymentStatus}
    </div>
  );
};

const OrderStatus = ({ orderId, paymentStatus, orderDate, totalPayment, countdown, qrCodeData, onConfirmPayment }) => {
  const isActive = paymentStatus === "Unpaid";
  const statusColor = getPaymentStatusColor(paymentStatus);

  return (
    <div className="lg:w-1/2 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Order</h2>
      
      <OrderInfoRow label="ID" value={orderId} className="font-semibold" />
      <OrderInfoRow label="Status" value={paymentStatus} className={`font-semibold ${statusColor}`} />
      <OrderInfoRow label="Order Date" value={orderDate} />
      <OrderInfoRow label="Total Payment" value={totalPayment} className="font-bold text-lg text-red-600" />
      
      {isActive && (
        <OrderInfoRow label="Remaining Time" value={formatTime(countdown)} className="text-red-600 font-semibold" />
      )}

      <div className="flex flex-col items-center my-6">
        <QRCodeDisplay qrData={qrCodeData} isActive={isActive} />
        <PaymentButton isActive={isActive} paymentStatus={paymentStatus} onConfirmPayment={onConfirmPayment} />
      </div>

      {isActive && <PaymentInstructions />}
    </div>
  );
};

export default OrderStatus;

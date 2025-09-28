import React from "react";

const DetailCard = ({ title, children, className = "" }) => (
  <div className={`p-4 rounded-lg border-gray-300 border bg-gray-50 shadow-sm ${className}`}>
    <h4 className="font-semibold text-gray-700">{title}</h4>
    {children}
  </div>
);

const RecipientInfo = ({ orderData }) => {
  const recipient = orderData.recipient || {};
  const name = recipient.fullName || orderData.fullName || orderData.nama || "N/A";
  const phone = recipient.phone || orderData.phone || orderData.phoneNumber || "N/A";
  const address = recipient.address || orderData.address || orderData.alamat || "N/A";

  return (
    <DetailCard title="Recipient Info">
      <p className="text-gray-600">{name}</p>
      <p className="text-gray-600">{phone}</p>
      <p className="text-gray-600 mt-1">{address}</p>
    </DetailCard>
  );
};

const ShipmentInfo = ({ orderData }) => {
  const shipment = orderData.shipment || {};
  const name = typeof shipment === "string" ? shipment : shipment.name || "N/A";
  const est = shipment?.est || shipment?.eta || null;

  return (
    <DetailCard title="Shipment Method">
      <p className="text-gray-600">{name}</p>
      {est && <p className="text-xs text-gray-500 mt-1">Est: {est}</p>}
    </DetailCard>
  );
};

const PaymentInfo = ({ orderData }) => {
  const paymentName = orderData.paymentMethod || (orderData.payment && orderData.payment.name) || orderData.pembayaran || "N/A";
  return (
    <DetailCard title="Payment Method">
      <p className="text-gray-600">{paymentName}</p>
    </DetailCard>
  );
};

const DropshipInfo = ({ orderData }) => {
  const isDropship = orderData.isDropshipper || orderData.isDropship || false;
  const sender = orderData.sender || null;
  if (!isDropship || !sender) return null;

  return (
    <DetailCard title="Dropship Sender" className="bg-white border-gray-200">
      <p className="text-gray-600">{sender.name}</p>
      <p className="text-gray-600">{sender.phone}</p>
    </DetailCard>
  );
};

const OrderDetails = ({ orderData }) => {
  return (
    <div className="border-t pt-6 border-gray-200 mt-6">
      <h3 className="font-bold text-lg mb-4">Order Details</h3>
      <div className="space-y-3 text-sm">
        <RecipientInfo orderData={orderData} />
        <ShipmentInfo orderData={orderData} />
        <PaymentInfo orderData={orderData} />
        <DropshipInfo orderData={orderData} />
      </div>
    </div>
  );
};

export default OrderDetails;

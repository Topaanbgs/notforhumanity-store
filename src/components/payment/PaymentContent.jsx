import React from 'react';
import OrderStatus from './OrderStatus';
import OrderSummary from './OrderSummary';
import { formatCurrency, formatOrderDate } from '../../utils/Payment';

const PaymentContent = ({
  effectiveOrder,
  paymentStatus,
  countdown,
  qrCodeData,
  isActive,
  onConfirmPayment,
  onNavigateHome,
  onDownloadInvoice,
  onCancelOrder
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <OrderStatus
        orderId={effectiveOrder.id}
        paymentStatus={paymentStatus}
        orderDate={formatOrderDate(effectiveOrder.createdAt || effectiveOrder.date)}
        totalPayment={formatCurrency(effectiveOrder.total)}
        countdown={countdown}
        qrCodeData={qrCodeData}
        onConfirmPayment={onConfirmPayment}
      />
      <OrderSummary 
        orderData={effectiveOrder} 
        items={effectiveOrder.items || []} 
        isOrderActive={isActive} 
        onNavigateHome={onNavigateHome} 
        onDownloadInvoice={onDownloadInvoice} 
        onCancelOrder={onCancelOrder} 
      />
    </div>
  );
};

export default PaymentContent;
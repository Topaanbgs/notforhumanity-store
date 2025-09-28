import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";

// Custom Hooks
import { useOrderResolver } from "../../hooks/useOrderResolver";
import { usePaymentNavigation } from "../../hooks/usePaymentNavigation";
import { usePaymentHandlers } from "../../hooks/usePaymentHandlers";
import { useLeaveModal } from "../../hooks/useLeaveModal";
import { usePaymentCountdown } from "../../hooks/usePaymentCountdown";
import { usePaymentStatus } from "../../hooks/usePaymentStatus";
import { usePaymentModals } from "../../hooks/usePaymentModals";
import { useQRCodeData } from "../../hooks/useQRCodeData";

// Components
import PaymentModals from "../../components/payment/PaymentModals";
import PaymentLoadingState from "../../components/payment/PaymentLoadingState";
import PaymentErrorState from "../../components/payment/PaymentErrorState";
import PaymentContent from "../../components/payment/PaymentContent";

// Utils
import { mapOrderToPaymentStatus } from "../../utils/paymentHelpers";
import { formatCurrency } from "../../utils/Payment";

const PaymentPage = () => {
  const location = useLocation();
  const { clearCart } = useCart();
  const { updateOrderStatus } = useOrder();

  // Extract location state
  const incomingOrderId = location.state?.orderId ?? null;
  const incomingOrderData = location.state?.orderData ?? null;

  // Navigation
  const { safeNavigate, isNavigating } = usePaymentNavigation();

  // Order Resolution
  const { resolvedOrderId, effectiveOrder, isOrderReady, error: orderError } = useOrderResolver(incomingOrderId, incomingOrderData, safeNavigate);

  // Local States
  const [infoModal, setInfoModal] = useState({ isOpen: false, message: "" });
  const cartClearedRef = useRef(false);

  // Payment Status & Countdown
  const initialPaymentStatus = mapOrderToPaymentStatus(effectiveOrder?.status);
  const { paymentStatus, setPaymentStatus, markAsPaid, markAsCancelled, markAsExpired, isActive, isPaid } = usePaymentStatus(initialPaymentStatus);

  const countdown = usePaymentCountdown(10, paymentStatus);
  const qrCodeData = useQRCodeData(effectiveOrder?.id, formatCurrency(effectiveOrder?.total));

  // Modals
  const { isConfirmModalOpen, isCancelModalOpen, isInvoiceModalOpen, openConfirmModal, openCancelModal, openInvoiceModal, closeModal } = usePaymentModals();

  // Leave Modal
  const { leaveModal, handleLeaveAttempt, confirmLeave, closeLeaveModal } = useLeaveModal(paymentStatus, safeNavigate);

  // Payment Handlers
  const { handleConfirmPayment, handleCancelOrder, handleExpireOrder } = usePaymentHandlers({
    effectiveOrder,
    paymentStatus,
    markAsPaid,
    markAsCancelled,
    markAsExpired,
    updateOrderStatus,
    closeModal,
    setInfoModal,
    safeNavigate,
  });

  // Clear cart once when order is unpaid
  useEffect(() => {
    if (!effectiveOrder || !isOrderReady || cartClearedRef.current) return;

    const status = mapOrderToPaymentStatus(effectiveOrder.status);
    if (status === "Unpaid" && resolvedOrderId) {
      clearCart();
      cartClearedRef.current = true;
    }
  }, [clearCart, effectiveOrder, resolvedOrderId, isOrderReady]);

  // Sync payment status
  useEffect(() => {
    if (!effectiveOrder || !isOrderReady) return;

    const mapped = mapOrderToPaymentStatus(effectiveOrder.status);
    if (mapped !== paymentStatus) {
      setPaymentStatus(mapped);
    }
  }, [effectiveOrder?.status, paymentStatus, setPaymentStatus, isOrderReady]);

  // Auto-expire on countdown
  useEffect(() => {
    if (!isOrderReady) return;

    if (countdown <= 0 && paymentStatus === "Unpaid") {
      handleExpireOrder();
    }
  }, [countdown, paymentStatus, handleExpireOrder, isOrderReady]);

  // Event Handlers
  const closeInfoModal = useCallback(() => {
    setInfoModal({ isOpen: false, message: "" });
  }, []);

  const handleReturnToCheckout = useCallback(() => {
    safeNavigate("/checkout");
  }, [safeNavigate]);

  // Render States
  if (!isOrderReady || isNavigating) {
    return <PaymentLoadingState />;
  }

  if (orderError || !effectiveOrder) {
    return <PaymentErrorState title={orderError ? "Error Loading Order" : "Order Not Found"} message={orderError || "The payment page could not load your order details."} onReturnToCheckout={handleReturnToCheckout} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12 font-sans text-gray-800">
      {/* All Modals */}
      <PaymentModals
        effectiveOrder={effectiveOrder}
        isPaid={isPaid}
        isConfirmModalOpen={isConfirmModalOpen}
        onConfirmPayment={handleConfirmPayment}
        isCancelModalOpen={isCancelModalOpen}
        onCancelOrder={handleCancelOrder}
        isInvoiceModalOpen={isInvoiceModalOpen}
        leaveModal={leaveModal}
        onConfirmLeave={confirmLeave}
        onCloseLeaveModal={closeLeaveModal}
        infoModal={infoModal}
        onCloseInfoModal={closeInfoModal}
        closeModal={closeModal}
      />

      {/* Main Payment Content */}
      <PaymentContent
        effectiveOrder={effectiveOrder}
        paymentStatus={paymentStatus}
        countdown={countdown}
        qrCodeData={qrCodeData}
        isActive={isActive}
        onConfirmPayment={openConfirmModal}
        onNavigateHome={() => handleLeaveAttempt("/")}
        onDownloadInvoice={openInvoiceModal}
        onCancelOrder={openCancelModal}
      />
    </div>
  );
};

export default PaymentPage;

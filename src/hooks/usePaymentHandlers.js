import { useCallback } from 'react';

export const usePaymentHandlers = ({
  effectiveOrder,
  paymentStatus,
  markAsPaid,
  markAsCancelled,
  markAsExpired,
  updateOrderStatus,
  closeModal,
  setInfoModal,
  safeNavigate
}) => {
  const handleConfirmPayment = useCallback(() => {
    markAsPaid();
    if (effectiveOrder?.id) {
      updateOrderStatus(effectiveOrder.id, "paid");
    }
    closeModal();
    setInfoModal({ isOpen: true, message: "Payment Successful ✅" });
    
    setTimeout(() => {
      safeNavigate("/");
    }, 1500);
  }, [markAsPaid, effectiveOrder, updateOrderStatus, closeModal, setInfoModal, safeNavigate]);

  const handleCancelOrder = useCallback(() => {
    markAsCancelled();
    if (effectiveOrder?.id) {
      updateOrderStatus(effectiveOrder.id, "cancel");
    }
    closeModal();
    setInfoModal({ isOpen: true, message: "Order Cancelled ❌" });
    
    setTimeout(() => {
      safeNavigate("/");
    }, 1500);
  }, [markAsCancelled, effectiveOrder, updateOrderStatus, closeModal, setInfoModal, safeNavigate]);

  const handleExpireOrder = useCallback(() => {
    markAsExpired();
    if (effectiveOrder?.id) {
      updateOrderStatus(effectiveOrder.id, "cancel");
    }
  }, [markAsExpired, effectiveOrder, updateOrderStatus]);

  return {
    handleConfirmPayment,
    handleCancelOrder,
    handleExpireOrder
  };
};
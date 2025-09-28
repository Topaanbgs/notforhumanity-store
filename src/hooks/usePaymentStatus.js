import { useCallback, useMemo, useState } from "react";

export const usePaymentStatus = (initialStatus = "Unpaid") => {
  const [paymentStatus, setPaymentStatus] = useState(initialStatus);

  const markAsPaid = useCallback(() => setPaymentStatus("Paid"), []);
  const markAsCancelled = useCallback(() => setPaymentStatus("Cancelled"), []);
  const markAsExpired = useCallback(() => setPaymentStatus("Expired"), []);
  const resetStatus = useCallback((status = "Unpaid") => setPaymentStatus(status), []);

  const isActive = paymentStatus === "Unpaid";
  const isPaid = paymentStatus === "Paid";
  const isCancelled = paymentStatus === "Cancelled";
  const isExpired = paymentStatus === "Expired";

  return useMemo(
    () => ({
      paymentStatus,
      setPaymentStatus,
      markAsPaid,
      markAsCancelled,
      markAsExpired,
      resetStatus,
      isActive,
      isPaid,
      isCancelled,
      isExpired,
    }),
    [paymentStatus, markAsPaid, markAsCancelled, markAsExpired, resetStatus, isActive, isPaid, isCancelled, isExpired]
  );
};

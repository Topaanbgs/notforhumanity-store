import { useState, useCallback } from 'react';

export const useLeaveModal = (paymentStatus, safeNavigate) => {
  const [leaveModal, setLeaveModal] = useState({ isOpen: false, target: null });

  const handleLeaveAttempt = useCallback((targetUrl) => {
    if (paymentStatus === "Unpaid") {
      setLeaveModal({ isOpen: true, target: targetUrl });
    } else {
      safeNavigate(targetUrl);
    }
  }, [paymentStatus, safeNavigate]);

  const confirmLeave = useCallback(() => {
    const target = leaveModal.target || "/";
    setLeaveModal({ isOpen: false, target: null });
    safeNavigate(target);
  }, [leaveModal.target, safeNavigate]);

  const closeLeaveModal = useCallback(() => {
    setLeaveModal({ isOpen: false, target: null });
  }, []);

  return {
    leaveModal,
    handleLeaveAttempt,
    confirmLeave,
    closeLeaveModal
  };
};

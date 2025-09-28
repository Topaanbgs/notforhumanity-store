import { useCallback, useState } from "react";

export const usePaymentModals = () => {
  const [modalType, setModalType] = useState(null);

  const openConfirmModal = useCallback(() => setModalType("confirm"), []);
  const openCancelModal = useCallback(() => setModalType("cancel"), []);
  const openInvoiceModal = useCallback(() => setModalType("invoice"), []);
  const closeModal = useCallback(() => setModalType(null), []);

  return {
    modalType,
    isConfirmModalOpen: modalType === "confirm",
    isCancelModalOpen: modalType === "cancel",
    isInvoiceModalOpen: modalType === "invoice",
    openConfirmModal,
    openCancelModal,
    openInvoiceModal,
    closeModal,
  };
};

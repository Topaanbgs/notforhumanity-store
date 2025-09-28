import React from 'react';
import CustomModal from '../common/CustomModal';
import InfoModal from '../common/InfoModal';
import { formatCurrency } from '../../utils/Payment';

const PaymentModals = ({
  effectiveOrder,
  isPaid,
  // Confirm Modal
  isConfirmModalOpen,
  onConfirmPayment,
  // Cancel Modal
  isCancelModalOpen,
  onCancelOrder,
  // Invoice Modal
  isInvoiceModalOpen,
  // Leave Modal
  leaveModal,
  onConfirmLeave,
  onCloseLeaveModal,
  // Info Modal
  infoModal,
  onCloseInfoModal,
  // Common
  closeModal
}) => {
  return (
    <>
      {/* Payment Confirmation Modal */}
      <CustomModal
        isOpen={isConfirmModalOpen}
        title="Confirm Payment Simulation"
        message={`Simulate payment for ${effectiveOrder?.id}?`}
        onConfirm={onConfirmPayment}
        onCancel={closeModal}
        confirmText="Yes, Confirm Paid"
        confirmColor="bg-green-600 hover:bg-green-700"
      />
      
      {/* Cancel Order Modal */}
      <CustomModal
        isOpen={isCancelModalOpen}
        title="Cancel Order Confirmation"
        message={`Cancel this order (${effectiveOrder?.id})?`}
        onConfirm={onCancelOrder}
        onCancel={closeModal}
        confirmText="Yes, Cancel Order"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
      
      {/* Invoice Modal */}
      <CustomModal
        isOpen={isInvoiceModalOpen}
        title={isPaid ? "Invoice" : "Feature Not Available"}
        message={isPaid ? "Invoice ready." : "Invoice feature under development."}
        onConfirm={closeModal}
        onCancel={closeModal}
        confirmText="Back"
        confirmColor="bg-red-600"
        showCancel={false}
      />
      
      {/* Leave Confirmation Modal */}
      <CustomModal
        isOpen={leaveModal.isOpen}
        title="Pending Payment Reminder"
        message="You have an unpaid order. Do you want to leave without completing payment?"
        onConfirm={onConfirmLeave}
        onCancel={onCloseLeaveModal}
        confirmText="Leave Anyway"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
      
      {/* Info Modal */}
      <InfoModal 
        isOpen={infoModal.isOpen} 
        message={infoModal.message} 
        onClose={onCloseInfoModal} 
        type="success" 
        duration={2000} 
      />
    </>
  );
};

export default PaymentModals;
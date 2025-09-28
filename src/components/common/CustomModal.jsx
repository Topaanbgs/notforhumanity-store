import React from "react";

const ModalButton = ({ onClick, className, children, type = "button" }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 ${className}`}>
    {children}
  </button>
);

const CustomModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", confirmColor = "bg-red-600", showCancel = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-transform duration-200 ease-out scale-100">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            {showCancel && (
              <ModalButton onClick={onCancel} className="text-gray-700 bg-gray-200 hover:bg-gray-300">
                Cancel
              </ModalButton>
            )}
            <ModalButton onClick={onConfirm} className={`text-white ${confirmColor} hover:opacity-90`}>
              {confirmText}
            </ModalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

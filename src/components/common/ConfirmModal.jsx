import React from "react";
import BaseModal from "./BaseModal";

const ConfirmModal = ({ isOpen, onClose, title, message, onConfirm }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} size="sm">
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Confirm
        </button>
      </div>
    </div>
  </BaseModal>
);

export default ConfirmModal;

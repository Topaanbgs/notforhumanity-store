import React from "react";
import BaseModal from "./BaseModal";

const InfoModal = ({ isOpen, onClose, message, type = "success", duration = 2500 }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} autoClose duration={duration} size="sm">
    <div
      className={`text-sm font-medium p-4 rounded-lg border
        ${type === "success" ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}`}
    >
      {message}
    </div>
  </BaseModal>
);

export default InfoModal;

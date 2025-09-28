import React from "react";
import BaseModal from "../common/BaseModal";

const SizeGuideModal = ({ isOpen, onClose, image }) => (
  <BaseModal isOpen={isOpen} onClose={onClose} size="lg">
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Size Guide</h3>
        <button className="text-gray-600" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="max-h-[50vh] flex justify-center items-center overflow-auto">
        <img src={image} alt="Size Guide" className="w-full h-auto object-contain" />
      </div>
    </div>
  </BaseModal>
);

export default SizeGuideModal;

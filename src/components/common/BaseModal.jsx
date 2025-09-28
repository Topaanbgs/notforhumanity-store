import React, { useEffect, useState } from "react";

const BaseModal = ({ isOpen, onClose, children, size = "md", autoClose = false, duration = 2500, showOverlay = true, className = "" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      setVisible(false);
    }
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen && !visible) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {showOverlay && <div className="absolute inset-0 bg-black/60" onClick={onClose} />}
      <div
        className={`relative bg-white rounded-xl shadow-2xl w-full ${sizeClass} p-6 transform transition-all duration-300
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseModal;

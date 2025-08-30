import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-dark rounded-xl shadow-lg p-6 relative min-w-[300px] max-w-xs">
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-accent"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

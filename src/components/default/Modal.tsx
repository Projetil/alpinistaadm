import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed max-h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto md:w-auto w-full"
      onClick={handleOutsideClick}
    >
      {children}
    </div>
  );
};

export default Modal;

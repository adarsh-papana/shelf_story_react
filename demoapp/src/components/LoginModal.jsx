import React from 'react';
import './../style/LoginModal.css'; // Create and import a CSS file for styling

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Login</button>
      </div>
    </div>
  );
};

export default Modal;

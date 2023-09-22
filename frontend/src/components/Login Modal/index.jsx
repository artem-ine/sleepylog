import React, { useState } from "react";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import PasswordResetRequestForm from "./PasswordResetRequestForm"; // Import the new component

const LogInModal = ({ isOpen, onRequestClose }) => {
  const [isPasswordResetRequested, setPasswordResetRequested] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login/Signup Modal"
      className=".custom-modal"
    >
      {isPasswordResetRequested ? (
        // If password reset is requested, show the reset request form
        <PasswordResetRequestForm
          onRequestClose={() => setPasswordResetRequested(false)}
        />
      ) : (
        // Otherwise, show the login form
        <LoginForm onLoginSuccess={onRequestClose} />
      )}
      <div className="modal-actions">
        <button
          onClick={onRequestClose}
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          Close
        </button>
        <button
          onClick={() => setPasswordResetRequested(true)} // Show the reset form when clicked
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          Forgotten your password?
        </button>
      </div>
    </Modal>
  );
};

export default LogInModal;

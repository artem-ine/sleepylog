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
        <PasswordResetRequestForm
          onRequestClose={() => setPasswordResetRequested(false)}
        />
      ) : (
        <LoginForm onLoginSuccess={onRequestClose} />
      )}
      <div className="modal-actions gap-3">
        <button
          onClick={onRequestClose}
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          x
        </button>
        <button
          onClick={() => setPasswordResetRequested(true)}
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          Forgot your password?
        </button>
      </div>
    </Modal>
  );
};

export default LogInModal;

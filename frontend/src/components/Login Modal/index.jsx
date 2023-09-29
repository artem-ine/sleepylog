/* eslint-disable react/prop-types */

import React, { useState } from "react";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import PasswordResetRequestForm from "./PasswordResetRequestForm";
import { RiCloseCircleLine } from "react-icons/ri";

const LogInModal = ({ isOpen, onRequestClose }) => {
  const [isPasswordResetRequested, setPasswordResetRequested] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login/Signup Modal"
      className="custom-modal"
    >
      {isPasswordResetRequested ? (
        <PasswordResetRequestForm
          onRequestClose={() => setPasswordResetRequested(false)}
        />
      ) : (
        <>
          {" "}
          <LoginForm onLoginSuccess={onRequestClose} />
          <div className="modal-actions flex flex-col items-center mt-3">
            <button
              onClick={() => setPasswordResetRequested(true)}
              aria-label="close"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
            >
              Forgot your password?
            </button>
            <button
              onClick={onRequestClose}
              className="hover:underline decoration-accent mt-2 cursor-pointer bouncey mb-2"
              style={{ fontSize: "22px" }}
              aria-label="open forgot your password"
            >
              <RiCloseCircleLine />
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default LogInModal;

/* eslint-disable react/prop-types */

import Modal from "react-modal";
import PasswordForm from "./PasswordModal";

const PasswordModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Password Modal"
      className="custom-modal"
    >
      <PasswordForm onPasswordChanged={onRequestClose} />
      <div className="modal-actions">
        <button
          aria-label="close password form modal"
          onClick={onRequestClose}
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PasswordModal;

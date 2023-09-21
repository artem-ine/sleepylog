import Modal from "react-modal";
import PasswordForm from "./PasswordModal";

const PasswordModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Password Modal"
      className=".custom-modal"
    >
      <PasswordForm onPasswordChanged={onRequestClose} />
      <div className="modal-actions">
        <button
          onClick={onRequestClose}
          className="bg-secondary dark:bg-primary text-white dark:text-black border border-black font-bold text-sm py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PasswordModal;

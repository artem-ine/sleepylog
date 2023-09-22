import Modal from "react-modal";
import SignupForm from "./SignupForm";

const SignupModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup Modal"
      className=".custom-modal"
    >
      <SignupForm onSignupSuccess={onRequestClose} />
      <div className="modal-actions">
        <button
          onClick={onRequestClose}
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SignupModal;

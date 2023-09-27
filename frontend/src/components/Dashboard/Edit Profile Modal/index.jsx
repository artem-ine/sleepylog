import Modal from "react-modal";
import EditProfileForm from "./EditProfileModal";

const EditProfileModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Password Modal"
      className="custom-modal"
    >
      <EditProfileForm onProfileChanged={onRequestClose} />
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

export default EditProfileModal;

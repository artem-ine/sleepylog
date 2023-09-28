import Modal from "react-modal";
import EditProfileForm from "./EditProfileModal";
import { RiCloseCircleLine } from "react-icons/ri";

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
          aria-label="close"
          onClick={onRequestClose}
          className="hover:underline decoration-accent mt-2 cursor-pointer bouncey mb-2"
          style={{ fontSize: "22px" }}
        >
          <RiCloseCircleLine />
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;

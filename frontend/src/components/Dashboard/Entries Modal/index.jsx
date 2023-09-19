import Modal from "react-modal";
import EntryForm from "./Entries";

const EntryModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Entries Modal"
      className="ReactModal__Body--open"
    >
      <EntryForm />
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

export default EntryModal;

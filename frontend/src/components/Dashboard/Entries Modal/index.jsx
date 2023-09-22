import Modal from "react-modal";
import EntryForm from "./Entries";

const EntryModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Entries Modal"
      className="custom-modal"
    >
      <EntryForm onEntrySuccess={onRequestClose} />
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

export default EntryModal;

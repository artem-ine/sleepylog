/* eslint-disable react/prop-types */

import Modal from "react-modal";
import EntryForm from "./Entries";
import { RiCloseCircleLine } from "react-icons/ri";

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

export default EntryModal;

import Modal from "../Modal/Modal";
import { useState } from "react";
import NewEntryForm from "../NewEntryForm";

const Footer = ({ entries, setEntries }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <footer>
        <button
          className="newEntryButton"
          onClick={(event) => {
            setShowModal(true);
          }}
        >
          Nueva Entrada
        </button>
      </footer>

      {showModal && (
        <Modal setShowModal={setShowModal}>
          <NewEntryForm
            setShowModal={setShowModal}
            entries={entries}
            setEntries={setEntries}
          />
        </Modal>
      )}
    </>
  );
};

export default Footer;

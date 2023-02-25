import Modal from "../Modal";
import { useState } from "react";
import NewEntryForm from "../NewEntryForm";
import "./style.css";

//Componente del footer principal.
const Footer = ({ entries, setEntries }) => {
  const [showModal, setShowModal] = useState(false); //Estado que controla la modal el formulario de crear entradas.
  return (
    <>
      <footer className="mainFooter">
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

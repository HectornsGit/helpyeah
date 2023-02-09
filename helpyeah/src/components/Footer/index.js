import Modal from "../Modal/Modal";
import { useState } from "react";
import NewEntryForm from "../NewEntryForm";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer>
        {/* <button
          className="newEntryButton"
          onClick={(event) => {
            setShowModal(true);
          }}
        >
          Nueva Entrada
        </button> */}
      </footer>

      {/* {showModal && (
        <Modal setShowModal={setShowModal}>
          <NewEntryForm />
        </Modal>
      )} */}
    </>
  );
};

export default Footer;

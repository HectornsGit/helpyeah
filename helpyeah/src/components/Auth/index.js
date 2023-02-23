import Modal from "../Modal";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import { useState } from "react";
const AuthWithOutToken = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalOne, setShowModalOne] = useState(false);
  return (
    <ul>
      <li>
        <button
          className="registerButton"
          onClick={(event) => {
            setShowModal(true);
          }}
        >
          Registro
        </button>
      </li>
      <li>
        <button
          className="loginButton"
          onClick={(event) => {
            setShowModalOne(true);
          }}
        >
          Iniciar Sesión
        </button>
      </li>

      {showModal && (
        <Modal setShowModal={setShowModal}>
          <RegisterForm setShowModal={setShowModal} />
        </Modal>
      )}

      {showModalOne && (
        <Modal setShowModal={setShowModalOne}>
          <LoginForm setShowModal={setShowModalOne} />
        </Modal>
      )}
    </ul>
  );
};

export default AuthWithOutToken;

import Modal from "../Modal";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import { useState } from "react";

//Componente con la parte del header que muestra los formularios de registro y acceso.
const AuthWithOutToken = () => {
  //Estados que controlan las variables que activan o desactivan las modales con los formularios.
  //---------------------------------------------------------------------------------------------
  const [showModal, setShowModal] = useState(false); //Modal del registro.
  const [showModalOne, setShowModalOne] = useState(false); //Modal del login.
  //---------------------------------------------------------------------------------------------

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
      {/*------------------MODALES---------------------------*/}
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

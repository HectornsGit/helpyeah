import "./style.css";

const Modal = ({ children, setShowModal }) => {
  return (
    <div
      className="modal"
      onClick={(event) => {
        //cambiamos el estado ShowModal a false para cerrar el modal.
        //Utilizamos .closest para seleccionar el elemento o el padre más cercano que coincida con el párametro que se le pasa.
        //Con esto comprobamos si donde clickeamos es hijo de .modalContainer (en este caso), si no lo es se cierra.
        if (!event.target.closest(".modalContainer")) {
          setShowModal(false);
        }
      }}
    >
      <div className="modalContainer">{children}</div>
    </div>
  );
};

export default Modal;

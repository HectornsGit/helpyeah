import "./style.css";

const Modal = ({ children, setShowModal }) => {
  return (
    <div
      className="modal"
      onClick={(event) => {
        event.preventDefault();

        //cambiamos el estado ShowModal a false para cerrar el modal.
        setShowModal(false);
      }}
    >
      <div
        className="modalContainer"
        onClick={(event) => {
          event.preventDefault();
          //cancelamos la propagacion para que no se active el onClick del fondo del modal.
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

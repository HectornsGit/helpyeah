import Modal from "../Modal/Modal";
import NewCommentForm from "../NewCommentForm";
import useGetEntryById from "../../hooks/useGetEntryById";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Entry = ({
  comments,
  setComments,
  title,
  description,
  file_name,
  category,
  username,
  solved,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  return (
    <article className={solved ? "solved" : "unsolved"}>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{description}</p>
      <p>{file_name}</p>
      <p>{category}</p>
      <footer>
        <h3>{username}</h3>

        <button
          className="newCommentButton"
          onClick={(event) => {
            setShowModal(true);
          }}
        >
          Comentar
        </button>

        <button>Eliminar</button>
      </footer>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <NewCommentForm
            setShowModal={setShowModal}
            setComments={setComments}
            comments={comments}
          />
        </Modal>
      )}
    </article>
  );
};
export default Entry;

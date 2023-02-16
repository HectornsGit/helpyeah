import Modal from "../Modal/Modal";
import NewCommentForm from "../NewCommentForm";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Entry = ({ comments, setComments, entry }) => {
  const { title, description, file_name, category, username, solved, avatar } =
    entry;
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { REACT_APP_BACKEND_PORT } = process.env;

  return (
    <article className={solved ? "solved" : "unsolved"}>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{description}</p>
      <p>{file_name}</p>
      <p>{category}</p>
      <footer>
        <ul>
          <li>
            <img
              src={`http://localhost:${REACT_APP_BACKEND_PORT}/${avatar}`}
              alt={`foto de ${username}`}
            />
          </li>
          <li>
            <h3>{username}</h3>
          </li>
        </ul>

        {id && (
          <ul>
            <li>
              <button
                className="newCommentButton"
                onClick={(event) => {
                  setShowModal(true);
                }}
              >
                Comentar
              </button>
            </li>

            <li>
              <button>Eliminar</button>
            </li>
          </ul>
        )}
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

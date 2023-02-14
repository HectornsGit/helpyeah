import Modal from "../Modal/Modal";
import NewCommentForm from "../NewCommentForm";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Entry = ({
  comments,
  setComments,
  title,
  description,
  file_name,
  category,
  username,
  solved,
  entry_id,
  user_id,
  avatar,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { REACT_APP_BACKEND_PORT } = process.env;
  const navigate = useNavigate();

  return (
    <article
      className={solved ? "solved" : "unsolved"}
      onClick={(event) => {
        if (id) {
          return;
        }
        navigate(`/entries/${entry_id}`);
      }}
    >
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
              alt={"hola"}
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

import Modal from "../Modal/Modal";
import NewCommentForm from "../NewCommentForm";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { saveAs } from "file-saver";

const Entry = ({ comments, setComments, entry, setEntries, entries }) => {
  const { loggedUser, token } = useTokenContext();
  const {
    id: entry_id,
    title,
    description,
    file_name,
    category,
    username,
    solved,
    avatar,
    user_id,
  } = entry;
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { REACT_APP_BACKEND_PORT } = process.env;

  const navigate = useNavigate();

  const deleteEntry = async () => {
    const res = await fetch(
      `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message);
    }

    const filteredEntries = entries.filter((entry) => {
      return entry.id !== id;
    });

    setEntries(filteredEntries);

    navigate("/");
  };

  return (
    <article className={solved ? "solved" : "unsolved"}>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{description}</p>
      {file_name && (
        <button
          onClick={(e) => {
            saveAs(
              `http://localhost:${REACT_APP_BACKEND_PORT}/${file_name}`,
              file_name
            );
          }}
        >
          DESCARGA
        </button>
      )}

      <p>{category}</p>
      <footer>
        <Link to={`/users/${user_id}`}>
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
        </Link>

        {id && (
          <ul>
            <li>
              <button
                className="newCommentButton"
                onClick={(event) => {
                  if (!token) {
                    navigate("/login");
                  }
                  setShowModal(true);
                }}
              >
                Comentar
              </button>
            </li>
            {loggedUser.id === user_id && (
              <li>
                <button
                  onClick={(event) => {
                    deleteEntry();
                  }}
                >
                  Eliminar
                </button>
              </li>
            )}
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

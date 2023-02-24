import Modal from "../Modal";
import NewCommentForm from "../NewCommentForm";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { saveAs } from "file-saver";
import "./style.css";
import SolvedSwitch from "../SolvedSwitch";

const Entry = ({ comments, setComments, entry }) => {
  const { loggedUser, token } = useTokenContext();
  const {
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
  const [checked, setChecked] = useState(solved);
  const { id } = useParams();
  const { REACT_APP_BACKEND_PORT } = process.env;

  const navigate = useNavigate();
  console.log(solved);
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

    navigate("/");
  };

  return (
    <article className="entry">
      {!id && (
        <Link to={`/entries/${entry.id}`}>
          <header>
            <h2>{title}</h2>
          </header>
          <p>{description}</p>
        </Link>
      )}
      {id && (
        <article className="user">
          <header>
            <h2>{title}</h2>
            <ul>
              <li>{checked ? "Resuelto" : "Por resolver"}</li>
              <li>
                <SolvedSwitch
                  setChecked={setChecked}
                  checked={checked}
                  user_id={user_id}
                />
              </li>
            </ul>
          </header>
          <p>{description}</p>
        </article>
      )}
      {id && file_name && (
        <button
          className="downloadButton"
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

      <footer className="entryFooter">
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

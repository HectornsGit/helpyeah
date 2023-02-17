import HalfRating from "../Rating";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useTokenContext } from "../../contexts/TokenContext";

const Comment = ({
  id,
  user_id,
  entry_id,
  text,
  file_name,
  creation_date,
  setComments,
  comments,
  averageRating,
  avatar,
  username,
}) => {
  const { REACT_APP_BACKEND_PORT } = process.env;
  const { loggedUser, token } = useTokenContext();

  // Función para borrar un comentario.

  const deleteComent = async () => {
    const res = await fetch(
      `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${entry_id}/${id}`,
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

    const filteredComments = comments.filter((comment) => {
      return comment.id !== id;
    });
    setComments(filteredComments);
  };

  return (
    <article>
      <p>{text}</p>

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
      <p>{creation_date}</p>
      <footer>
        <ul>
          <li>
            <HalfRating
              comment_id={id}
              entry_id={entry_id}
              setComments={setComments}
              comments={comments}
              averageRating={averageRating}
            />
          </li>
          <li>
            <Link to={`/users/${user_id}`}>
              <article>
                {username}
                <Avatar avatar={avatar} username={username} />
              </article>
            </Link>
          </li>
          {loggedUser.id === user_id && (
            <li>
              <button
                onClick={async (event) => {
                  deleteComent();
                }}
              >
                Eliminar
              </button>
            </li>
          )}
        </ul>
      </footer>
    </article>
  );
};
export default Comment;

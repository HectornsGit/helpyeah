import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useTokenContext } from "../../contexts/TokenContext";
import Like from "../Like";

//Componente de los comentarios.
const Comment = ({
  id,
  user_id,
  entry_id,
  text,
  file_name,
  creation_date,
  setComments,
  comments,
  likes,
  avatar,
  username,
}) => {
  const { REACT_APP_BACKEND_PORT } = process.env; //Variable de entorno que guardar el puerto donde está hosteado el backend.
  const { loggedUser, token } = useTokenContext(); //Usuario actual y token del propio.

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

    //Este filter recorre los comentarios de la entry actual y devuelve todos menos los que tengan el id del comentario borrado.
    const filteredComments = comments.filter((comment) => {
      return comment.id !== id;
    });

    //Actualizamos el estado para que desaparezca de la entry el comentario que acabamos de borrar.
    setComments(filteredComments);
  };

  return (
    <article className="comment">
      <p>{text}</p>

      <button
        className={"downloadButton"}
        onClick={(e) => {
          //Esta función nos permite descargar el archivo del backend, aunque sea una imagen.
          saveAs(
            `http://localhost:${REACT_APP_BACKEND_PORT}/${file_name}`,
            file_name
          );
        }}
      />
      <p>{creation_date}</p>
      <footer>
        <ul>
          {
            //Mostramos el botón de like si el usuario no es el dueño del comentario.
            loggedUser.id !== user_id && (
              <li>
                <Like
                  likes={likes}
                  comments={comments}
                  setComments={setComments}
                  entry_id={entry_id}
                  id={id}
                />
              </li>
            )
          }
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

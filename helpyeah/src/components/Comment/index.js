import "./style.css";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import Avatar from "../Avatar";
import Like from "../Like";
import getTimeAgo from "../../utils/getTimeAgo";
import removeDateFromFilename from "../../utils/removeDateFromFilename";

//Componente de los comentarios.
const Comment = ({ comment, comments, setComments }) => {
  const { REACT_APP_BACKEND_PORT } = process.env; //Variable de entorno que guardar el puerto donde está hosteado el backend.
  const {
    id,
    user_id,
    entry_id,
    text,
    file_name,
    creation_date,
    likes,
    avatar,
    username,
    userLike,
  } = comment;

  const creationDateString = getTimeAgo(new Date(creation_date)); //Función que recibe una fecha y nos genera una string con el tiempo que hace desde la susodicha.

  const { loggedUser, token } = useTokenContext(); //Usuario actual y token del propio.

  const datelessFilename = removeDateFromFilename(file_name);

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
      <p className="commentText">{text}</p>

      <ul className="upperCommentPart">
        <li className="creationCommentDateContainer">
          <p>{creationDateString}</p>
        </li>
        {file_name && (
          <li className="commentDownloadButtonContainer">
            <p>{`${
              datelessFilename.length > 30
                ? datelessFilename.substr(0, 30) + "..."
                : datelessFilename
            }`}</p>
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
          </li>
        )}
      </ul>

      <footer>
        <ul>
          <li>
            <ul className="LikeWithUserAndAvatar">
              <li className="commentUserContainer">
                <Link to={`/users/${user_id}`}>
                  <article>
                    <Avatar avatar={avatar} username={username} />
                    <p>{username}</p>
                  </article>
                </Link>
              </li>
              {loggedUser.id === user_id && (
                <li className="deleteCommentButtonContainer">
                  <button
                    className="deleteCommentButton"
                    onClick={async (event) => {
                      deleteComent();
                    }}
                  />
                </li>
              )}
              {
                //Mostramos el botón de like si el usuario no es el dueño del comentario.
                loggedUser.id === user_id || !loggedUser.id ? (
                  <li>
                    <Like
                      disabled={true}
                      likes={likes}
                      comments={comments}
                      setComments={setComments}
                      entry_id={entry_id}
                      id={id}
                    />
                  </li>
                ) : (
                  <li>
                    <Like
                      userLike={userLike}
                      likes={likes}
                      comments={comments}
                      setComments={setComments}
                      entry_id={entry_id}
                      id={id}
                    />
                  </li>
                )
              }
            </ul>
          </li>
        </ul>
      </footer>
    </article>
  );
};
export default Comment;

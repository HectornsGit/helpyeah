import Modal from "../Modal";
import NewCommentForm from "../NewCommentForm";
import { useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { saveAs } from "file-saver";
import "./style.css";
import SolvedSwitch from "../SolvedSwitch";
import { toast } from "react-toastify";

//Componente de las entries.
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

  const [showModal, setShowModal] = useState(false); //Estado que maneja la modal del formulario de los comentarios.
  const [checked, setChecked] = useState(solved); //Estado para el switch de "resuelo"
  const { id } = useParams();
  const { REACT_APP_BACKEND_PORT } = process.env; //Puerto donde alojamos el servidor del backend.
  const location = useLocation();

  const dateRegex = /^\w+-\w+-\d{1,2}-\d{4}-/gi; //Regular expresion que selecciona las fechas en el formato de nuestro back.
  const datelessFilename = file_name?.replace(dateRegex, ""); //Nombre del archivo de la entry con la fecha eliminada.

  const navigate = useNavigate(); //Esto nos permite redirigir a otras rutas.

  //Función para borrar las entradas.
  const deleteEntry = async () => {
    try {
      //Fetch al back con método delete y el token del usuario.
      const res = await fetch(
        `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      //Guardamos la respuesta en una variable.
      const body = await res.json();

      //Si algo falla lanzamos un error.
      if (!res.ok) {
        throw new Error(body.message);
      }

      navigate("/");
    } catch (error) {
      //Mostramos el error por pantalla.
      toast(error.message);
    }
  };

  return (
    <article
      className={`entry ${
        location.pathname !== `/entries/${id}` ? "entryHomePage" : ""
      }`}
    >
      {
        //Si estamos en la página principal mostramos solo esto.
        location.pathname !== `/entries/${id}` && (
          <Link to={`/entries/${entry.id}`}>
            <header>
              <h2>{title}</h2>
            </header>
            <p>{description}</p>
          </Link>
        )
      }
      {
        //Si nos encontramos en la página de la entry, añadimos el switch para decidir si está resuelta o no.
        location.pathname === `/entries/${id}` && (
          <article className="user">
            <header>
              <h2>{title}</h2>
              <ul className="solvedbutton">
                <li className="switch">
                  <SolvedSwitch
                    setChecked={setChecked}
                    checked={checked}
                    user_id={user_id}
                  />
                </li>
                <li className="textoChecked">
                  {checked ? "Resuelto" : "Por resolver"}
                </li>
                <li className="parrafoCategoria">{category}</li>
              </ul>
            </header>
            <p>{description}</p>
          </article>
        )
      }
      {
        //Si tiene un archivo y estamos en la página de la entry, mostramos el botón de descarga.
        location.pathname === `/entries/${id}` && file_name && (
          <section className="entryDownload">
            <button
              className="downloadButton"
              onClick={(e) => {
                saveAs(
                  `http://localhost:${REACT_APP_BACKEND_PORT}/${file_name}`,
                  file_name
                );
              }}
            />
            <p>{`${
              datelessFilename.length > 30
                ? datelessFilename.substr(0, 30) + "..."
                : datelessFilename
            }`}</p>
          </section>
        )
      }

      <footer className="entryFooter">
        <Link to={`/users/${user_id}`}>
          <ul className="ulUsernameAndAvatar">
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

        {
          //Si estamos en la página de la entry mostramos el botón de comentar.
          location.pathname === `/entries/${id}` && (
            <ul className="delete-comment-items">
              <li>
                <button
                  className="newCommentButton"
                  onClick={(event) => {
                    if (!token) {
                      navigate("/login");
                    }
                    setShowModal(true);
                  }}
                ></button>
              </li>
              {
                //Si además fuésemos el usuario que la publicó, mostramos el de eliminar.
                loggedUser.id === user_id && (
                  <li>
                    <button
                      className="deleteEntryButton"
                      onClick={(event) => {
                        deleteEntry();
                      }}
                    ></button>
                  </li>
                )
              }
            </ul>
          )
        }
      </footer>
      {
        //Modal que con el formulario de los comentarios.
        showModal && (
          <Modal className="comments-modal" setShowModal={setShowModal}>
            <NewCommentForm
              setShowModal={setShowModal}
              setComments={setComments}
              comments={comments}
            />
          </Modal>
        )
      }
    </article>
  );
};
export default Entry;

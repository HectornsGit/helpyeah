import "./style.css";
import uploadIcon from "../../assets/images/uploadIcon.svg";
import { useState, useRef } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import ErrorMessage from "../ErrorMessage";
import { useParams } from "react-router-dom";
const { REACT_APP_BACKEND_PORT } = process.env;

const NewCommentForm = ({ setComments, comments, setShowModal }) => {
  //controlamos los estados de los inputs.
  const [text, setText] = useState("");
  const [uploadText, setUploadText] = useState("Sube tu archivo");
  const { id } = useParams();
  //Asigno useRef en el input correspondiente a files.
  const filesInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  //Llamo al contextToken.
  const { token } = useTokenContext();

  return (
    <>
      <form
        className="newCommentForm"
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            // Accedemos al input de ficheros con la referencia y nos traemos las imágenes que hay subidas en el input
            const files = filesInputRef.current?.files;

            const formData = new FormData();

            formData.set("text", text);

            if (files.length) {
              for (const file of files) {
                formData.set("file", file);
              }
            }
            const res = await fetch(
              `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${id}`,
              {
                method: "POST",
                headers: {
                  Authorization: token,
                },
                body: formData,
              }
            );

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            //Actualizamos el estado con el nuevo comentario para renderizar de nuevo la página.
            setComments([
              ...comments,
              {
                id: body.data.id,
                entry_id: id,
                text: body.data.text,
                creation_date: body.data.creation_date,
                user_id: body.data.idUser,
                file_name: body.data.file_name,
                avatar: body.data.avatar,
                username: body.data.username,
              },
            ]);
            setText("");
            filesInputRef.current.value = "";
            setShowModal(false);
          } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
          }
        }}
      >
        <label hidden className="writeYourComment" htmlFor="text">
          Escribe tu comentario...
        </label>
        <textarea
          id="text"
          required
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          placeholder="Escribe tu comentario..."
        />

        <label className="fileUpload" htmlFor="file_name">
          <img src={uploadIcon} alt="icono de subir archivo" />
          <p>
            {uploadText.length <= 30
              ? uploadText
              : uploadText.substring(0, 30) + "..."}
          </p>
        </label>
        <input
          hidden
          id="file_name"
          onChange={(event) => {
            setUploadText(event.target.value);
          }}
          multiple
          type="file"
          ref={filesInputRef}
        />

        <button className="postCommentButton">Publicar</button>
      </form>

      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </>
  );
};

export default NewCommentForm;

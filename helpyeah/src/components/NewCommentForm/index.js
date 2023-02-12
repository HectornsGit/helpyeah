import { useState, useRef } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { useParams } from "react-router-dom";
const { REACT_APP_BACKEND_PORT } = process.env;
const NewCommentForm = ({ setComments, comments }) => {
  //controlamos los estados de los inputs.
  const [text, setText] = useState("");
  const { id } = useParams();
  //Asigno useRef en el input correspondiente a files.
  const filesInputRef = useRef();

  //
  const [errorMessage, setErrorMessage] = useState("");

  //Llamo al contextToken.
  const { token } = useTokenContext();

  //llamo a useNavigate paa redireccionar al usuario.
  const navigate = useNavigate();
  return (
    <>
      <form
        className="newEntryForm"
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            // Accedemos al input de ficheros con la referencia y nos traemos las imágenes que hay subidas en el input
            const files = filesInputRef.current?.files;

            const formData = new FormData();

            formData.set("text", text);

            if (files.length) {
              formData.set(files.name, files);
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
            console.log(body.data.file_name);

            setComments([
              ...comments,
              {
                id: body.data.id,
                entry_id: id,
                text: body.data.text,
                creation_date: body.data.creation_date,
                user_id: body.data.idUser,
                file_name: body.data.file_name,
              },
            ]);

            // Redireccionamos al usuario a la página principal
          } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
          }
        }}
      >
        <label htmlFor="text">Escribe tu comentario...</label>
        <input
          id="text"
          required
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />

        <label htmlFor="file_name">Adjuntar archivo</label>
        <input id="file_name" multiple type="file" ref={filesInputRef} />

        <button>Publicar</button>
      </form>

      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </>
  );
};

export default NewCommentForm;

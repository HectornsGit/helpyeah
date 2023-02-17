import "./style.css";
import { useState, useRef } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
const { REACT_APP_BACKEND_PORT } = process.env;

const NewEntryForm = ({ setShowModal, setEntries, entries }) => {
  //Estados para controlar los inputs.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Otros");
  //Estado para el mensaje de error de haber uno y mostrarlo.
  const [errorMessage, setErrorMessage] = useState("");

  //Vinculamos Ref al input de ficheros para poder acceder a el.
  const filesInputRef = useRef();

  //Usamos el ContextToken para que este incluido en la peticion al crear una nueva entrada.
  const { token } = useTokenContext();

  //usamos useNavigate para redireccionar al usuario.
  const navigate = useNavigate();

  return (
    <>
      <form
        className="newEntryForm"
        onSubmit={async (event) => {
          try {
            //cancelamos la accion por defecto del form.
            event.preventDefault();

            //Accedemos al input de ficheros y tomamos el archivo que esta subida en el input.
            const files = filesInputRef.current?.files;

            //Creamos un form-data para enviar en el body ya que estamos enviando ficheros.
            const formData = new FormData();

            //Colocamos los datos introducidos por el usuario en el formData.
            formData.set("title", title);
            formData.set("description", description);
            formData.set("category", category);

            if (files.length) {
              for (const file of files) {
                formData.set("file", file);
              }
            }

            //Hacemos la peticion POST a la API y mandamos el formData en el body.
            const res = await fetch(
              `http://localhost:${REACT_APP_BACKEND_PORT}/entries`,
              {
                method: "POST",
                headers: {
                  Authorization: token,
                },
                body: formData,
              }
            );

            //accedemos al body de la res.
            const body = await res.json();

            //si la respuesta viene mal lanzamos un error con el mensaje del body.
            if (!res.ok) {
              throw new Error(body.message);
            }
            console.log("AQUI ", entries);
            setEntries([body.data, ...entries]);

            //Reseteamos los inputs del formulario.
            setTitle("");
            setDescription("");
            setCategory("Otros");

            //Cerramos la modal cambiando el estado.
            setShowModal(false);
          } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
          }
        }}
      >
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          required
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="description">Descripción:</label>
        <input
          id="description"
          required
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <label htmlFor="file_name">¡Sube tu archivo aquí!:</label>
        <input id="file_name" multiple type="file" ref={filesInputRef} />

        <label htmlFor="category">Categorias</label>

        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          id="category"
        >
          <option value={"Matemáticas"}>Matemáticas</option>
          <option value={"Traducciones"}>Traducciones</option>
          <option value={"Modelado 3D"}>Modelado 3D</option>
          <option value={"Ilustración"}>Ilustración</option>
          <option value={"Audio"}>Audio</option>
          <option value={"Otros"}>Otros</option>
        </select>

        <button>Publicar</button>
      </form>

      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </>
  );
};

export default NewEntryForm;

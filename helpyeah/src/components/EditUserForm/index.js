import "./style.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
const EditUserForm = ({ user, setUser, setShowModal, entries, setEntries }) => {
  //Estos son los estados para controlar los inputs.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const filesInputRef = useRef();

  const { REACT_APP_BACKEND_PORT } = process.env;
  const navigate = useNavigate();
  const { token } = useTokenContext();

  return (
    <form
      className="registerForm"
      onSubmit={async (event) => {
        try {
          //cancelamos la accion por defecto del form.
          event.preventDefault();

          //Accedemos al input de ficheros y tomamos el archivo que esta subida en el input.
          const files = filesInputRef.current?.files;

          //Creamos un form-data para enviar en el body ya que estamos enviando ficheros.
          const formData = new FormData();

          //Colocamos los datos introducidos por el usuario en el formData.
          formData.set("username", username);
          formData.set("email", email);
          formData.set("bio", bio);

          //Recorremos los archivos si es que hay y actualizamos el avatar.
          if (files.length) {
            for (const file of files) {
              formData.set("avatar", file);
            }
          }

          //Hacemos una peticion POST a la API y enviamos en el body un JSON con los datops que el usuario introdujo en el form.
          const res = await fetch(
            `http://localhost:${REACT_APP_BACKEND_PORT}/users`,
            {
              method: "PUT",
              headers: {
                Authorization: token,
              },
              body: formData,
            }
          );

          //Accedemos al body de la res
          const body = await res.json();

          //Lanzamos un error con el mensaje que viene en el body si la respuesta (res) viene mal.
          if (!res.ok) {
            throw new Error(body.message);
          }
          //Actualizamos el estado del usuario para que se renderice con la información nueva.
          setUser(body.data);

          //Cerramos la modal.
          setShowModal(false);
        } catch (error) {
          //Si hay error hacemos que aparezca por consola y al user en una alerta.
          console.error(error);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="avatar">Imagen</label>
      <input id="avatar" multiple type="file" ref={filesInputRef} />
      <label htmlFor="username">User name</label>
      <input
        id="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="username"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label htmlFor="bio">Bio</label>
      <input
        id="bio"
        value={bio}
        onChange={(event) => {
          setBio(event.target.value);
        }}
        placeholder="bio"
      />
      <button>Guardar Cambios</button>
    </form>
  );
};

export default EditUserForm;

import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = ({ setShowModal }) => {
  //Estos son los estados para controlar los inputs.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { REACT_APP_BACKEND_PORT } = process.env;
  const navigate = useNavigate();

  return (
    <form
      className="registerForm"
      onSubmit={async (event) => {
        try {
          //Cancelamos la accion por defecto del form.
          event.preventDefault();

          //Hacemos una peticion POST a la API y enviamos en el body un JSON con los datops que el usuario introdujo en el form.
          const res = await fetch(
            `http://localhost:${REACT_APP_BACKEND_PORT}/users`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password }),
            }
          );

          //Accedemos al body de la res
          const body = await res.json();

          //Lanzamos un error con el mensaje que viene en el body si la respuesta (res) viene mal.
          if (!res.ok) {
            throw new Error(body.message);
          }

          //Cerramos la modal
          setShowModal(false);

          //Colocamos una alerta que indique que el usuario se ha registrado.
          toast.success("¡Te has registrado!");
        } catch (error) {
          //Si hay error hacemos que aparezca por consola y al user en una alerta.
          console.error(error);
          toast.error(error.message);
        }
      }}
    >
      <label hidden className="username" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Nombre de usuario"
      />

      <label hidden className="email" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Correo electrónico"
      />

      <label hidden className="password" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Contraseña"
      />

      <button className="registerButtonForm">Register</button>
    </form>
  );
};

export default RegisterForm;

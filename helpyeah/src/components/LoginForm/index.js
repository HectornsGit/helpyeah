import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  //Estados para controlar los inputs.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Usamos la funcion setToken del context para poder modificar el estado del token una vez nos logueamos.
  const { setToken } = useTokenContext();

  //Llamamos al hook para luego redireccionar al usuario.
  const navigate = useNavigate();

  const { REACT_APP_BACKEND_PORT } = process.env;

  return (
    <form
      className="loginForm"
      onSubmit={async (event) => {
        try {
          //Cancelamos la accion por defecto.
          event.preventDefault();

          //Hacemos la peticion "POST" a la API  y enviamos en el body un JSON con los datos que ha introducido el usuario en el formulario de Login.
          const res = await fetch(
            `http://localhost:${REACT_APP_BACKEND_PORT}/users/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );
          //Accedemos al body de la res.
          const body = await res.json();

          //Si la respuesta viene mal lanzamos un error con el mensaje que viene en el body.
          if (!res.ok) {
            throw new Error(body.message);
          }

          // Cambiamos el estado y metemos el token recogido de la API
          setToken(body.data.token);

          // Redireccionamos al usuario a inicio
          navigate("/");

          // Colocamos una alerta que diga que el usuario se ha logueado.
          toast.success("¡Te has logueado!");
        } catch (error) {
          //Si ocurre algun error lo mostramos por consola y tambien al usuario.
          console.error(error);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="mail@mail.com"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="******"
      />

      <button>Iniciar sesion</button>
    </form>
  );
};

export default LoginForm;

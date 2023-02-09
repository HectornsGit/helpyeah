import { Link } from "react-router-dom";

const AuthWithOutToken = () => {
  return (
    <ul>
      <li>
        <Link to={"/register"}>Registro</Link>
      </li>
      <li>
        <Link to={"/login"}>Iniciar Sesión</Link>
      </li>
    </ul>
  );
};

export default AuthWithOutToken;

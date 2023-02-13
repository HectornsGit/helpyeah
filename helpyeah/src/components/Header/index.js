import { useTokenContext } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import AuthWithOutToken from "../Auth";
import AuthWithToken from "../LogOut";

const Header = () => {
  const { token, loggedUser } = useTokenContext();
  const { REACT_APP_BACKEND_PORT } = process.env;
  return (
    <header>
      <h1>
        <Link to={"/"}>Portal de Necesidades</Link>
        <Link to={`/users/${loggedUser.id}`}>
          <img
            src={`http://localhost:${REACT_APP_BACKEND_PORT}/${loggedUser.avatar}`}
          />
        </Link>
      </h1>

      {/* Si no hay token, pintamos los enlaces a registro y login */}
      <nav>
        {!token && <AuthWithOutToken />}
        {token && <AuthWithToken />}
      </nav>
    </header>
  );
};

export default Header;

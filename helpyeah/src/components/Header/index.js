import { useTokenContext } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import AuthWithOutToken from "../Auth";
import AuthWithToken from "../LogOut";

const Header = () => {
  const { token } = useTokenContext();

  return (
    <header>
      <h1>
        <Link to={"/"}>Portal de Necesidades</Link>
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

import { useTokenContext } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import Auth from "../Auth";

const Header = () => {
  const { token } = useTokenContext();

  return (
    <header>
      <h1>
        <Link to={"/"}>Portal de Necesidades</Link>
      </h1>

      {/* Si no hay token, pintamos los enlaces a registro y login */}
      <nav>{!token && <Auth />}</nav>
    </header>
  );
};

export default Header;

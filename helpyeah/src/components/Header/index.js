import { useTokenContext } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import AuthWithOutToken from "../Auth";
import AuthWithToken from "../LogOut";
import { useLocation } from "react-router-dom";
import "./style.css";

const Header = ({ allEntries, setEntries }) => {
  const { token } = useTokenContext();
  const location = useLocation();

  return (
    <header className="mainHeader">
      <h1>
        <Link to={"/"}>HelpYeah</Link>
      </h1>
      {location.pathname === "/" && (
        <select
          className="categories"
          onChange={(event) => {
            if (event.target.value === "Todas") {
              setEntries(allEntries);
              return;
            }
            const filteredEntries = allEntries.filter((entry) => {
              return entry.category === event.target.value;
            });
            setEntries(filteredEntries);
          }}
        >
          <option value={"Todas"}>-</option>
          <option value={"Matemáticas"}>Matemáticas</option>
          <option value={"Traducciones"}>Traducciones</option>
          <option value={"Modelado 3D"}>Modelado 3D</option>
          <option value={"Ilustración"}>Ilustración</option>
          <option value={"Audio"}>Audio</option>
          <option value={"Otros"}>Otros</option>
        </select>
      )}
      {/* Si no hay token, pintamos los enlaces a registro y login */}
      <nav className="mainHeaderNav">
        {!token && <AuthWithOutToken />}
        {token && <AuthWithToken />}
      </nav>
    </header>
  );
};

export default Header;

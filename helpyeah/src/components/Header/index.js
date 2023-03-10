import { useTokenContext } from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import AuthWithOutToken from "../AuthWithOutToken";
import AuthWithToken from "../AuthWithToken";
import { useLocation } from "react-router-dom";
import logoHelpyeah from "../../assets/images/Helpyeah.svg";
import "./style.css";

//Componente del header principal (allEntries es un estado creado para guardar todo el listado de entradas sin filtrar).
const Header = ({ allEntries, setEntries }) => {
  const { token } = useTokenContext();
  const location = useLocation(); //Hook que nos devuelve información sobre la ruta actual.

  const handleFilterEntries = (event) => {
    //Si selecciona todas las entradas, cambiamos el estado de vuelta al que tiene todas las entradas.
    if (event.target.value === "Todas") {
      setEntries(allEntries);
      return;
    }

    //Hacemos un filter del estado de todas las entradas, en el que nos quedamos solo con las de la categoría elegida.
    const filteredEntries = allEntries.filter((entry) => {
      return entry.category === event.target.value;
    });

    //Modificamos el estado de las entradas, con las entradas filtradas.
    setEntries(filteredEntries);
  };
  return (
    <header className="mainHeader">
      <section>
        <h1>
          <Link to={"/"}>
            <img
              className="logoHelpyeah"
              src={logoHelpyeah}
              alt="Logo Helpyeah"
            />
          </Link>
        </h1>
        {/* Si no hay token, renderizamos los enlaces a registro y login */}
        <nav className="mainHeaderNav">
          {!token && <AuthWithOutToken />}
          {token && <AuthWithToken />}
        </nav>
      </section>
      {
        //Si nos encontramos en la página principal, mostramos el selector que filtra las entradas.
        location.pathname === "/" && (
          <select
            className="categories"
            onChange={(event) => {
              handleFilterEntries(event);
            }}
          >
            <option value={"Todas"}>Categorías</option>
            <option value={"Matemáticas"}>Matemáticas</option>
            <option value={"Traducciones"}>Traducciones</option>
            <option value={"Modelado 3D"}>Modelado 3D</option>
            <option value={"Ilustración"}>Ilustración</option>
            <option value={"Audio"}>Audio</option>
            <option value={"Otros"}>Otros</option>
          </select>
        )
      }
    </header>
  );
};

export default Header;

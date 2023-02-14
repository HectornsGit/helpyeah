import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";

// Creamos un contexto para hacer el token accesible a todos los componentes de la App.
export const TokenContext = createContext();

export const CustomTokenContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [loggedUser, setLoggedUser] = useState({});

  const navigate = useNavigate();

  const { REACT_APP_BACKEND_PORT } = process.env;

  //useEffect para ejecutar despues del primer render y cada vez que cambia el token.
  useEffect(() => {
    //Si el token no existe, cambiamos loggedUser a un objeto vacio y cortamos la funcion.
    if (!token) {
      setLoggedUser({});
      return;
    }

    //Si el token existe recogemos la info de la API y colocamos los datos recogidos en el estado "loggedUser".
    const fetchUserProfile = async () => {
      try {
        const tokenEncryptedPayLoad = token.split(".")[1];
        const tokenPayLoad = JSON.parse(atob(tokenEncryptedPayLoad));

        const res = await fetch(
          `http://localhost:${REACT_APP_BACKEND_PORT}/users/${tokenPayLoad.id}`,
          {
            headers: { Authorization: token },
          }
        );

        //Mostramos la res del body.
        const body = await res.json();

        //Si la peticion no va bien lanzamos un error.
        if (!res.ok) {
          throw new Error(body.message);
        }
        setLoggedUser({ ...body.data.user, id: tokenPayLoad.id });
      } catch (error) {
        //si hay algun error cargando los datos del usuario logueado lanzamos una alerta.
        console.error(error);
        toast.error("Hubo un error en el login. Por favor intentalo de nuevo");
        setToken("");
        navigate("/login");
      }
    };

    //Llamo a la funcion que hace el fetch.
    fetchUserProfile();
  }, [token, navigate, setToken, REACT_APP_BACKEND_PORT]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, loggedUser, setLoggedUser }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};

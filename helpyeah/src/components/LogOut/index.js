import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import MenuList from "../MenuList";
const AuthWithToken = () => {
  const { setToken, loggedUser } = useTokenContext();
  const { REACT_APP_BACKEND_PORT } = process.env;

  const navigate = useNavigate();
  return (
    <>
      {Object.values(loggedUser).length && (
        <MenuList avatar={loggedUser.avatar} username={loggedUser.username} />
        /*         <ul>
          <li>
            <img
              alt={`avatar de ${loggedUser.username}`}
              src={`http://localhost:${REACT_APP_BACKEND_PORT}/${loggedUser.avatar}`}
            />
          </li>
          <li>
            <button
              onClick={() => {
                setToken("");
                navigate("/");
              }}
            >
              Logout
            </button>
          </li>
        </ul> */
      )}
    </>
  );
};

export default AuthWithToken;

import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

const AuthWithToken = () => {
  const { token, setToken, loggedUser } = useTokenContext();
  return (
    <ul>
      <li>
        <Link to="/entries/new">Nueva entrada</Link>
      </li>

      <li>
        <button
          onClick={() => {
            setToken("");
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

export default AuthWithToken;

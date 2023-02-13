import { Navigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";

const AuthWithToken = () => {
  const { token, setToken, loggedUser } = useTokenContext();

  const navigate = useNavigate();
  return (
    <ul>
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
    </ul>
  );
};

export default AuthWithToken;

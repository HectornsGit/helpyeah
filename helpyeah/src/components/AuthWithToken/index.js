import { useTokenContext } from "../../contexts/TokenContext";
import MenuList from "../MenuList";
const AuthWithToken = () => {
  const { loggedUser } = useTokenContext();

  return (
    <article className="menuListWithToken">
      {Object.values(loggedUser).length && (
        <MenuList avatar={loggedUser.avatar} username={loggedUser.username} />
      )}
    </article>
  );
};

export default AuthWithToken;

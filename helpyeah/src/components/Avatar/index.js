import "./style.css";

//Componente que muestra el avatar del usuario deseado, recibe un nombre de usuario y su avatar.
const Avatar = ({ username, avatar, menuOnClick }) => {
  const { REACT_APP_BACKEND_PORT } = process.env;
  return (
    <img
      onClick={menuOnClick}
      className="imageAvatar"
      src={`http://localhost:${REACT_APP_BACKEND_PORT}/${avatar}`}
      alt={`Avatar de: ${username}`}
    />
  );
};
export default Avatar;

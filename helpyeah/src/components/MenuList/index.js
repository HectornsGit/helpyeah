import { Menu, MenuItem } from "@mui/material";
import Avatar from "../Avatar";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate, useLocation } from "react-router-dom";
import personIcon from "../../assets/images/account_circle_FILL0_wght400_GRAD0_opsz48.svg";
import logoutIcon from "../../assets/images/logout_FILL0_wght400_GRAD0_opsz48.svg";

const MenuList = ({ avatar, username }) => {
  const { setToken, loggedUser } = useTokenContext(); //SetToken nos permite editar el Token del usuario y loggedUser acceder a su información.

  const navigate = useNavigate(); //Función para mover al usuario a otra página.
  const location = useLocation(); //Función para conocer la ruta actual.

  const [anchorEl, setAnchorEl] = useState(null); //En este estado se definirá donde deberá abrirse el menú, si el estado es null se cerrará.
  const open = Boolean(anchorEl); //Confirma si el estado del Anchor element es true o false.

  //Función que maneja la apertura del menú.
  const handleClick = (event) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget); //Define como elemento ancla el elemento que hemos clickado para que se abra ahí nuestro menú.
  };

  //Función que maneja el cierre del menú.
  const handleClose = (event) => {
    event.stopPropagation();

    setAnchorEl(null); //Si el elemento ancla es null el menú se cierra.
  };

  //Función que borra el token del usuario para cerrar su sesión.
  const handleLogOut = (event) => {
    event.stopPropagation();

    setToken(""); //Borramos el token de localStorage.
    navigate("/"); //Lo mandamos a la página de inicio.
  };

  //Función que lleva al usuario a su perfil.
  const handleGoToProfile = (event) => {
    event.stopPropagation();

    setAnchorEl(null); //Cerramos el menú.
    navigate(`/users/${loggedUser.id}`); //Lo mandamos a su perfil.
  };

  return (
    <>
      <Avatar avatar={avatar} menuOnClick={handleClick} username={username} />
      <Menu
        open={open}
        onClick={handleClick}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem
          onClick={
            location.pathname === `/users/${loggedUser.id}`
              ? handleClose
              : handleGoToProfile
          }
        >
          <img src={personIcon} alt="profile-button" />
          Perfil
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <img src={logoutIcon} alt="logout-button" />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default MenuList;

import { useState, useEffect } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

const Avatar = ({ username, avatar }) => {
  const { REACT_APP_BACKEND_PORT } = process.env;
  return (
    <img
      src={`http://localhost:${REACT_APP_BACKEND_PORT}/${avatar}`}
      alt={`Avatar de: ${username}`}
    />
  );
};
export default Avatar;

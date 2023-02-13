import { useState, useEffect } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

const Avatar = ({ username, avatar }) => {
  return <img src={avatar} alt={`Avatar de: ${username}`} />;
};
export default Avatar;

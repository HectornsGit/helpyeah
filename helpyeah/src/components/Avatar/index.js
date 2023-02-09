import { useState, useEffect } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

const Avatar = () => {
  const [avatar, setAvatar] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { REACT_APP_BACKEND_PORT } = process.env;
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await fetch(`http://localhost:${REACT_APP_BACKEND_PORT}`, {
          headers: token ? { Authorization: token } : {},
        });
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };

    fetchAvatar();
  }, []);

  return;
};

export default Avatar;

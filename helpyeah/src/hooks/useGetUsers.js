import { useEffect, useState } from "react";

const useGetUser = (id) => {
  //Estado donde guardaremos el objeto con la información del usuario.
  const [user, setUser] = useState({});
  //Estado para mostrar algo durante la fetch.
  const [loading, setLoading] = useState(false);
  //Estado para el mensaje de error.
  const [error, setError] = useState("");

  useEffect(() => {
    const { REACT_APP_BACKEND_PORT } = process.env;
    setLoading(true);

    try {
      const fetchUserById = async (id) => {
        const res = await fetch(
          `http://localhost:${REACT_APP_BACKEND_PORT}/users/${id}`
        );

        const body = await res.json();

        if (!res.status === "ok") {
          throw new Error(res.message);
        }

        setUser(body.data);
      };

      fetchUserById(id);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  });
  return { user, loading, error, setUser };
};

export default useGetUser;

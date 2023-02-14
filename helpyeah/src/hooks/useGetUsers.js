import { useEffect, useState } from "react";

const useGetUser = (id) => {
  //Estado donde guardaremos el objeto con la información del usuario.
  const [user, setUser] = useState({});
  //Estado para mostrar algo durante la fetch.
  const [loading, setLoading] = useState(false);
  //Estado para el mensaje de error.
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    try {
      const { REACT_APP_BACKEND_PORT } = process.env;
      const fetchUserById = async (id) => {
        if (!id) {
          return;
        }
        const res = await fetch(
          `http://localhost:${REACT_APP_BACKEND_PORT}/users/${id}`
        );

        const body = await res.json();

        if (!res.status === 200) {
          throw new Error(res.message);
        }

        setUser(body.data.user);
      };

      fetchUserById(id);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);
  return { user, loading, error, setUser };
};

export default useGetUser;

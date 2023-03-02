import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";

const useGetEntryById = (id) => {
  const [entry, setEntry] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useTokenContext();

  useEffect(() => {
    setLoading(true);
    try {
      const { REACT_APP_BACKEND_PORT } = process.env;
      const getEntryById = async () => {
        const res = await fetch(
          `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.message);
        }
        if (body.data.entry.length > 0) {
          setEntry(body.data.entry[0]);
        }

        setComments([...body.data.comments]);
      };
      getEntryById();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);
  return {
    entry,
    comments,
    setComments,
    setEntry,
    loading,
    error,
  };
};
export default useGetEntryById;

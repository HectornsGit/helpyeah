import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useGetEntries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    try {
      const { REACT_APP_BACKEND_PORT } = process.env;
      const getEntries = async () => {
        const res = await fetch(
          `http://localhost:${REACT_APP_BACKEND_PORT}/entries?${searchParams.toString()}`
        );
        const body = await res.json();
        if (!res.status == 200) {
          throw new Error();
        }
        setEntries(body.data.entries);
      };
      getEntries();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);
  return { entries, setEntries, loading, error, searchParams, setSearchParams };
};
export default useGetEntries;

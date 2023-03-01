import { useEffect } from "react";
import ListEntries from "../../components/ListEntries";
import Header from "../../components/Header";
import { useTokenContext } from "../../contexts/TokenContext";
import useGetEntries from "../../hooks/useGetEntries";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

const HomePage = () => {
  const { allEntries, entries, setEntries, loading } = useGetEntries();
  const { token } = useTokenContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entries]);
  return (
    <>
      {loading && <Spinner />}
      <Header allEntries={allEntries} setEntries={setEntries} />
      <section className="entriesSection">
        {entries.length > 0 && (
          <ListEntries entries={entries} setEntries={setEntries} />
        )}
      </section>
      {token && <Footer entries={allEntries} setEntries={setEntries} />}
    </>
  );
};

export default HomePage;

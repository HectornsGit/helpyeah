import { useEffect } from "react";
import ListEntries from "../../components/ListEntries";

const HomePage = ({ entries, setEntries }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entries]);
  return (
    <section>
      {entries.length > 0 && (
        <ListEntries entries={entries} setEntries={setEntries} />
      )}
    </section>
  );
};

export default HomePage;

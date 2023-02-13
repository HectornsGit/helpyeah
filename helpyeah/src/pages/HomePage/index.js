import { useEffect } from "react";
import ListEntries from "../../components/ListEntries";

const HomePage = ({ entries }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entries]);
  return (
    <section>{entries.length > 0 && <ListEntries entries={entries} />}</section>
  );
};

export default HomePage;

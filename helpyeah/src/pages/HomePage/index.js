import ListEntries from "../../components/ListEntries";
import useGetEntries from "../../hooks/useGetEntries";

const HomePage = () => {
  const { loading, entries } = useGetEntries();
  return (
    <section>{entries.length > 0 && <ListEntries entries={entries} />}</section>
  );
};

export default HomePage;

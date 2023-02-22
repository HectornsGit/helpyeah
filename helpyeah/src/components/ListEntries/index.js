import Entry from "../Entry";

const ListEntries = ({ entries, setEntries }) => {
  return (
    <ul>
      {entries.map((entry) => {
        return (
          <li key={entry.id}>
            <Entry entry={entry} setEntries={setEntries} entries={entries} />
          </li>
        );
      })}
    </ul>
  );
};
export default ListEntries;

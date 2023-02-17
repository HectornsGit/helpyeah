import Entry from "../Entry";
import { Link } from "react-router-dom";
const ListEntries = ({ entries, setEntries }) => {
  return (
    <ul>
      {entries.map((entry) => {
        return (
          <li key={entry.id}>
            <Link to={`/entries/${entry.id}`}>
              <Entry entry={entry} setEntries={setEntries} entries={entries} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ListEntries;

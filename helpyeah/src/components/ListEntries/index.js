import Entry from "../Entry";
import { Link } from "react-router-dom";
const ListEntries = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => {
        return (
          <li key={entry.id}>
            <Link to={`/entries/${entry.id}`}>
              <Entry entry={entry} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ListEntries;

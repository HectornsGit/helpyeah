import Entry from "../Entry";

const ListEntries = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => {
        console.log("aquiii", entry);
        const {
          category,
          commentCount,
          description,
          id,
          solved,
          title,
          username,
          file_name,
          user_id,
          avatar,
        } = entry;

        return (
          <li key={id}>
            <Entry
              title={title}
              description={description}
              file_name={file_name}
              category={category}
              commentCount={commentCount}
              solved={solved}
              username={username}
              entry_id={id}
              user_id={user_id}
              avatar={avatar}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ListEntries;

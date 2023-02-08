import Entry from "../Entry";

const ListEntries = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => {
        const {
          category,
          commentCount,
          description,
          id,
          solved,
          title,
          username,
        } = entry;
        return (
          <li key={id}>
            <Entry
              category={category}
              commentCount={commentCount}
              description={description}
              solved={solved}
              title={title}
              username={username}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ListEntries;

/*category: "Audio"
commentCount: 1
description: "Homer debería limpiar los canalones de la casa. 2"
file_name: "Sun Jan 08 2023-539d87f676fd452589aab06777c4a51a.gif"
id: 3
solved: 1
title: "Limpiar los canalones 2"
username: "Mitch"*/

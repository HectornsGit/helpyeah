const Entry = ({
  title,
  description,
  file_name,
  category,
  username,
  solved,
}) => {
  return (
    <article className={solved ? "solved" : "unsolved"}>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{description}</p>
      <p>{file_name}</p>
      <p>{category}</p>
      <footer>
        <h3>{username}</h3>
        <button>comment</button>
        <button>delete</button>
      </footer>
    </article>
  );
};
export default Entry;

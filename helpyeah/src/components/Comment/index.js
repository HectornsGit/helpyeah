import HalfRating from "../Rating";

const Comment = ({
  id,
  user_id,
  entry_id,
  text,
  file_name,
  creation_date,
  setComments,
  comments,
  averageRating,
}) => {
  return (
    <article>
      <p>{text}</p> <p>{creation_date}</p>
      <footer>
        <ul>
          <li>{user_id}</li>
          <li>
            <p>{entry_id}</p>
          </li>
          <li>{file_name}</li>
          <li>
            <HalfRating
              comment_id={id}
              entry_id={entry_id}
              setComments={setComments}
              comments={comments}
              averageRating={averageRating}
            />
          </li>
        </ul>
      </footer>
    </article>
  );
};
export default Comment;

/*creation_date: "2023-02-11T17:43:12.000Z"
entry_id:1
file_name: "Sat Feb 11 2023-Portal_de_necesidades (1).pdf"
id: 1
text: "Ahí adjunto archivo limpieza canalones."
user_id: 4 */

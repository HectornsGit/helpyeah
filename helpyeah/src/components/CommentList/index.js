import "./style.css";
import { Link } from "react-router-dom";
import Comment from "../Comment";

//C.id, C.user_id, C.entry_id, C.text, C.file_name, C.creation_date
const CommentList = ({ comments }) => {
  return (
    <ul className="commentList">
      {comments.map((comment) => {
        const { id, user_id, entry_id, text, file_name, creation_date } =
          comment;

        return (
          <li key={id}>
            <Comment
              id={id}
              user_id={user_id}
              entry_id={entry_id}
              text={text}
              file_name={file_name}
              creation_date={creation_date}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;

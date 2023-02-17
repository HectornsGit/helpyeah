import "./style.css";
import Comment from "../Comment";

const CommentList = ({ comments, setComments }) => {
  return (
    <ul className="commentList">
      {comments.map((comment) => {
        const {
          id,
          user_id,
          entry_id,
          avatar,
          username,
          text,
          file_name,
          creation_date,
          averageRating,
        } = comment;

        return (
          <li key={id}>
            <Comment
              id={id}
              user_id={user_id}
              entry_id={entry_id}
              text={text}
              avatar={avatar}
              username={username}
              file_name={file_name}
              creation_date={creation_date}
              comments={comments}
              setComments={setComments}
              averageRating={averageRating}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;

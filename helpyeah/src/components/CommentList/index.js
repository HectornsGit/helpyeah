import "./style.css";
import Comment from "../Comment";

//Componente que recibe los comentarios y los renderiza.
const CommentList = ({ comments, setComments }) => {
  return (
    <ul className="commentList">
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <Comment
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;

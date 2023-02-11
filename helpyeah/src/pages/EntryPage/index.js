import { useParams } from "react-router-dom";
import NewCommentForm from "../../components/NewCommentForm";
import { useTokenContext } from "../../contexts/TokenContext";
import useGetEntryById from "../../hooks/useGetEntryById";
import Entry from "../../components/Entry";
import Comment from "../../components/Comment";
import CommentList from "../../components/CommentList";

const EntryPage = () => {
  const { id } = useParams();
  const { entry, comments } = useGetEntryById(id);
  return (
    <section>
      {Object.values(entry).length > 0 && (
        <Entry
          title={entry.title}
          description={entry.description}
          file_name={entry.file_name}
          category={entry.category}
          commentCount={entry.commentCount}
          solved={entry.solved}
          username={"Pepe"}
        />
      )}
      {comments.length > 0 && <CommentList comments={comments} />}
      <NewCommentForm />
    </section>
  );
};
export default EntryPage;

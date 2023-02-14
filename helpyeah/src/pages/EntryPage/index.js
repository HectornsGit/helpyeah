import { useParams } from "react-router-dom";
import useGetEntryById from "../../hooks/useGetEntryById";
import Entry from "../../components/Entry";
import CommentList from "../../components/CommentList";

const EntryPage = () => {
  const { id } = useParams();
  const { entry, comments, setComments } = useGetEntryById(id); //PROBAR PASAR POR PROPS DESDE APPJS

  return (
    <section>
      {Object.values(entry).length && (
        <Entry comments={comments} setComments={setComments} entry={entry} />
      )}
      {comments.length > 0 && <CommentList comments={comments} />}
    </section>
  );
};
export default EntryPage;

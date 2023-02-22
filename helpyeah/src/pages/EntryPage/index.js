import { useParams } from "react-router-dom";
import useGetEntryById from "../../hooks/useGetEntryById";
import Entry from "../../components/Entry";
import CommentList from "../../components/CommentList";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

const EntryPage = ({ entries, setEntries }) => {
  const { id } = useParams();
  const { entry, comments, setComments, error, loading } = useGetEntryById(id);

  return (
    <section>
      {error && <ErrorMessage msg={error} />}
      {loading && <Spinner />}
      {!loading && entry ? (
        <Entry
          comments={comments}
          setComments={setComments}
          entries={entries}
          setEntries={setEntries}
          entry={entry}
        />
      ) : null}
      {!loading && comments.length > 0 && (
        <CommentList comments={comments} setComments={setComments} />
      )}
    </section>
  );
};
export default EntryPage;

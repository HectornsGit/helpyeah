import { useParams } from "react-router-dom";
import useGetEntryById from "../../hooks/useGetEntryById";
import Entry from "../../components/Entry";
import CommentList from "../../components/CommentList";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../contexts/TokenContext";
const EntryPage = () => {
  const { id } = useParams();
  const { entry, comments, setComments, error, loading } = useGetEntryById(id);
  const { token } = useTokenContext();
  return (
    <>
      <Header />
      <section>
        {error && <ErrorMessage msg={error} />}
        {loading && <Spinner />}
        {!loading && entry ? (
          <Entry comments={comments} setComments={setComments} entry={entry} />
        ) : null}
        {!loading && comments.length > 0 && (
          <CommentList comments={comments} setComments={setComments} />
        )}
      </section>
      {token && <Footer />}
    </>
  );
};
export default EntryPage;

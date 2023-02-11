import NewCommentForm from "../../components/NewCommentForm";
import { useTokenContext } from "../../contexts/TokenContext";
import { Navigate } from "react-router-dom";

const NewCommentPage = () => {
  const { token } = useTokenContext();

  // Si no hay token, redireccionamos a "/login""
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2>Comenta aquí</h2>
      <NewCommentForm />
    </section>
  );
};

export default NewCommentPage;

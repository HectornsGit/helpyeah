import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section>
      <h1> Not Found</h1>
      <Link to="/">Volver a la Home</Link>
    </section>
  );
};

export default NotFoundPage;

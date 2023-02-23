import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../contexts/TokenContext";
const NotFoundPage = () => {
  const { token } = useTokenContext();
  return (
    <>
      <Header />
      <section>
        <h1> Not Found</h1>
        <Link to="/">Volver a la Home</Link>
      </section>
      {token && <Footer />}
    </>
  );
};

export default NotFoundPage;

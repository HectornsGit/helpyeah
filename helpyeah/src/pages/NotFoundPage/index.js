import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../contexts/TokenContext";
import "./style.css";
const NotFoundPage = () => {
  const { token } = useTokenContext();
  return (
    <>
      <Header />
      <section className="notFoundSection">
        <h1> Not Found</h1>
        <Link to="/">Volver a la Home</Link>
      </section>
      {token && <Footer />}
    </>
  );
};

export default NotFoundPage;

import "./style.css";
import useGetUser from "../../hooks/useGetUsers";
import { useParams } from "react-router-dom";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../contexts/TokenContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, setUser } = useGetUser(id);
  const { token } = useTokenContext();

  return (
    <article className="profilePage">
      <Header />
      <section>
        {Object.values(user).length > 0 && (
          <Profile user={user} setUser={setUser} />
        )}
      </section>

      {token && <Footer />}
    </article>
  );
};

export default ProfilePage;

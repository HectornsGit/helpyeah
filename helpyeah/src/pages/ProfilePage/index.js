import useGetUser from "../../hooks/useGetUsers";
import { useParams } from "react-router-dom";
import Profile from "../../components/Profile";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../contexts/TokenContext";

const ProfilePage = ({ entries, setEntries }) => {
  const { id } = useParams();
  const { user, setUser } = useGetUser(id);
  const { token } = useTokenContext();
  return (
    <>
      <Header />
      <section>
        <h2>Mi perfil</h2>

        {Object.values(user).length > 0 && (
          <Profile
            entries={entries}
            setEntries={setEntries}
            user={user}
            setUser={setUser}
          />
        )}
      </section>
      {token && <Footer />}
    </>
  );
};

export default ProfilePage;

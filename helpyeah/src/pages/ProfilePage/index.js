import useGetUser from "../../hooks/useGetUsers";
import { useParams } from "react-router-dom";
import Profile from "../../components/Profile";
// import { useState } from "react";
// import { toast } from "react-toastify";

const ProfilePage = ({ entries, setEntries }) => {
  const { id } = useParams();
  const { user, setUser } = useGetUser(id);
  return (
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
  );
};

export default ProfilePage;

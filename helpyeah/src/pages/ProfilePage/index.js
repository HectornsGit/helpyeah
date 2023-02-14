import Avatar from "../../components/Avatar";
import getTimeAgo from "../../utils/getTimeAgo";
import useGetUser from "../../hooks/useGetUsers";
import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useGetUser(id);
  const { REACT_APP_BACKEND_PORT } = process.env;
  return (
    <section>
      <h2>Mi perfil</h2>

      {Object.values(user).length > 0 && (
        <article>
          <Avatar
            avatar={`http://localhost:${REACT_APP_BACKEND_PORT}/${user.avatar}`}
            username={user.username}
          />
          <h3>Nombre de usuario: {user.username}</h3>
          <h4>Email: {user.email}</h4>
          <h4>Bio: {user.bio}</h4>
          <p>Se unió {getTimeAgo(new Date(user.registration_date))}</p>
        </article>
      )}
    </section>
  );
};

export default ProfilePage;

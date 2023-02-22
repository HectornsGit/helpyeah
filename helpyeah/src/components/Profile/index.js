import Avatar from "../../components/Avatar";
import getTimeAgo from "../../utils/getTimeAgo";
import Modal from "../Modal/Modal";
import EditUserForm from "../EditUserForm";
import { useState } from "react";

const Profile = ({ user, setUser, entries, setEntries }) => {
  const { avatar, username, email, bio, registration_date } = user;
  const [showModal, setShowModal] = useState(false);

  return (
    <article>
      <Avatar avatar={avatar} username={username} />
      <h3>Nombre de usuario: {username}</h3>
      <h4>Email: {email}</h4>
      <h4>Bio: {bio}</h4>
      <p>Se unió {getTimeAgo(new Date(registration_date))}</p>

      <button
        className="editProfile"
        onClick={(event) => {
          setShowModal(true);
        }}
      >
        EDITAR
      </button>

      {showModal && (
        <Modal setShowModal={setShowModal}>
          <EditUserForm
            setShowModal={setShowModal}
            setUser={setUser}
            user={user}
            entries={entries}
            setEntries={setEntries}
          />
        </Modal>
      )}
    </article>
  );
};
export default Profile;

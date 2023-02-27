import "./style.css";
import Avatar from "../../components/Avatar";
import getTimeAgo from "../../utils/getTimeAgo";
import Modal from "../Modal";
import EditUserForm from "../EditUserForm";
import { useState } from "react";

const Profile = ({ user, setUser }) => {
  const { avatar, username, email, bio, registration_date } = user;
  const [showModal, setShowModal] = useState(false);

  return (
    <article className="profileArticle">
      <Avatar avatar={avatar} username={username} />
      <h2>{username}</h2>
      <h4>{email}</h4>
      <p>{bio}</p>
      <p>Te has unido {getTimeAgo(new Date(registration_date))}</p>

      <button
        className="editProfile"
        onClick={(event) => {
          setShowModal(true);
        }}
      />

      {showModal && (
        <Modal className="profile-modal" setShowModal={setShowModal}>
          <EditUserForm
            setShowModal={setShowModal}
            setUser={setUser}
            user={user}
          />
        </Modal>
      )}
    </article>
  );
};
export default Profile;

import "./style.css";
import Avatar from "../../components/Avatar";
import getTimeAgo from "../../utils/getTimeAgo";
import Modal from "../Modal";
import EditUserForm from "../EditUserForm";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

const Profile = ({ user, setUser }) => {
  const { avatar, username, email, bio, registration_date } = user;
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { loggedUser } = useTokenContext();
  return (
    <article className="profileArticle">
      <Avatar avatar={avatar} username={username} />
      <h2>{username}</h2>
      <h4>{email}</h4>
      <p>{bio}</p>
      <p>Te has unido {getTimeAgo(new Date(registration_date))}</p>

      {loggedUser.id === parseInt(id) && (
        <button
          className="editProfile"
          onClick={(event) => {
            setShowModal(true);
          }}
        />
      )}

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

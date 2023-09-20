import React, { useState } from "react";
import { useAuth } from "../../utils/useAuth";
import { useEffect } from "react";
import PasswordModal from "./Password Modal";
import ChangePasswordForm from "./Password Modal/PasswordModal";
import EditProfileModal from "./Edit Profile Modal";
import EditProfileForm from "./Edit Profile Modal/EditProfileModal";

function Profile() {
  const { auth } = useAuth();

  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalIsOpen(false);
  };

  const openEditProfileModal = () => {
    setEditProfileModalIsOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalIsOpen(false);
  };

  console.log(auth.user.email);
  console.log(auth.user.id);

  return (
    <div>
      <div className="border dark:border-primary border-secondary p-5 rounded-lg">
        <h2 className="text-center dark:text-white text-black text-lg">
          Account details
        </h2>
        <p>Username: {auth.user.username}</p>
        <p>Email: {auth.user.email}</p>
        <button
          className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          onClick={openEditProfileModal}
        >
          Edit Profile
        </button>
        <button
          className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          onClick={openPasswordModal}
        >
          Change password
        </button>
      </div>
      <EditProfileModal
        isOpen={editProfileModalIsOpen}
        onRequestClose={closeEditProfileModal}
      >
        <EditProfileForm onProfileChanged={closeEditProfileModal} />
      </EditProfileModal>
      <PasswordModal
        isOpen={passwordModalIsOpen}
        onRequestClose={closePasswordModal}
      >
        <ChangePasswordForm onPasswordChanged={closePasswordModal} />
      </PasswordModal>
    </div>
  );
}

export default Profile;

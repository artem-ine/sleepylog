import React, { useState } from "react";
import { useAuth } from "../../utils/useAuth";
import PasswordModal from "./Password Modal";
import ChangePasswordForm from "./Password Modal/PasswordModal";
import EditProfileModal from "./Edit Profile Modal";
import EditProfileForm from "./Edit Profile Modal/EditProfileModal";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { auth, handleLogout } = useAuth();
  const navigate = useNavigate();
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

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`/api/users/${auth.user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.ok) {
        alert("Profile deleted successfully");
        await handleLogout();
        navigate("/");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Profile deletion failed.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during profile deletion.");
    }
  };

  console.log(auth.user.email);
  console.log(auth.user.id);

  return (
    <div>
      <div className="border dark:border-primary border-secondary p-3 rounded-lg">
        <h2 className="text-center dark:text-white text-black text-lg">
          Account details
        </h2>
        <p>Username: {auth.user.username}</p>
        <p>Email: {auth.user.email}</p>
        <br />
        <div className="flex flex-row gap-4">
          <button
            className="bg-primary dark:bg-secondary text-black dark:text-white hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={openEditProfileModal}
          >
            Edit Profile
          </button>
          <button
            className="bg-primary dark:bg-secondary text-black dark:text-white hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={openPasswordModal}
          >
            Change password
          </button>
          <button
            className="bg-primary dark:bg-secondary text-black dark:text-white hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={handleDeleteProfile}
          >
            Delete Profile
          </button>
        </div>
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

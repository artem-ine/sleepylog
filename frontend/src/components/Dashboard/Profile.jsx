import React, { useState } from "react";
import { useAuth } from "../../utils/useAuth";
import PasswordModal from "./Password Modal";
import ChangePasswordForm from "./Password Modal/PasswordModal";
import EditProfileModal from "./Edit Profile Modal";
import EditProfileForm from "./Edit Profile Modal/EditProfileModal";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );

      if (confirmDelete) {
      try {
        const response = await fetch(`/api/users/${auth.user.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (response.ok) {
          toast.success("Profile deleted!");
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
  };

  console.log(auth.user.email);
  console.log(auth.user.id);

  const handleResetPassword = async () => {
    const confirmResetPassword = window.confirm(
      "Are you sure you want to reset your password?"
    );

      if (confirmResetPassword) {
      try {
        const response = await fetch("/api/users/password/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            user: { email: auth.user.email },
          }),
        });

        if (response.ok) {
          toast.success("Please check your email to change your password!");
        } else {
          const errorData = await response.json();
          const errorMessage =
            errorData.message || "Failed to send password reset link.";
          alert(errorMessage);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while sending the password reset link.");
      }
    };
  };

  return (
    <div>
      <div className="border border-2 dark:border-primary border-secondary p-3 rounded-xl py-5">
        <h2 className="font-logo mb-2 text-center dark:text-white text-black text-lg">
          Account details
        </h2>
        <p>Username: {auth.user.username}</p>
        <p>Email: {auth.user.email}</p>
        <div className="flex flex-row gap-4 mt-5">
          <button
            className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl"
            onClick={openEditProfileModal}
          >
            Edit Profile
          </button>
          <button
            className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <button
            className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl"
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

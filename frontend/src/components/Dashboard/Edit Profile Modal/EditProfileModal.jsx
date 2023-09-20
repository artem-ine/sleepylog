import { useState } from "react";
import useErrorHandler from "../../../utils/errorHandler";
import { useAuth } from "../../../utils/useAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function EditProfileForm({ onProfileChanged }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: auth.user.username,
    email: auth.user.email,
  });

  const { error, showError } = useErrorHandler();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.username || !formData.email) {
        showError("All fields are required");
        return;
      }

      const response = await fetch(`/api/users/${auth.user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage =
          data.message ||
          "Profile updated successfully. Refresh the page to see it!";
        alert(successMessage);
        if (onProfileChanged) {
          onProfileChanged();
        }
        navigate("/");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Profile change failed.";
        showError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred during password change.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl border-secondary border-4 px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h1 className="font-heading text-center text-black text-2xl mb-5">
              Edit Profile
            </h1>
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black text-sm font-bold mb-2"
            >
              New Username:
            </label>
            <input
              type="string"
              id="newUsername"
              name="username"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2"
            >
              New Email:
            </label>
            <input
              type="string"
              id="newEmail"
              name="email"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="New Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
          {error && <p className="text-xs italic">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;

EditProfileForm.propTypes = {
  onProfileChanged: PropTypes.func,
};

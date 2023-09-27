import { useState } from "react";
import useErrorHandler from "../../../utils/errorHandler";
import { useAuth } from "../../../utils/useAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
        toast.error("Whoops! A username and email is still required!");
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
        if (onProfileChanged) {
          onProfileChanged();
        }
        toast.success('Your profile was successfully updated!', {
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        toast.error('Whoops, something went wrong.');
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred.");
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
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
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
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              placeholder="New Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
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

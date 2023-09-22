import { useState } from "react";
import useErrorHandler from "../../../utils/errorHandler";
import { useAuth } from "../../../utils/useAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ChangePasswordForm({ onPasswordChanged }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
      if (
        !formData.currentPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        showError("All fields are required");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        showError("New password and confirmation do not match");
        return;
      }

      const response = await fetch("/user/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          password_confirmation: formData.confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage = data.message || "Password updated successfully.";
        alert(successMessage);
        if (onPasswordChanged) {
          onPasswordChanged();
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
          className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h1 className="font-heading text-center text-black text-2xl mb-5">
              Change Password
            </h1>
            <label
              htmlFor="currentPassword"
              className="block text-black text-sm font-bold mb-2"
            >
              Current Password:
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-black text-sm font-bold mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-black text-sm font-bold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
            >
              Change Password
            </button>
          </div>
          {error && <p className="text-xs italic">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
  onPasswordChanged: PropTypes.func,
};

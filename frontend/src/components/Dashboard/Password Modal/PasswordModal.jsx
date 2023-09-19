import { useState } from "react";
import useErrorHandler from "../../../utils/errorHandler";
import { useAuth } from "../../../utils/useAuth";

function ChangePasswordForm({ onClose }) {
  const { auth } = useAuth();
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
      // Validate the form data (e.g., check for empty fields)
      if (
        !formData.currentPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        showError("All fields are required");
        return;
      }

      // Check if new password and confirmation match
      if (formData.newPassword !== formData.confirmPassword) {
        showError("New password and confirmation do not match");
        return;
      }

      // Make an API request to change the password
      const response = await fetch("/user/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // Include the JWT token here
        },
        body: JSON.stringify({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          password_confirmation: formData.confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Optionally, you can clear the form fields here.

        // Display a success message and close the modal
        alert(data.message); // You can replace this with your preferred way to display success messages
        onClose();
      } else {
        const errorMessage = data.message || "Password change failed.";
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
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
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

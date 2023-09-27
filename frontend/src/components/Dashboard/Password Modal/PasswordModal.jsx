import { useState, useEffect } from "react";
import useErrorHandler from "../../../utils/errorHandler";
import { useAuth } from "../../../utils/useAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function ChangePasswordForm({ onPasswordChanged }) {
  const navigate = useNavigate();
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const currentUrl = window.location.href;

    const urlSearchParams = new URLSearchParams(new URL(currentUrl).search);

    const tokenFromUrl = urlSearchParams.get("reset_password_token");

    if (tokenFromUrl) {
      console.log("Reset Password Token:", tokenFromUrl);
      setResetPasswordToken(tokenFromUrl);
    } else {
      console.error("Reset Password Token not found in URL.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.newPassword || !formData.confirmPassword) {
        toast.error("All fields are required!");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and password confirmation do not match!");
        return;
      }

      const response = await fetch("/api/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            password: formData.newPassword,
            password_confirmation: formData.confirmPassword,
            reset_password_token: resetPasswordToken,
          },
        }),
      });

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        if (onPasswordChanged) {
          onPasswordChanged();
        }
        navigate("/");
        return;
      } else {
        const data = await response.json();
        if (response.ok) {
          const successMessage =
            data.message || "Password updated successfully.";
          alert(successMessage);
          if (onPasswordChanged) {
            onPasswordChanged();
          }
          navigate("/");
        } else {
          const errorMessage = data.message || "Password reset failed.";
          showError(errorMessage);
        }
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred during password reset.");
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

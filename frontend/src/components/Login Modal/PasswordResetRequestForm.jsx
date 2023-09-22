import React, { useState } from "react";
import PropTypes from "prop-types";

function PasswordResetRequestForm({ onRequestClose }) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { email: email },
        }),
      });

      if (response.ok) {
        alert("Password reset link sent successfully");
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to send password reset link.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the password reset link.");
    }
  };

  return (
    <div>
      <h2>Forgotten your password?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-black text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
        >
          Send Reset Link
        </button>
      </form>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
      >
        Close
      </button>
    </div>
  );
}

PasswordResetRequestForm.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onPasswordResetRequest: PropTypes.func.isRequired,
};

export default PasswordResetRequestForm;

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
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="font-heading">Forgot your password?</h2>
          <p>
            Pop your email in, and if it matches an existing account, we'll send
            you a link.
          </p>
          <br />
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
          <button
            onClick={onRequestClose}
            className="mt-4 bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
          >
            Return to login
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetRequestForm;

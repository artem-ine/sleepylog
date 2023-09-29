/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";

function PasswordResetRequestForm({ onRequestClose }) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmResetPassword = window.confirm(
      "Are you sure you want to reset your password?"
    );

    if (confirmResetPassword) {
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
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h1 className="font-heading text-center text-black text-2xl mb-5">
            Forgot your password?
          </h1>
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
          <div className="flex gap-2 justify-center">
            <button
              aria-label="return to login form"
              onClick={onRequestClose}
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
            >
              <FaArrowLeftLong />
            </button>
            <button
              aria-label="send reset link"
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetRequestForm;

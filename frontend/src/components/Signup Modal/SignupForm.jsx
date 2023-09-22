import React, { useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import useErrorHandler from "../../utils/errorHandler";
import { toast } from 'react-toastify';

function SignupForm({ onSignupSuccess }) {
  const { error, showError } = useErrorHandler();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_Confirmation] = useState("");
  const data = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
            password_confirmation: password_confirmation,
          },
        }),
      });

      if (response.ok) {
        try {
          const response = await fetch("/api/users/sign_in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: { email: email, password: password },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const token = response.headers.get("Authorization");
            console.log("loggin in:" + token);
            console.log("check token + user data:", data.user + token);
            Cookies.set("token", token);
            const decToken = jwt_decode(token);
            console.log("dec tok" + decToken.sub);
          } else {
            const errorMessage = data.message || "Login failed.";
            showError(errorMessage);
          }
        } catch (error) {
          console.error(error);
          showError("An error occurred during login.");
        }
        if (onSignupSuccess) {
          onSignupSuccess();
        }
        window.location.reload();
        toast.success('Yay! Sign up successful!');
      } else {
        const errorData = await response.json();
        if (errorData && errorData.errors) {
          const errorMessages = errorData.errors.join(", ");
          toast.error(`Whoops! ${errorMessages}`);
        }
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred during registration.");
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
            <h1 className="font-heading text-center text-black mb-5">
              Sign up
            </h1>
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="passwordConfirmation"
            >
              Password Confirmation
            </label>
            <input
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              id="password_Confirmation"
              type="password"
              placeholder="Password Confirmation"
              value={password_confirmation}
              onChange={(e) => setPassword_Confirmation(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm py-2 px-4 rounded-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
          {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

SignupForm.propTypes = {
  onSignupSuccess: PropTypes.func,
};

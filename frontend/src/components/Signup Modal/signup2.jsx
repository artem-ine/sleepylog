// RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

function SignupForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password, password_confirmation: password_confirmation } }),
    });

    const data = await response.json();

    if (response.ok) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          isAuthenticated: true,
          user: data.user,
          token: data.jwt,
        }));
        navigate("/");
      } else {
        const errorMessage = data.message || "Registration failed.";
        showError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className="font-heading text-center text-black mb-5">Sign up</h1>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="passwordConfirmation">
              Password Confirmation
            </label>
            <input
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              id="password_Confirmation"
              type="password"
              placeholder="Password Confirmation"
              value={password_confirmation}
              onChange={(e) => setPassword_Confirmation(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useErrorHandler from "../../utils/errorHandler";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';

function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {};
  const { error, showError } = useErrorHandler();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate("/");
        toast.success('Login successful!');
      } else {
        toast.error(`Whoops! Something went wrong.`);
      }
    } catch (error) {
      toast.error(`Whoops. Something went wrong.`);
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
              Log in
            </h1>
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="bg-white shadow appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-secondary border border-black hover:bg-blue-700 font-bold text-white text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          {error && <p className="text-xs italic">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func,
};

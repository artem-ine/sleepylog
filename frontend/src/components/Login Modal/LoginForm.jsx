import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../../utils/errorHandler";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/useAuth";

function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useErrorHandler();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn(email, password, false);
      if (result.error) {
        toast.error(`Whoops! ${result.error}`);
      } else {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate("/");
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error(`Whoops! ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl  border-secondary border-4 px-8 pt-6 pb-8 mb-4"
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
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
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
              className="bg-white appearance-none border rounded-xl w-full py-2 px-3 text-black text-sm leading-tight"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2 flex justify-center">
            <button
              aria-label="login"
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm p-2 px-4 rounded-xl"
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

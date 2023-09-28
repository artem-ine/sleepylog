import { useState } from "react";
import PropTypes from "prop-types";
import useErrorHandler from "../../utils/errorHandler";
import { toast } from "react-toastify";
import { useAuth } from "../../utils/useAuth";

function SignupForm({ onSignupSuccess }) {
  const { error } = useErrorHandler();
  const { signUp } = useAuth();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_Confirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signUpResponse = await signUp(
        username,
        email,
        password,
        password_confirmation
      );

      if (!signUpResponse.error) {
        const signInResponse = await signIn(email, password, false);

        if (!signInResponse.error) {
          if (onSignupSuccess) {
            onSignupSuccess();
          }
          toast.success("Yay! Sign up and login successful!", {
            onClose: () => {
              window.location.reload();
            },
          });
        } else {
          toast.error(
            `Whoops! Sign up succeeded but login failed: ${signInResponse.error}`
          );
        }
      } else {
        toast.error(`Whoops! ${signUpResponse.error}.`);
      }
    } catch (error) {
      toast.error(`Whoops! ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded-2xl border border-secondary border-4 px-8 pt-6 pb-8"
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="mb-2 flex justify-center">
            <button
              aria-label="sign up"
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm p-2 px-4 rounded-xl"
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

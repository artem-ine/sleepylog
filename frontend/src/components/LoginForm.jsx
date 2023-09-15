import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useErrorHandler from "../utils/errorHandler";
import { useAuth } from "../utils/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, showError } = useErrorHandler();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/users/sign_in", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { email: email, password: password },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          token: data.jwt,
        });
        const token = data.jwt;
        Cookies.set("token", token);
        console.log(data.jwt);
        navigate("/profile");
      } else {
        const errorMessage = data.message || "Login failed.";
        showError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      showError("An error occurred during login.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

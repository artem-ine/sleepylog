import { useAtom } from "jotai";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import { authAtom } from "./authAtom";

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const jwtToken = Cookies.get("token");

  if (jwtToken && !auth.isAuthenticated) {
    try {
      const decodedToken = jwt_decode(jwtToken);

      fetch(`/api/users/${decodedToken.sub}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setAuth({
            isAuthenticated: true,
            user: userData,
            token: jwtToken,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  const signUp = async (username, email, password, password_confirmation) => {
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
            password_confirmation,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = response.headers.get("Authorization");
        Cookies.set("token", token);
        return data;
      } else {
        const errorData = await response.json();
        return { error: errorData.errors || "Sign-up failed." };
      }
    } catch (error) {
      return {
        error: error.message || "An error occurred during sign-up.",
      };
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await fetch("/api/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = response.headers.get("Authorization");
        Cookies.set("token", token);
        return data;
      } else {
        const errorData = await response.text();
        return { error: errorData || "Sign-in failed." };
      }
    } catch (error) {
      return {
        error: error.message || "An error occurred during sign-in.",
      };
    }
  };

  const handleLogout = () => {
    const authToken = Cookies.get("token");
    const jwtToken = authToken ? authToken.split(" ")[1] : null;

    if (jwtToken) {
      fetch("/api/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(() => {
          Cookies.remove("token");
          setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          toast.success("See you again soon!");
        })
        .catch((error) => {
          toast.error("Whoops! Something went wrong.");
        });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    }
  };

  return {
    auth,
    handleLogout,
    setAuth,
    signUp,
    signIn,
  };
};

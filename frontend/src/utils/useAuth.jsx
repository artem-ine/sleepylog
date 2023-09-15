import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { authAtom } from "./authAtom";
import fetchApi from "./api";

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const jwtToken = Cookies.get("token");

  if (jwtToken && !auth.isAuthenticated) {
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    fetchApi("/api/users/me", options)
      .then((userData) => {
        setAuth({
          isAuthenticated: true,
          user: userData,
          token: jwtToken,
        });
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  const handleLogout = () => {
    Cookies.remove("token");
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return {
    auth,
    handleLogout,
    setAuth,
  };
};

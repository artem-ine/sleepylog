import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChangePasswordForm from "../../components/Dashboard/Profile/Password Modal/PasswordModal";
import { useAuth } from "../../utils/useAuth";

function PasswordReset() {
  const { auth } = useAuth();

  return (
    <>
      {" "}
      <Navbar />
      <main className="bg-white dark:bg-black text-black dark:text-white">
        <ChangePasswordForm />
      </main>
      <Footer />
    </>
  );
}

export default PasswordReset;

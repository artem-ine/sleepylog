import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChangePasswordForm from "../../components/Dashboard/Profile/Password Modal/PasswordModal";

function PasswordReset() {
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

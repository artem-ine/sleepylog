import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Dashboard from "../../components/Dashboard";
import { useAuth } from "../../utils/useAuth";
import GuestView from "../../components/Guest View/GuestView";

function Home() {
  const { auth } = useAuth();

  return (
    <>
      {" "}
      <Navbar />
      <main className="bg-white dark:bg-black text-black dark:text-white">
        {!auth.isAuthenticated ? (
          <div>
            <GuestView />
          </div>
        ) : (
          <div>
            <Dashboard />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Home;

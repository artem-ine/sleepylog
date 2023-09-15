import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Dashboard from "../../components/Dashboard";
import { useAuth } from "../../utils/useAuth";

function Home() {
  const { auth } = useAuth();

  return (
    <>
      {" "}
      <Navbar />
      <main className="bg-white dark:bg-black text-black dark:text-white">
        {auth.isAuthenticated && (
          <div>
            <Dashboard />
          </div>
        )}
        <h1>not logged in</h1>
        <div id="outlet">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;

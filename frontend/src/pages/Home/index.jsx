import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Dashboard from "../../components/Dashboard";
import { useAuth } from "../../utils/useAuth";

function Home() {
  const { auth } = useAuth();

  return (
    <>
      <Navbar />
      {auth.isAuthenticated && (
        <div>
          <Dashboard />
        </div>
      )}
      <h1>not logged in</h1>
      <div id="outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Home;

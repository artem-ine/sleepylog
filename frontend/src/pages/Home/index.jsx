import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div id="outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Home;

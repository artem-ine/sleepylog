import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <main className="bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      {/* <Home /> */}
      <SignupForm />
      <Footer />
    </main>
  );
}

export default App;

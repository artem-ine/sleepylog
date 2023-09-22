import { useRouteError } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar />
      <main
        id="error-page"
        className="bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center"
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;

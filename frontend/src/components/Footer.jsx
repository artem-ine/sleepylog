import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      id="footer"
      className="bottom-0 w-full bg-primary dark:bg-secondary text-dark dark:text-white"
    >
      <div className="w-full mx-auto max-w-screen-xl px-3 p-4 flex justify-around">
        <div className="text-sm text-right">
          <Link to="/" className="px-3">Home</Link>
          <Link to="/about" className="px-3">About</Link>
          <Link to="/terms-and-conditions" className="px-3">Terms and Conditions</Link>
        </div>
        <span className="text-sm sm:text-center">
          <p>
            kat & zeke // doodles by hummy
          </p>
          <p>
          All Rights Reserved. © 2023
          </p>
        </span>
      </div>
    </footer>
  );
}

export default Footer;

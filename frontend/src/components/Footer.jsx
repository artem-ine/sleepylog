import { Link } from "react-router-dom";
import LightToggle from "./LightToggle";

function Footer() {
  return (
    <footer
      id="footer"
      className="bottom-0 w-full bg-primary dark:bg-secondary text-dark dark:text-white"
    >
      <div className="w-full mx-auto max-w-screen-xl px-3 p-4 flex justify-around gap-3">
        <div className="text-sm text-right flex">
          <Link to="/" className="px-3 hover:underline">
            Home
          </Link>
          <Link to="/about" className="px-3 hover:underline">
            About
          </Link>
          <Link to="/terms-and-conditions" className="px-3 hover:underline">
            Terms and Conditions
          </Link>
        </div>
        <span className="text-sm sm:text-center">
          <p>kat & zeke // doodles by hummy</p>
          <p>All Rights Reserved. © 2023</p>
        </span>
        <LightToggle />
      </div>
    </footer>
  );
}

export default Footer;

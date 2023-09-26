import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      id="footer"
      className="bottom-0 w-full bg-primary dark:bg-secondary text-dark dark:text-white"
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-around">
        <span className="text-sm sm:text-center">
          <p>
            kat & zeke // doodles by hummy
          </p>
          <p>
          All Rights Reserved. © 2023
          </p>
        </span>
        <div className="">
          <Link to="/" className="text-sm text-right px-3">Home</Link>
          <Link to="/about" className="text-sm text-right">About</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

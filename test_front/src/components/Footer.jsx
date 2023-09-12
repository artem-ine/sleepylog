import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      id="footer"
      className="fixed bottom-0 w-full bg-white dark:bg-gray-800"
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <a href="https://github.com/artem-ine/" className="flex items-center">
            artem-ine
          </a>
          All Rights Reserved. © 2023
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              ###
            </Link>
          </li>
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              ###
            </Link>
          </li>
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              ###
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

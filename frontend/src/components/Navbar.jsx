import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../utils/useAuth";
import LogInModal from "./Login Modal";
import SignupModal from "./Signup Modal";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const { auth, handleLogout } = useAuth();

  const toggleMenu = () => {
    setNavbar(!navbar);
  };

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false); // Separate state for the Login modal
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false); // Separate state for the Sign Up modal

  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };

  const openSignupModal = () => {
    setSignupModalIsOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalIsOpen(false);
  };

  return (
    <div>
      <nav className="w-full bg-purple-500 shadow bg-primary dark:bg-secondary text-black dark:text-white">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <h2 className="text-3xl font-logo text-black dark:text-white">
                  SLEEPYLOG
                </h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-black dark:text-white rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={toggleMenu}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black dark:text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black dark:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {/* ... */}
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
                {!auth.isAuthenticated ? (
                  <>
                    <button onClick={openLoginModal}>Login</button>
                    <button onClick={openSignupModal}>Sign Up</button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-secondary dark:bg-primary text-white dark:text-black border border-black font-bold text-sm py-2 px-4 rounded-xl"
                  >
                    Logout
                  </button>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <LogInModal isOpen={loginModalIsOpen} onRequestClose={closeLoginModal} />
      <SignupModal
        isOpen={signupModalIsOpen}
        onRequestClose={closeSignupModal}
      />
    </div>
  );
}

export default Navbar;

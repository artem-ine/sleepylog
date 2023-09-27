import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../utils/useAuth";
import LogInModal from "./Login Modal";
import SignupModal from "./Signup Modal";
import LoginForm from "./Login Modal/LoginForm";
import SignupForm from "./Signup Modal/SignupForm";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const { auth, handleLogout } = useAuth();

  const toggleMenu = () => {
    setNavbar(!navbar);
  };

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

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
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="10" y1="5" x2="10" y2="15" />
                      <polyline points="5 10 10 15 15 10" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black dark:text-white"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="10" y1="5" x2="10" y2="15" />
                      <polyline points="5 10 10 15 15 10" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-2 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="flex items-center justify-center gap-6 md:flex md:space-x-6 md:space-y-0">
                {!auth.isAuthenticated ? (
                  <>
                    <button
                      className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl"
                      onClick={openSignupModal}
                    >
                      Sign Up
                    </button>
                    <button
                      className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl"
                      onClick={openLoginModal}
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-2 px-4 rounded-xl"
                  >
                    Logout
                  </button>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <LogInModal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        openLoginModal={closeLoginModal}
      >
        <LoginForm onLoginSuccess={closeLoginModal} />
      </LogInModal>
      <SignupModal
        isOpen={signupModalIsOpen}
        onRequestClose={closeSignupModal}
        openSignupModal={closeSignupModal}
      >
        <SignupForm onSignupSuccess={closeSignupModal} />
      </SignupModal>
    </div>
  );
}

export default Navbar;

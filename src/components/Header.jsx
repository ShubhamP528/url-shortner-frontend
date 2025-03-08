import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { useState } from "react";

const Header = () => {
  const { userToken, setUserToken } = useMyContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("auth_access_token");
    setUserToken("");
    navigate("/");
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-lg fixed w-full top-0 left-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide">
            <Link to="/">URL Shortener</Link>
          </h1>

          {/* Hamburger Icon (Mobile) */}
          <button
            className="sm:hidden text-white focus:outline-none z-30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Navigation Menu */}
          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } sm:flex flex-col sm:flex-row absolute sm:relative top-full sm:top-auto left-0 w-full sm:w-auto bg-blue-600 sm:bg-transparent z-20`}
          >
            <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center sm:items-center p-4 sm:p-0">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {userToken && (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-white hover:text-gray-200 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/createUrl"
                      className="text-white hover:text-gray-200 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create URL
                    </Link>
                  </li>
                  <li
                    className="text-white hover:text-gray-200 cursor-pointer transition-colors duration-300"
                    onClick={() => {
                      logoutHandler();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </li>
                </>
              )}
              {!userToken && (
                <li>
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </header>
      {/* Spacer div to prevent header overlap */}
      <div className="h-16"></div> {/* Height of the fixed header */}
    </>
  );
};

export default Header;

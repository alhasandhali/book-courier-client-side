import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logOut } = useAuth();

  const linkClass =
    "text-black border-b-2 border-transparent hover:border-accent-gold hover:text-accent-gold transition-all duration-300 ease-in-out";
  const mobileLinkClass =
    "block py-2 text-black border-b-2 border-transparent hover:border-accent-gold hover:text-accent-gold transition-all duration-300 ease-in-out";

  return (
    <header className="w-full bg-paper-bg shadow-md py-5 sticky top-0 z-50">
      <div className="w-10/12 mx-auto">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between"
        >
          {/* Left Side */}
          <Link to="/" className="flex items-center space-x-1">
            <img src={logo} alt="BookCourier-Logo" className="h-8 w-8" />
            <span className="font-serif text-[1.4rem] text-accent-gold font-bold">
              BookCourier
            </span>
          </Link>

          {/* Middle Part */}
          <div className="hidden lg:flex" data-purpose="navigation-links">
            <ul className="flex items-center space-x-6">
              <li>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/books" className={linkClass}>
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={linkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={linkClass}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center md:space-x-4">
            {/* Search Input */}
            <div className="group relative hidden sm:block">
              <input
                type="text"
                placeholder="Search books..."
                className="w-40 md:w-56 py-1.5 pl-4 pr-10 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-accent-gold focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 border border-transparent focus:border-accent-gold"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400 group-focus-within:text-accent-gold transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
            {/* Theme Toggle Button */}
            <div className="flex items-center justify-end">
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  className="theme-controller hidden"
                  onChange={handleToggle}
                  checked={theme === "dark"}
                />
                <svg
                  className="swap-off h-5 w-5 text-gray-700 hover:text-black fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-on h-5 w-5 text-gray-700 hover:text-black fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                </svg>
              </label>
            </div>

            {/* User Profile */}
            {user ? (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-accent-gold transition-all"
                >
                  <div className="w-10 rounded-full border-2 border-gray-300">
                    <img
                      alt="User Profile"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-xl w-56 border border-gray-100"
                >
                  <li className="px-3 py-2 border-b border-gray-100 mb-2">
                    <div className="flex items-center gap-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-accent-gold text-white flex items-center justify-center font-bold">
                        {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text-main text-sm">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-text-muted truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                      <i className="fas fa-th-large w-4 text-center text-accent-gold"></i>
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full"
                    >
                      <i className="fas fa-sign-out-alt w-4 text-center"></i>
                      <span className="font-medium">Log out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black font-medium"
                >
                  Login
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-black font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              aria-label="Open mobile menu"
              className="text-gray-700 hover:text-black focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-2 mt-4">
              <li>
                <NavLink to="/" className={mobileLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/books" className={mobileLinkClass}>
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={mobileLinkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={mobileLinkClass}>
                  Contact
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/dashboard" className={mobileLinkClass}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="block w-full text-left py-2 text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out border-b-2 border-transparent"
                    >
                      Log out
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to="/login"
                    className="block py-2 text-black hover:underline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 text-black hover:underline"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

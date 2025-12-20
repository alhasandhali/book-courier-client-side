import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

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
            <form onSubmit={handleSearch} className="group relative hidden sm:block">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 md:w-56 py-1.5 pl-4 pr-10 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-accent-gold focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 border border-transparent focus:border-accent-gold"
              />
              <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
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
              </button>
            </form>
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
              <div className="dropdown dropdown-end z-50 group">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-accent-gold transition-all duration-300"
                >
                  <div className="w-10 rounded-full border-2 border-gray-200 group-hover:border-accent-gold transition-colors">
                    <img
                      alt="User Profile"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      className="object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-4 z-[1] p-0 shadow-2xl bg-white rounded-2xl w-72 border border-gray-100 overflow-hidden transform transition-all duration-300 ease-in-out origin-top-right"
                >
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 text-white">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="avatar placeholder">
                        <div className="bg-accent-gold text-white rounded-full w-12 border-2 border-white/20">
                          <span className="text-xl font-bold">
                            {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-lg truncate leading-tight">
                          {user?.displayName || "User"}
                        </h3>
                        <p className="text-white/60 text-xs truncate font-medium">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 space-y-1">
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => document.activeElement.blur()}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-accent-gold font-medium rounded-xl transition-all group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-accent-gold/10 flex items-center justify-center text-gray-500 group-hover:text-accent-gold transition-colors">
                          <i className="fas fa-th-large text-sm"></i>
                        </span>
                        Dashboard
                      </Link>
                    </li>
                    {/* Add more links here if needed, e.g., Profile, Settings */}
                    <div className="divider my-1 opacity-50"></div>
                    <li>
                      <button
                        onClick={() => {
                          logOut();
                          document.activeElement.blur();
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500 hover:text-red-600 font-medium rounded-xl transition-all group w-full text-left"
                      >
                        <span className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center text-red-400 group-hover:text-red-500 transition-colors">
                          <i className="fas fa-sign-out-alt text-sm"></i>
                        </span>
                        Log out
                      </button>
                    </li>
                  </div>
                </ul>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full font-bold text-gray-700 hover:bg-gray-100 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-full bg-black text-white font-bold hover:bg-accent-gold hover:text-black hover:shadow-lg hover:shadow-accent-gold/30 transition-all duration-300"
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

        {/* Mobile Sidebar/Drawer Menu */}
        <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${mobileMenuOpen ? "visible" : "invisible"}`}>
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-7 w-7" />
                <span className="font-serif text-xl text-accent-gold font-bold">BookCourier</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-times text-lg"></i>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-8 relative lg:hidden">
                <input
                  type="text"
                  placeholder="Search your next favorite book..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-5 pr-12 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-gold">
                  <i className="fa-solid fa-search"></i>
                </button>
              </form>

              <ul className="space-y-2">
                {[
                  { name: "Home", path: "/", icon: "fa-house" },
                  { name: "Books", path: "/books", icon: "fa-book" },
                  { name: "About", path: "/about", icon: "fa-circle-info" },
                  { name: "Contact", path: "/contact", icon: "fa-envelope" },
                ].map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all ${isActive ? "bg-accent-gold/10 text-accent-gold" : "text-gray-600 hover:bg-gray-50"}`
                      }
                    >
                      <i className={`fa-solid ${item.icon} w-5 text-center text-sm`}></i>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="my-8 border-t border-gray-100 pt-8">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-4 ml-4">Account</p>
                {user ? (
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      >
                        <i className="fa-solid fa-th-large w-5 text-center text-sm"></i>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => { logOut(); setMobileMenuOpen(false); }}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all w-full text-left"
                      >
                        <i className="fa-solid fa-sign-out-alt w-5 text-center text-sm"></i>
                        Log out
                      </button>
                    </li>
                  </ul>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-all"
                    >
                      Join
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="p-8 bg-gray-50 text-center">
              <p className="text-xs text-gray-400 font-medium whitespace-nowrap">
                &copy; {new Date().getFullYear()} BookCourier. App Version 2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

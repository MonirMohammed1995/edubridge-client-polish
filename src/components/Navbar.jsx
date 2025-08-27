import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogInIcon, LogOut, Moon, Sun } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const auth = getAuth(app);

const Navbar = () => {
  const { user, role } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Welcome toast
  useEffect(() => {
    if (user) {
      toast.dismiss();
      toast.success(`Welcome back, ${user.displayName || "User"}!`);
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => toast.error(`Logout failed: ${error.message}`));
  };

  // NavLink class
  const navItemClass = ({ isActive }) =>
    `block px-5 py-2 rounded-xl font-medium transition-colors duration-300 ${
      isActive
        ? "text-indigo-700 bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-200 shadow-sm"
        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-800"
    }`;

  // Role-based nav links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/find-tutors", label: "Find Tutors" },
  ];

  if (user) {
    if (role === "admin") {
      navLinks.push({ path: "/dashboard/admin", label: "Admin Dashboard" });
    }
    if (role === "user") {
      navLinks.push({ path: "/dashboard/user", label: "User Dashboard" });
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 backdrop-blur-lg ${
        isScrolled
          ? "shadow-lg bg-white/90 dark:bg-gray-900/90"
          : "bg-white/80 dark:bg-gray-900/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight"
        >
          EduBridge
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={navItemClass}
              end={path === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions (theme + auth) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200 hover:ring-2 hover:ring-indigo-500 transition shadow-sm"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 font-semibold shadow-md transition"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 font-semibold shadow-md transition"
              >
                <LogInIcon size={18} /> Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 font-semibold shadow-md transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-indigo-600 dark:text-indigo-400"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-xl px-6 py-6 space-y-6 border-t border-indigo-200 dark:border-indigo-700 transform transition-all duration-300 ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-4">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={navItemClass}
              onClick={() => setMenuOpen(false)}
              end={path === "/"}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between pt-5 border-t border-indigo-200 dark:border-indigo-700">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2 font-semibold shadow-md transition"
            >
              <LogOut size={18} /> Log Out
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 font-semibold shadow-md transition"
              >
                <LogInIcon size={18} /> Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 font-semibold shadow-md transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

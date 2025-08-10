import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogInIcon, LogOut, Moon, Sun } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const auth = getAuth(app);

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Welcome toast
  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => toast.success('Logged out successfully'))
      .catch((error) => toast.error(`Logout failed: ${error.message}`));
  };

  // Dynamic NavLink styles for professional clarity
  const navItemClass = ({ isActive }) =>
    `block px-5 py-2 rounded-md font-semibold transition-colors duration-300 ${
      isActive
        ? 'text-indigo-700 bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-200 shadow-md'
        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-800'
    }`;

  // Core nav links, with role-based Dashboard link appended dynamically
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/find-tutors', label: 'Find Tutors' },
    { path: '/add-tutor', label: 'Add Tutor' },
    { path: '/my-tutors', label: 'My Tutors' },
    { path: '/bookings', label: 'My Booked' },
  ];

  if (user) {
    let dashboardPath = '/dashboard';
    if (user.role === 'admin') dashboardPath = '/dashboard/admin';
    else if (user.role === 'moderator') dashboardPath = '/dashboard/moderator';
    else dashboardPath = '/dashboard/user';
    navLinks.push({ path: dashboardPath, label: 'Dashboard' });
  }

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 backdrop-blur bg-white/90 dark:bg-gray-900/90 transition-shadow duration-300 border-b border-gray-200 dark:border-gray-700 ${
        isScrolled ? 'shadow-lg' : 'shadow-none'
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          aria-label="EduBridge Home"
        >
          EduBridge
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex" role="menubar">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={navItemClass}
              end={path === '/'}
              onClick={() => setMenuOpen(false)}
              role="menuitem"
              tabIndex={0}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200 hover:ring-2 hover:ring-indigo-500 transition shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center space-x-5">
              <div className="relative group cursor-pointer" tabIndex={0} aria-label={`User profile: ${user.displayName || 'User'}`}>
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover transition-transform group-hover:scale-110"
                />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-indigo-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none select-none">
                  {user.displayName || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-red-500"
                aria-label="Log out"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-green-500"
                aria-label="Login"
              >
                <LogInIcon size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-2 font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-blue-500"
                aria-label="Register"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-xl px-6 py-6 space-y-6 border-t border-indigo-300 dark:border-indigo-700 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col space-y-4" role="menu" aria-label="Mobile navigation menu">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={navItemClass}
              onClick={() => setMenuOpen(false)}
              end={path === '/'}
              role="menuitem"
              tabIndex={0}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-between pt-5 border-t border-indigo-300 dark:border-indigo-700">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-200 hover:ring-2 hover:ring-indigo-500 transition shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <>
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold select-none">
                {user.displayName || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-red-500"
                aria-label="Log out"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </>
          ) : (
            <div className="flex space-x-6">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-green-500"
                aria-label="Login"
              >
                <LogInIcon size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-2 font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-blue-500"
                aria-label="Register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

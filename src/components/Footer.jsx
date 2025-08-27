import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkClass = ({ isActive }) =>
    `block text-sm transition-colors duration-300 
     hover:text-indigo-600 dark:hover:text-indigo-300 
     focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded 
     ${
       isActive
         ? "text-indigo-700 dark:text-indigo-200 font-semibold"
         : "text-gray-700 dark:text-gray-300"
     }`;

  return (
    <footer
      className="bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 
                 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 
                 border-t border-indigo-200 dark:border-gray-700 
                 shadow-inner select-none"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 
                      py-16 grid grid-cols-1 md:grid-cols-4 
                      gap-12 md:gap-20 text-gray-700 dark:text-gray-200">
        
        {/* Logo & Description */}
        <div className="space-y-5">
          <NavLink
            to="/"
            className="text-3xl font-extrabold tracking-wide 
                       text-indigo-600 dark:text-indigo-400 
                       focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 rounded"
            aria-label="EduBridge Home"
          >
            EduBridge
          </NavLink>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-xs">
            Your trusted platform to connect with top tutors and grow your learning journey.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links">
          <h3 className="mb-5 text-lg font-semibold 
                         border-b-2 border-indigo-500 
                         text-gray-900 dark:text-gray-100 
                         w-max pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Home" },
              { to: "/find-tutors", label: "Find Tutors" },
            ].map(({ to, label }) => (
              <li key={label}>
                <NavLink to={to} className={linkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info */}
        <section aria-label="Contact Information">
          <h3 className="mb-5 text-lg font-semibold 
                         border-b-2 border-indigo-500 
                         text-gray-900 dark:text-gray-100 
                         w-max pb-1">
            Contact Us
          </h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-indigo-600 dark:text-indigo-400" />
              <a
                href="mailto:support@edubridge.com"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded text-gray-700 dark:text-gray-300"
              >
                support@edubridge.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-indigo-600 dark:text-indigo-400" />
              <a
                href="tel:+8801645323387"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded text-gray-700 dark:text-gray-300"
              >
                +880 1645-323387
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-indigo-600 dark:text-indigo-400" />
              <address className="not-italic text-gray-700 dark:text-gray-300">
                Sylhet, Bangladesh
              </address>
            </li>
          </ul>
        </section>

        {/* Social Media */}
        <section aria-label="Follow us on social media">
          <h3 className="mb-5 text-lg font-semibold 
                         border-b-2 border-indigo-500 
                         text-gray-900 dark:text-gray-100 
                         w-max pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-6 mt-3">
            {[
              { href: "https://www.facebook.com/", label: "Facebook", icon: <Facebook size={22} /> },
              { href: "https://x.com/?lang=en", label: "Twitter", icon: <Twitter size={22} /> },
              { href: "https://www.linkedin.com/feed/", label: "LinkedIn", icon: <Linkedin size={22} /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full bg-indigo-100 dark:bg-gray-800 
                           text-indigo-600 dark:text-indigo-300 
                           hover:bg-indigo-600 hover:text-white 
                           dark:hover:bg-indigo-400 dark:hover:text-gray-900 
                           shadow-md transition focus:outline-none focus:ring-2 
                           focus:ring-indigo-400"
              >
                {icon}
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Copyright */}
      <div className="border-t border-indigo-200 dark:border-gray-700 
                      py-6 text-center text-xs sm:text-sm 
                      text-gray-500 dark:text-gray-400">
        &copy; {currentYear} EduBridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

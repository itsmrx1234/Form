import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="logo"
              className="h-10 w-10 animate-spin-slow"
            />
            <span className="text-xl font-bold text-amber-400">Reactify</span>
          </div>
          <p className="text-sm text-gray-400">
            A modern frontend project with beautiful design and usability.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <NavLink
            to="/"
            className="hover:text-amber-400 transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className="hover:text-amber-400 transition"
          >
            Login
          </NavLink>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Reactify. All rights reserved.
      </div>

      {/* Animation */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 6s linear infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;

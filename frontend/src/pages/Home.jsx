import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-500 via-purple-500 to-pink-500 px-6">
      <div className="max-w-4xl mx-auto text-center text-white space-y-6">
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React Logo"
            className="h-24 w-24 animate-spin-slow"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to <span className="text-amber-300">Idkbroo</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
          Abracadabra Gilli Gilli CHoooo
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-amber-300 transition"
        >
          Get Started
          <FaArrowRight />
        </Link>
      </div>

      {/* Animation Style */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Home;

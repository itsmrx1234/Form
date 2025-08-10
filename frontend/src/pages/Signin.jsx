import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { refreshAuth, loggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/user/signin', data, { withCredentials: true });
      setErrorMessage('');
      await refreshAuth();
      navigate('/');
    } catch (err) {
      console.error('Sign up error:', err);
      setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 bg-white/90 shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md flex flex-col gap-6 animate-fade-in-up"
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828469.png"
            alt="Logo"
            className="h-16 w-16 animate-pulse"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-amber-500">
          Create Your Account
        </h2>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            id="username"
            placeholder="Choose a username"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-200"
            {...register('username', { required: true, minLength: 3 })}
          />
          {errors.username && (
            <span className="text-sm text-red-600">
              Username is required (min 3 characters)
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-200"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-600">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-200"
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="text-sm text-red-600">
              Password must be at least 6 characters
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded-md transition duration-300 shadow-md"
        >
          Sign Up
        </button>

        {/* Login link */}
        <div
          className="text-center text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Already have an account? Log In
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signin;

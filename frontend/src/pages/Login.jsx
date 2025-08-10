import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
      await axios.post('http://localhost:3000/user/login', data, { withCredentials: true });
      setErrorMessage('');
      await refreshAuth();
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
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
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="Logo"
            className="h-16 w-16 animate-pulse"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-amber-500">
          Welcome Back
        </h2>

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            id="username"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-200"
            {...register('username', { required: true, minLength: 3 })}
          />
          {errors.username && (
            <span className="text-sm text-red-600">
              Username is required (min 3 characters)
            </span>
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
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-200"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-sm text-red-600">Password is required</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded-md transition duration-300 shadow-md"
        >
          Submit
        </button>

        {/* Sign up link */}
        <div
          className="text-center text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate('/signin')}
        >
          Don't have an account? Create One
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

export default Login;

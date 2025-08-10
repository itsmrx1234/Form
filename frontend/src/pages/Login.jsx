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
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('');
  const { setUsername, setLoggedIn, loggedIn } = useContext(AuthContext);

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3000/user/login', data,{
        withCredentials:true
      })
      .then((res) => {
        console.log('Login response:', res);
        setLoggedIn(true);
        setUsername(data.username); // Or res.data.username if your API returns it
        setErrorMessage('');
      })
      .catch((err) => {
        console.error('Login error:', err);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      });
  };
  useEffect(()=>{
    if(loggedIn)
      navigate('/')
  }, [loggedIn, setLoggedIn])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

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

        <h2 className="text-3xl font-extrabold text-center text-amber-500 animate-fade-in-up">
          Welcome Back
        </h2>

        {/* Username Field */}
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

        {/* Password Field */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded-md transition duration-300 shadow-md"
        >
          Submit
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">
            {errorMessage}
          </div>
        )}
      </form>

      {/* Tailwind Custom Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;

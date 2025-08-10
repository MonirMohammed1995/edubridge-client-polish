import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import lottieLogin from '../assets/lotties/login.json';
import app from '../firebase/firebase.config';
import { Helmet } from 'react-helmet';
import Lottie from 'lottie-react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Google login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <Helmet>
        <title>Login | EduBridge</title>
      </Helmet>

      {/* Animation Section */}
      <div className="w-full max-w-lg md:max-w-md mb-12 md:mb-0 md:mr-14">
        <Lottie animationData={lottieLogin} loop className="w-full h-auto select-none" />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100 tracking-tight">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="you@example.com"
              className={`w-full px-5 py-3 rounded-lg border
                focus:outline-none focus:ring-3 focus:ring-lime-500
                transition duration-300 text-gray-900 dark:text-gray-100
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 select-none" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters required' },
                })}
                placeholder="••••••••"
                className={`w-full px-5 py-3 rounded-lg border
                  focus:outline-none focus:ring-3 focus:ring-lime-500
                  transition duration-300 text-gray-900 dark:text-gray-100
                  ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 select-none" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-600 hover:bg-lime-700 active:bg-lime-800
              text-white font-semibold rounded-full shadow-lg
              focus:outline-none focus:ring-4 focus:ring-lime-500 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8 gap-3 text-gray-400 dark:text-gray-500">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="text-sm select-none">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center gap-4 py-3 border border-lime-600
            rounded-full font-semibold text-lime-700 hover:bg-lime-600 hover:text-white shadow-md
            focus:outline-none focus:ring-4 focus:ring-lime-500 transition duration-300"
          aria-label="Sign in with Google"
        >
          <FaGoogle size={22} />
          Sign in with Google
        </button>

        {/* Register Link */}
        <p className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm select-none">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-lime-600 dark:text-lime-400 font-semibold hover:underline focus:outline-none"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

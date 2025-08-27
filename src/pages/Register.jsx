import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import lottieRegister from '../assets/lotties/register.json';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Replace this with your backend API base URL
const VITE_API_URL = "http://localhost:3000"; // Or your deployed backend

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    const passwordValid =
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      password.length >= 6;

    if (!passwordValid) {
      toast.error("Password must contain uppercase, lowercase and be at least 6 characters.");
      return;
    }

    try {
      // 1️⃣ Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      // 2️⃣ Store user in MongoDB
      const user = { name, email, role: "user" };
      const res = await fetch(`${VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const dataRes = await res.json();

      if (dataRes.success) {
        toast.success("Registration successful!");
        reset();
        navigate("/");
      } else {
        toast.error(dataRes.message || "Failed to save user in database");
      }
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 1️⃣ Save Google user in MongoDB
      const userData = { name: user.displayName, email: user.email, role: "user" };
      await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      toast.success(`Welcome, ${user.displayName}`);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-14 gap-14">
      <Helmet>
        <title>Register | EduBridge</title>
      </Helmet>

      {/* Animation Side */}
      <div className="w-full max-w-lg md:max-w-md select-none">
        <Lottie animationData={lottieRegister} loop className="w-full h-auto" />
      </div>

      {/* Form Side */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-12">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100 tracking-tight">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className={`w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600 select-none">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={`w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600 select-none">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">
              Photo URL
            </label>
            <input
              id="photo"
              type="url"
              {...register("photo", { required: "Photo URL is required" })}
              placeholder="https://your-photo-url.com"
              className={`w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.photo ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
              aria-invalid={errors.photo ? "true" : "false"}
            />
            {errors.photo && <p className="mt-1 text-sm text-red-600 select-none">{errors.photo.message}</p>}
          </div>

          {/* Password with toggle */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
                className={`w-full pr-12 px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600 select-none">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-lime-500 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8 gap-3 text-gray-400 dark:text-gray-500 select-none">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="text-sm">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex justify-center items-center gap-4 py-3 border border-lime-600 rounded-full font-semibold text-lime-700 hover:bg-lime-600 hover:text-white shadow-md focus:outline-none focus:ring-4 focus:ring-lime-500 transition duration-300"
          aria-label="Continue with Google"
        >
          <FaGoogle size={22} />
          Continue with Google
        </button>

        {/* Already have account */}
        <p className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm select-none">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-lime-600 dark:text-lime-400 font-semibold hover:underline focus:outline-none"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

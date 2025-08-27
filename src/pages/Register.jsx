import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import lottieRegister from '../assets/lotties/register.json';
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const passwordValid = /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;
    if (!passwordValid) {
      toast.error("Password must contain uppercase, lowercase and at least 6 characters.");
      return;
    }

    try {
      // Firebase registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: photo });

      // Save user in MongoDB
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role: "user" }),
      });
      const dataRes = await res.json();

      if (dataRes.success) {
        toast.success("Registration successful!");
        reset();
        navigate("/");
      } else {
        toast.error(dataRes.message || "Failed to save user");
      }
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.displayName, email: user.email, role: "user" }),
      });
      toast.success(`Welcome, ${user.displayName}`);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-14 gap-14">
      <Helmet>
        <title>Register | EduBridge</title>
      </Helmet>

      {/* Lottie Animation */}
      <div className="w-full max-w-lg md:max-w-md select-none">
        <Lottie animationData={lottieRegister} loop className="w-full h-auto" />
      </div>

      {/* Form */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-12 relative overflow-hidden">
        {/* Glow/Gradient Accent */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-tr from-lime-400/40 via-indigo-400/30 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100 tracking-tight">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">Name</label>
            <input
              type="text"
              {...formRegister("name", { required: "Name is required" })}
              placeholder="Your full name"
              className={`w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600 select-none">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">Email</label>
            <input
              type="email"
              {...formRegister("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={`w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600 select-none">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">Photo URL</label>
            <input
              type="url"
              {...formRegister("photo", { required: "Photo URL is required" })}
              placeholder="https://your-photo-url.com"
              className={`w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.photo ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.photo && <p className="mt-1 text-sm text-red-600 select-none">{errors.photo.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...formRegister("password", { required: "Password is required" })}
                placeholder="••••••••"
                className={`w-full pr-12 px-5 py-3 rounded-lg border focus:outline-none focus:ring-3 focus:ring-lime-500 transition duration-300 text-gray-900 dark:text-gray-100 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600 select-none">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button className="w-full py-3 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-lime-500 transition duration-300">
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
        >
          <FaGoogle size={22} />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm select-none">
          Already have an account?{" "}
          <Link className="text-lime-600 dark:text-lime-400 font-semibold hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

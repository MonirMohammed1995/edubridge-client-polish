import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaLanguage } from "react-icons/fa";
import {
  GiTalk,
  GiEgyptianProfile,
  GiIndiaGate,
} from "react-icons/gi";
import { SiGoogletranslate } from "react-icons/si";
import { MdTranslate, MdOutlineLanguage } from "react-icons/md";
import { TbLanguageHiragana, TbWorld } from "react-icons/tb";
import axios from "axios";

// Icon Map with consistent size and accessible roles
const iconMap = {
  FaLanguage: <FaLanguage className="text-5xl text-blue-600" aria-hidden="true" />,
  GiTalk: <GiTalk className="text-5xl text-yellow-500" aria-hidden="true" />,
  SiGoogletranslate: <SiGoogletranslate className="text-5xl text-pink-500" aria-hidden="true" />,
  FaGlobe: <FaLanguage className="text-5xl text-gray-600" aria-hidden="true" />, // Fallback icon
  TbLanguageHiragana: <TbLanguageHiragana className="text-5xl text-red-500" aria-hidden="true" />,
  GiEgyptianProfile: <GiEgyptianProfile className="text-5xl text-green-600" aria-hidden="true" />,
  GiIndiaGate: <GiIndiaGate className="text-5xl text-orange-600" aria-hidden="true" />,
  MdOutlineLanguage: <MdOutlineLanguage className="text-5xl text-green-500" aria-hidden="true" />,
  MdTranslate: <MdTranslate className="text-5xl text-purple-600" aria-hidden="true" />,
  TbWorld: <TbWorld className="text-5xl text-sky-500" aria-hidden="true" />,
};

const LanguageCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-4 text-center text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
          Explore <span className="text-blue-700 dark:text-blue-400">Language</span> Categories
        </h2>
        <p className="mb-16 max-w-3xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300">
          Find the perfect tutor by exploring languages you’re passionate about.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {categories.map((cat, idx) => (
            <button
              key={cat._id || idx}
              onClick={() => navigate(`/find-tutors/${cat.path}`)}
              className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.03] transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 cursor-pointer"
              aria-label={`Explore ${cat.title} tutors`}
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="flex-shrink-0">
                  {iconMap[cat.icon] || <FaLanguage className="text-5xl text-blue-600" aria-hidden="true" />}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 transition-colors">
                  {cat.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm font-medium">
                <span className="select-none">
                  Discover {cat.title} tutors
                </span>
                <FaArrowRight
                  className="text-blue-600 group-hover:translate-x-2 transition-transform duration-300"
                  aria-hidden="true"
                />
              </div>

              {/* Decorative border effect on focus */}
              <span className="absolute inset-0 rounded-3xl border-2 border-transparent group-focus-visible:border-blue-500 pointer-events-none"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageCategory;

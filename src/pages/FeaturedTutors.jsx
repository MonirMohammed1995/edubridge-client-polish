import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const tutors = [
  {
    id: 1,
    name: "Sophia Martinez",
    language: "Spanish",
    experience: "5 Years",
    rating: 4.9,
    students: 120,
    image: "https://i.postimg.cc/7YFKmBks/images.jpg",
  },
  {
    id: 2,
    name: "Arjun Patel",
    language: "Hindi",
    experience: "3 Years",
    rating: 4.8,
    students: 95,
    image: "https://i.postimg.cc/zv9F2f9b/266943-1.webp",
  },
  {
    id: 3,
    name: "Emily Johnson",
    language: "English",
    experience: "7 Years",
    rating: 5.0,
    students: 210,
    image: "https://i.postimg.cc/wTmVyhmh/Emily-Johnson-131.webp",
  },
];

const FeaturedTutors = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Tutors
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg md:text-xl">
            Learn from our top-rated tutors with proven track records
          </p>
        </motion.div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            >
              {/* Tutor Image */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Tutor Info */}
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tutor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Teaches {tutor.language} • {tutor.experience} Experience
                </p>

                {/* Rating & Students */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {tutor.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {tutor.students}+ Students
                  </span>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-5 py-2 px-4 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition-all duration-300">
                  Upcoming Session ...
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;

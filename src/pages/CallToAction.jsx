import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-indigo-900 py-20 overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl dark:bg-blue-700"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500 rounded-full opacity-20 blur-3xl dark:bg-indigo-800"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight text-white dark:text-gray-100"
        >
          Ready to Start Your Learning Journey?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-blue-100 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Join thousands of learners booking sessions with expert tutors every day. Don’t miss out on your growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-lg hover:bg-blue-50 transition-all duration-300">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

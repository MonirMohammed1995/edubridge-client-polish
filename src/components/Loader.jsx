import React from 'react';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-indigo-500 border-b-indigo-300 border-l-indigo-200 border-r-indigo-400 rounded-full animate-spin shadow-lg"></div>

      {/* Optional Loading Text */}
      <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium text-lg select-none">
        {message}
      </p>
    </div>
  );
};

export default Loader;

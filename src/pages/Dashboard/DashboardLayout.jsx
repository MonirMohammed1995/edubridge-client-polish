import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[2560px] mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide select-none text-white">
            Dashboard
          </h1>
          {/* Optional: User menu / notifications */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for future icons */}
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-white/50 transition">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-md flex-shrink-0">
          <div className="h-full overflow-y-auto py-6 px-4">
            <DashboardSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 bg-gray-50 dark:bg-gray-900 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 dark:scrollbar-thumb-indigo-600 dark:scrollbar-track-gray-800 transition-colors duration-300"
          tabIndex={0} // Keyboard accessible scroll
        >
          <Outlet />
        </main>
      </div>

      {/* Optional Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 px-6 text-center text-sm border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} EduBridge. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;

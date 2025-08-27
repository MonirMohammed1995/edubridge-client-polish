import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[2560px] mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none text-white">
            EduBridge Dashboard
          </h1>

          {/* User / Notifications */}
          <div className="flex items-center space-x-4">
            <button className="relative w-10 h-10 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center text-white font-semibold hover:bg-white/30 dark:hover:bg-white/20 transition-shadow shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
              U
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-md flex-shrink-0 transition-colors duration-300">
          <div className="h-full overflow-y-auto py-6 px-4">
            <DashboardSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 dark:scrollbar-thumb-indigo-600 dark:scrollbar-track-gray-800 transition-colors duration-300"
          tabIndex={0} // Keyboard accessible scroll
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 px-6 text-center text-sm border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        © {new Date().getFullYear()} EduBridge. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;

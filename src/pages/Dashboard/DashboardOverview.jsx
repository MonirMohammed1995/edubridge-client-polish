import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalTutors: 0,
    totalBookings: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/stats`);
        // Example response shape: { totalTutors, totalBookings, pendingReviews }
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Tutors',
      value: stats.totalTutors,
      color: 'text-blue-600',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      color: 'text-green-600',
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      color: 'text-yellow-600',
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
        Dashboard Overview
      </h2>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed mb-8">
        Welcome to your dashboard! Here you can see a quick summary of your activities, bookings, and tutors.
      </p>

      {error && (
        <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading
          ? Array(3).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))
          : statCards.map(({ title, value, color }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-default"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {title}
                </h3>
                <p className={`text-4xl font-extrabold ${color}`}>
                  {value}
                </p>
              </div>
            ))}
      </div>
    </section>
  );
};

export default DashboardOverview;

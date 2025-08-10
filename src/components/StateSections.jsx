import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  Users,
  Star,
  Languages,
  UserRound
} from 'lucide-react';

const iconMap = {
  totalTutors: <Users size={40} className="text-indigo-600" aria-hidden="true" />,
  totalReviews: <Star size={40} className="text-yellow-500" aria-hidden="true" />,
  languagesTaught: <Languages size={40} className="text-green-600" aria-hidden="true" />,
  registeredUsers: <UserRound size={40} className="text-pink-500" aria-hidden="true" />,
};

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  // Fetch stats from server on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/stats`);
        if (!res.ok) throw new Error(`Failed to fetch stats: ${res.status}`);
        const data = await res.json();

        // Map server response to stats array for UI
        setStats([
          { id: 1, title: 'Total Tutors', count: data.totalTutors, icon: iconMap.totalTutors },
          { id: 2, title: 'Total Reviews', count: data.totalBookings, icon: iconMap.totalReviews }, // Adjusted to totalBookings assuming reviews == bookings
          { id: 3, title: 'Languages Taught', count: data.languagesTaught || 14, icon: iconMap.languagesTaught }, // fallback 14
          { id: 4, title: 'Registered Users', count: data.registeredUsers || 980, icon: iconMap.registeredUsers }, // fallback 980
        ]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24 px-6 sm:px-12 lg:px-20 transition-colors duration-500"
      aria-label="Platform statistics"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight select-none">
          Our Impact in Numbers
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto select-none">
          Trusted by a growing global community of learners and educators.
        </p>

        {error ? (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        ) : !stats ? (
          <p className="text-gray-500 font-medium text-center">Loading statistics...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map(({ id, icon, count, title }) => (
              <article
                key={id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg
                           hover:shadow-2xl transition-shadow duration-300 p-10 flex flex-col items-center justify-center"
                role="region"
                aria-labelledby={`stat-title-${id}`}
                tabIndex={0}
              >
                <div className="mb-6">
                  {icon}
                </div>
                <h3
                  id={`stat-title-${id}`}
                  className="text-5xl font-extrabold text-gray-900 dark:text-white leading-none select-text"
                >
                  {inView ? <CountUp end={count} duration={2.5} separator="," /> : '0'}
                </h3>
                <p className="mt-3 text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide select-none">
                  {title}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;

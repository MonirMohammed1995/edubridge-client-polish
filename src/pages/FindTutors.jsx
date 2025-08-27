import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState('');
  const { language } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tutors`)
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .catch((err) => console.error('Error fetching tutors:', err));
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    language
      ? tutor.language.toLowerCase() === language.toLowerCase()
      : tutor.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <Helmet>
        <title>{language ? `Tutors for ${language}` : 'Find Your Language Tutor'}</title>
      </Helmet>

      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-900 dark:text-indigo-300 mb-12 tracking-tight select-none leading-tight">
        {language ? `Tutors for ${language}` : 'Find Your Language Tutor'}
      </h2>

      {!language && (
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search by language (e.g. Spanish)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                       placeholder-gray-400 dark:placeholder-gray-500
                       shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition duration-200 text-base md:text-lg"
            aria-label="Search tutors by language"
          />
        </div>
      )}

      {filteredTutors.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
          <table className="min-w-full text-sm md:text-base table-fixed">
            <thead className="bg-indigo-700 text-white dark:bg-indigo-800 select-none">
              <tr>
                <th className="p-6 rounded-tl-xl">Tutor</th>
                <th className="p-6">Language</th>
                <th className="p-6">Price</th>
                <th className="p-6">Reviews</th>
                <th className="p-6">Description</th>
                <th className="p-6 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {filteredTutors.map((tutor, idx) => (
                <motion.tr
                  key={tutor._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className={`border-b border-gray-200 dark:border-gray-700 transition-colors
                    ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-indigo-50 dark:bg-gray-800'}
                    hover:bg-indigo-100 dark:hover:bg-gray-700 cursor-pointer`}
                >
                  <td className="flex items-center gap-5 p-6">
                    <img
                      src={tutor.image}
                      alt={tutor.tutorName}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <p className="font-semibold text-indigo-900 dark:text-indigo-300 text-base md:text-lg">{tutor.tutorName}</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 select-text">{tutor.tutorEmail}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs md:text-sm font-semibold select-none">
                      {tutor.language}
                    </span>
                  </td>
                  <td className="p-6 font-medium text-gray-800 dark:text-gray-200">${tutor.price.toFixed(2)}</td>
                  <td className="p-6 font-medium text-gray-800 dark:text-gray-200">{tutor.review || 0}</td>
                  <td className="p-6 text-gray-700 dark:text-gray-300 truncate max-w-[300px] md:max-w-[400px]" title={tutor.description}>
                    {tutor.description.length > 60 ? `${tutor.description.slice(0, 60)}...` : tutor.description}
                  </td>
                  <td className="p-6">
                    <Link
                      to={`/tutor/${tutor._id}`}
                      className="inline-block bg-indigo-700 dark:bg-indigo-600 hover:bg-indigo-800 dark:hover:bg-indigo-500
                                 text-white px-5 py-2 rounded-lg text-sm md:text-base font-semibold
                                 shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5"
                      aria-label={`View details of ${tutor.tutorName}`}
                    >
                      View
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      ) : (
        <div className="mt-24 text-center text-gray-600 dark:text-gray-400 select-none">
          <p className="text-xl md:text-2xl font-semibold mb-2">
            No tutors found for{' '}
            <span className="text-indigo-700 dark:text-indigo-300">{language || search || 'your search'}</span>
          </p>
          <p className="max-w-lg md:max-w-xl mx-auto text-base md:text-lg">
            Try adjusting your search or check back later for new tutors.
          </p>
        </div>
      )}
    </div>
  );
};

export default FindTutors;

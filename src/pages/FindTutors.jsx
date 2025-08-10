import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

      <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-12 tracking-tight select-none">
        {language ? `Tutors for ${language}` : 'Find Your Language Tutor'}
      </h2>

      {!language && (
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search by language (e.g. Spanish)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 rounded-lg border border-gray-300 shadow-sm
                       text-gray-800 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition duration-200"
            aria-label="Search tutors by language"
          />
        </div>
      )}

      {filteredTutors.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
          <table className="min-w-full text-sm text-left table-fixed">
            <thead className="bg-indigo-700 text-white select-none">
              <tr>
                <th className="p-6 rounded-tl-xl">Tutor</th>
                <th className="p-6">Language</th>
                <th className="p-6">Price</th>
                <th className="p-6">Reviews</th>
                <th className="p-6">Description</th>
                <th className="p-6 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTutors.map((tutor, idx) => (
                <tr
                  key={tutor._id}
                  className={`border-b border-gray-200 transition-colors
                    ${idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}
                    hover:bg-indigo-100 cursor-pointer`}
                >
                  <td className="flex items-center gap-5 p-6">
                    <img
                      src={tutor.image}
                      alt={tutor.tutorName}
                      className="w-14 h-14 rounded-full object-cover border border-gray-300"
                    />
                    <div>
                      <p className="font-semibold text-indigo-900">{tutor.tutorName}</p>
                      <p className="text-xs text-gray-600 select-text">{tutor.tutorEmail}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold select-none">
                      {tutor.language}
                    </span>
                  </td>
                  <td className="p-6 font-medium text-gray-800">${tutor.price.toFixed(2)}</td>
                  <td className="p-6 font-medium text-gray-800">{tutor.review || 0}</td>
                  <td className="p-6 text-gray-700 truncate max-w-[300px]" title={tutor.description}>
                    {tutor.description.length > 60
                      ? `${tutor.description.slice(0, 60)}...`
                      : tutor.description}
                  </td>
                  <td className="p-6">
                    <Link
                      to={`/tutor/${tutor._id}`}
                      className="inline-block bg-indigo-700 hover:bg-indigo-800
                                 text-white px-5 py-2 rounded-lg text-sm font-semibold
                                 shadow-md transition transform hover:-translate-y-0.5"
                      aria-label={`View details of ${tutor.tutorName}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-24 text-center text-gray-600 select-none">
          <p className="text-xl font-semibold mb-2">
            No tutors found for{' '}
            <span className="text-indigo-700">{language || search || 'your search'}</span>
          </p>
          <p className="max-w-lg mx-auto text-gray-400">
            Try adjusting your search or check back later for new tutors.
          </p>
        </div>
      )}
    </div>
  );
};

export default FindTutors;

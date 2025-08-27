import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import { FaEdit, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const MyTutorials = () => {
  const { user } = useContext(AuthContext);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tutors`);
        const data = await res.json();
        setTutorials(data);
      } catch {
        Swal.fire('❌ Error', 'Failed to fetch tutorials', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Tutorial?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tutors/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setTutorials((prev) => prev.filter((t) => t._id !== id));
          Swal.fire('✅ Deleted!', 'Tutorial deleted successfully.', 'success');
        } else Swal.fire('❌ Error', 'Failed to delete tutorial.', 'error');
      } catch {
        Swal.fire('❌ Error', 'Something went wrong.', 'error');
      }
    }
  };

  const handleBook = (tutorial) => {
    if (!user) return Swal.fire('⚠️ Please login first!', '', 'warning');

    Swal.fire({
      title: 'Book this Tutor?',
      text: `Do you want to book ${tutorial.tutorName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Book!',
    }).then((result) => {
      if (result.isConfirmed) navigate(`/bookings/${tutorial._id}`);
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28">
        <Loader />
        <p className="mt-6 text-indigo-600 font-semibold text-lg tracking-wide">Loading tutorials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Helmet>
        <title>My Tutorials</title>
      </Helmet>

      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-14 tracking-tight">
        My Tutorials
      </h2>

      {tutorials.length > 0 ? (
        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <table className="min-w-full table-auto text-left text-gray-800 dark:text-gray-200">
            <thead className="bg-indigo-700 dark:bg-indigo-800 text-white text-lg select-none">
              <tr>
                <th className="p-5">Image</th>
                <th className="p-5">Name</th>
                <th className="p-5">Language</th>
                <th className="p-5">Price</th>
                <th className="p-5 max-w-xs">Description</th>
                <th className="p-5 text-center">Review</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial, idx) => (
                <motion.tr
                  key={tutorial._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`transition-colors duration-300 ${
                    idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                  } hover:bg-indigo-100 dark:hover:bg-indigo-900 cursor-pointer`}
                >
                  <td className="p-5">
                    <img
                      src={tutorial.image}
                      alt={tutorial.tutorName}
                      className="h-16 w-28 object-cover rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-5 font-semibold text-gray-900 dark:text-gray-100">{tutorial.tutorName}</td>
                  <td className="p-5">{tutorial.language}</td>
                  <td className="p-5 font-medium">${tutorial.price.toFixed(2)}</td>
                  <td
                    className="p-5 max-w-xs truncate text-gray-700 dark:text-gray-300"
                    title={tutorial.description}
                    style={{ maxWidth: 280 }}
                  >
                    {tutorial.description}
                  </td>
                  <td className="p-5 text-center">{tutorial.review ?? 'N/A'}</td>
                  <td className="p-5 flex justify-center gap-3 flex-wrap">
                    {/* Only admin can Edit/Delete */}
                    {user?.role === 'admin' && (
                      <>
                        <button
                          onClick={() => navigate(`/update-tutor/${tutorial._id}`)}
                          className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                          aria-label="Edit Tutorial"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(tutorial._id)}
                          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500"
                          aria-label="Delete Tutorial"
                        >
                          <FaTrash size={18} />
                        </button>
                      </>
                    )}
                    {/* Everyone can Book */}
                    <button
                      onClick={() => handleBook(tutorial)}
                      className="p-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-500 flex items-center gap-2"
                      aria-label="Book Tutor"
                    >
                      <FaShoppingCart size={16} /> Book
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-24 px-4">
          <img
            src="https://illustrations.popsy.co/gray/sad.svg"
            alt="No tutorials"
            className="w-56 mb-8 opacity-80 select-none"
            loading="lazy"
          />
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
            No tutorials found
          </h3>
          <p className="max-w-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-base md:text-lg">
            You haven't added any tutorials yet. Start by adding your first tutorial to showcase your expertise!
          </p>
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/add-tutor')}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              aria-label="Add New Tutorial"
            >
              ➕ Add New Tutorial
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTutorials;

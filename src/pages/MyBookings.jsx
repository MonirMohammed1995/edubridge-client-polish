import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/bookings/${user?.email}`
        );
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user?.email) fetchBookings();
  }, [user]);

  // Handle review
  const handleReview = async (tutorId, bookingId) => {
    try {
      const res1 = await fetch(
        `${import.meta.env.VITE_API_URL}/tutors/review/${tutorId}`,
        { method: 'PATCH', headers: { 'Content-Type': 'application/json' } }
      );

      const res2 = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/reviewed/${bookingId}`,
        { method: 'PATCH', headers: { 'Content-Type': 'application/json' } }
      );

      if (res1.ok && res2.ok) {
        Swal.fire('✅ Review submitted!', '', 'success');
        const updated = bookings.map((b) =>
          b._id === bookingId ? { ...b, reviewed: true } : b
        );
        setBookings(updated);
      } else {
        Swal.fire('❌ Failed to submit review', '', 'error');
      }
    } catch (err) {
      console.error('Review Error:', err);
      Swal.fire('❌ Error', 'Something went wrong', 'error');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-14 tracking-tight">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <section className="text-center mt-32">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            You haven't booked any tutors yet.
          </h2>
        </section>
      ) : (
        <section
          aria-label="List of booked tutors"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="flex flex-col bg-white dark:bg-gray-900/80 rounded-3xl
                border border-none shadow-lg
                hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative w-full h-52">
                <img
                  src={booking.image}
                  alt={`${booking.language} tutor`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white truncate" title={booking.language}>
                    {booking.language}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                  Price: <span className="text-indigo-600">${booking.price}</span>
                </p>

                <p className="text-gray-600 dark:text-gray-400 text-sm break-words">
                  Tutor Email: <a href={`mailto:${booking.tutorEmail}`} className="underline hover:text-indigo-600">{booking.tutorEmail}</a>
                </p>

                <button
                  disabled={booking.reviewed}
                  onClick={() => handleReview(booking.tutorId, booking._id)}
                  aria-disabled={booking.reviewed}
                  className={`mt-auto w-full py-3 rounded-xl font-semibold text-white
                    transition-colors duration-300
                    ${
                      booking.reviewed
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500'
                    }`}
                >
                  {booking.reviewed ? '✅ Reviewed' : '📝 Leave Review'}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default MyBookings;

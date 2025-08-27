import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${user?.email}`);
        const data = await res.json();

        if (res.ok) setBookings(data);
        else setBookings([]);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    if (user?.email) fetchBookings();
  }, [user]);

  const handleReview = async (bookingId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/reviewed/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire("✅ Review submitted!", "", "success");
        setBookings(bookings.map((b) => (b._id === bookingId ? { ...b, reviewed: true } : b)));
      } else {
        Swal.fire("❌ Failed to submit review", data?.error || "Something went wrong", "error");
      }
    } catch {
      Swal.fire("❌ Error", "Something went wrong", "error");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 mb-14 tracking-tight select-none">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <section className="text-center mt-32">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
            You haven't booked any tutors yet.
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-base md:text-lg">
            Explore tutors and book your first lesson today!
          </p>
        </section>
      ) : (
        <section
          aria-label="List of booked tutors"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {bookings.map((booking) => (
            <motion.article
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white dark:bg-gray-900/80 rounded-3xl
                shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Tutor Image */}
              <div className="relative w-full h-52 md:h-64">
                <img
                  src={booking?.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={`${booking?.language || "Tutor"} image`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3
                    className="text-xl md:text-2xl font-bold text-white truncate select-text"
                    title={booking?.language || "Unknown Language"}
                  >
                    {booking?.language || "Unknown Language"}
                  </h3>
                </div>
              </div>

              {/* Tutor Details */}
              <div className="flex flex-col flex-grow p-6 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg md:text-xl">
                  Price: <span className="text-indigo-600 dark:text-indigo-400">${booking?.price || "N/A"}</span>
                </p>

                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Booked On:{" "}
                  <span className="font-medium">
                    {booking?.bookedAt ? new Date(booking.bookedAt).toLocaleDateString() : "Unknown"}
                  </span>
                </p>

                {/* Review Button */}
                <button
                  disabled={booking?.reviewed}
                  onClick={() => handleReview(booking._id)}
                  className={`mt-auto w-full py-3 rounded-xl font-semibold text-white
                    transition-colors duration-300
                    ${
                      booking?.reviewed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500"
                    }`}
                >
                  {booking?.reviewed ? "✅ Reviewed" : "📝 Leave Review"}
                </button>
              </div>
            </motion.article>
          ))}
        </section>
      )}
    </main>
  );
};

export default MyBookings;

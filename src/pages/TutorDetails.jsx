import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tutors/${id}`);
        if (!res.ok) throw new Error(`Tutor not found (status: ${res.status})`);
        const data = await res.json();
        if (data?._id) setTutor(data);
      } catch (err) {
        Swal.fire('❌ Tutor not found', 'Try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      Swal.fire('⚠️ Please login first!', '', 'warning');
      return;
    }

    const bookingInfo = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      tutorEmail: tutor.tutorEmail,
      email: user.email,
      bookedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingInfo),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('✅ Booked Successfully!', '', 'success');
      } else {
        Swal.fire('❌ Booking Failed', data?.message || '', 'error');
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Something went wrong', 'error');
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center py-28">
        <Loader />
        <p className="mt-6 text-indigo-600 font-semibold text-lg tracking-wide">
          Loading tutor details...
        </p>
      </section>
    );
  }

  if (!tutor) {
    return (
      <section className="flex items-center justify-center py-28">
        <p className="text-red-600 text-xl font-semibold tracking-wide select-none">
          ❌ Tutor not found.
        </p>
      </section>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Helmet>
        <title>{tutor.tutorName || 'Tutor'} - Details</title>
      </Helmet>

      <article
        className="grid grid-cols-1 md:grid-cols-2 gap-14
          bg-white dark:bg-gray-900 rounded-3xl shadow-xl
          border border-indigo-300 dark:border-indigo-700
          overflow-hidden"
      >
        {/* Image Section */}
        <div className="relative w-full h-96 md:h-auto rounded-t-3xl md:rounded-l-3xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
          <img
            src={tutor.image}
            alt={tutor.tutorName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-12 flex flex-col justify-between">
          <section>
            <h1
              className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-300
              mb-8 tracking-tight drop-shadow-md select-text"
            >
              {tutor.tutorName}
            </h1>

            <div className="space-y-8">
              <DetailItem label="Language" value={tutor.language} />
              <DetailItem label="Price" value={`$${tutor.price.toFixed(2)}`} />
              <DetailItem label="Reviews" value={tutor.review || 0} />

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 select-text">
                  About the Tutor
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line select-text">
                  {tutor.description || 'No detailed description available.'}
                </p>
              </div>
            </div>
          </section>

          <button
            onClick={handleBook}
            aria-label={`Book tutor ${tutor.tutorName}`}
            className="mt-12 w-full md:w-auto px-16 py-5
              bg-indigo-700 hover:bg-indigo-800 text-white
              font-semibold rounded-full shadow-lg
              transition duration-300 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-indigo-500
              active:scale-95"
          >
            Book This Tutor
          </button>
        </div>
      </article>
    </main>
  );
};

const DetailItem = ({ label, value }) => (
  <dl className="flex items-center gap-5">
    <dt className="w-32 text-indigo-900 dark:text-indigo-300 font-semibold tracking-wide select-none">
      {label}:
    </dt>
    <dd
      className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900
      text-indigo-800 dark:text-indigo-300 rounded-full
      text-base font-medium select-text"
    >
      {value}
    </dd>
  </dl>
);

export default TutorDetails;

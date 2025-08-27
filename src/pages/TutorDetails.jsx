import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader";

const TutorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  // Nicely formatted price
  const formattedPrice = useMemo(() => {
    if (!tutor?.price && tutor?.price !== 0) return "—";
    const num = Number(tutor.price);
    if (Number.isNaN(num)) return tutor.price; // fallback raw
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(num);
    } catch {
      return `$${num.toFixed(2)}`;
    }
  }, [tutor]);

  // Safe tutor name (supports old docs with `name`)
  const tutorDisplayName = tutor?.tutorName || tutor?.name || "Tutor";

  // Fetch tutor details
  useEffect(() => {
    const controller = new AbortController();

    const fetchTutor = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/tutors/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Tutor not found");
        const data = await res.json();
        setTutor(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          Swal.fire("❌ Tutor not found", "Try again later.", "error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
    return () => controller.abort();
  }, [API, id]);

  // Booking handler
  const handleBook = async () => {
    if (!user) {
      Swal.fire("⚠️ Please login first!", "", "warning");
      return;
    }
    if (!tutor?._id) {
      Swal.fire("❌ Error", "Tutor data is not loaded yet.", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Book this Tutor?",
      text: `Do you want to book ${tutorDisplayName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Book!",
    });

    if (!confirm.isConfirmed) return;

    const bookingInfo = {
      tutorId: tutor._id,
      userEmail: user.email,
      // ✅ Backend expects "date" (backend maps to bookedAt)
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };

    try {
      setBooking(true);
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        Swal.fire({
          title: "✅ Tutor Booked Successfully!",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
        navigate("/bookings");
      } else {
        Swal.fire("❌ Booking Failed", data?.error || "Please try again.", "error");
      }
    } catch (error) {
      Swal.fire("❌ Error", "Something went wrong. Please try again.", "error");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loader />;

  if (!tutor)
    return (
      <section className="flex items-center justify-center py-28">
        <p className="text-red-600 text-xl font-semibold tracking-wide select-none">
          ❌ Tutor not found.
        </p>
      </section>
    );

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Helmet>
        <title>{tutorDisplayName} - Details</title>
      </Helmet>

      <article className="grid grid-cols-1 md:grid-cols-2 gap-14 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-indigo-300 dark:border-indigo-700 overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-96 md:h-auto rounded-t-3xl md:rounded-l-3xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
          <img
            src={tutor.image}
            alt={tutorDisplayName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/600x600?text=No+Image";
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-12 flex flex-col justify-between">
          <section>
            <h1 className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-8 tracking-tight drop-shadow-md select-text">
              {tutorDisplayName}
            </h1>

            <div className="space-y-6">
              <DetailItem label="Language" value={tutor.language || "—"} />
              <DetailItem label="Price" value={formattedPrice} />
              <DetailItem label="Reviews" value={tutor.review ?? 0} />

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 select-text">
                  About the Tutor
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line select-text">
                  {tutor.description || "No detailed description available."}
                </p>
              </div>
            </div>
          </section>

          <button
            onClick={handleBook}
            aria-label={`Book tutor ${tutorDisplayName}`}
            disabled={booking}
            className={`mt-12 w-full md:w-auto px-16 py-5 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 active:scale-95
              ${booking ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-500"}`}
          >
            {booking ? "Booking..." : "Book This Tutor"}
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
    <dd className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-base font-medium select-text">
      {value}
    </dd>
  </dl>
);

export default TutorDetails;

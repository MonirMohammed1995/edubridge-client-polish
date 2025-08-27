import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const ManageTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tutors`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this tutor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/tutors/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Tutor has been deleted.", "success");
              setTutors((prev) => prev.filter((t) => t._id !== id));
            }
          });
      }
    });
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center py-28">
        <Loader />
        <p className="mt-6 text-indigo-600 font-semibold text-lg tracking-wide">
          Loading tutors...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 dark:text-gray-100">
        Manage Tutors
      </h2>

      {tutors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="https://illustrations.popsy.co/gray/sad.svg"
            alt="No tutors"
            className="w-56 mb-6 opacity-80"
          />
          <h3 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No tutors found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            No tutors are available currently. Add new tutors to showcase them professionally!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <table className="min-w-full table-auto text-left text-gray-800 dark:text-gray-200">
            <thead className="bg-indigo-700 dark:bg-indigo-800 text-white text-lg select-none">
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Language</th>
                <th className="px-6 py-3 border-b">Price ($)</th>
                <th className="px-6 py-3 border-b">Description</th>
                <th className="px-6 py-3 border-b text-center">Review</th>
                <th className="px-6 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, idx) => (
                <tr
                  key={tutor._id}
                  className={`transition-colors duration-300 ${
                    idx % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-indigo-100 dark:hover:bg-indigo-900`}
                >
                  <td className="px-6 py-4 border-b">{idx + 1}</td>
                  <td className="px-6 py-4 border-b font-semibold text-gray-900 dark:text-gray-100">
                    {tutor.tutorName}
                  </td>
                  <td className="px-6 py-4 border-b">{tutor.language}</td>
                  <td className="px-6 py-4 border-b font-medium">${tutor.price}</td>
                  <td
                    className="px-6 py-4 border-b truncate max-w-xs"
                    title={tutor.description}
                  >
                    {tutor.description || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b text-center">{tutor.review || 0}</td>
                  <td className="px-6 py-4 border-b flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        window.location.assign(`/update-tutor/${tutor._id}`)
                      }
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tutor._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTutors;

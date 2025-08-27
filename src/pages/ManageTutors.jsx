import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch tutors from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tutors`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this tutor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
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
    return <p className="text-center py-10 text-gray-600">Loading tutors...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tutors</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Language</th>
              <th className="px-4 py-2 border">Price ($)</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Review</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, idx) => (
              <tr key={tutor._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{tutor.tutorName}</td>
                <td className="px-4 py-2 border">{tutor.language}</td>
                <td className="px-4 py-2 border">{tutor.price}</td>
                <td className="px-4 py-2 border">{tutor.description}</td>
                <td className="px-4 py-2 border">{tutor.review || 0}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button
                    onClick={() =>
                      window.location.assign(`/update-tutor/${tutor._id}`)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(tutor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tutors.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 border"
                >
                  No tutors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTutors;

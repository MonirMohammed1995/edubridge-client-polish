import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch {
        Swal.fire("Error!", "Failed to load users.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API_URL]);

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire("Success!", "User role updated!", "success");
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
      }
    } catch {
      Swal.fire("Error!", "Could not update role.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
          const data = await res.json();
          if (data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setUsers((prev) => prev.filter((u) => u._id !== id));
          }
        } catch {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center py-28">
        <Loader />
        <p className="mt-6 text-indigo-600 font-semibold text-lg tracking-wide">
          Loading users...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 dark:text-gray-100">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="https://illustrations.popsy.co/gray/sad.svg"
            alt="No users"
            className="w-56 mb-6 opacity-80"
          />
          <h3 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No users found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            No users are available currently.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <table className="min-w-full table-auto text-left text-gray-800 dark:text-gray-200">
            <thead className="bg-indigo-700 dark:bg-indigo-800 text-white text-lg select-none">
              <tr>
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Role</th>
                <th className="px-6 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={`transition-colors duration-300 ${
                    idx % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-indigo-100 dark:hover:bg-indigo-900`}
                >
                  <td className="px-6 py-4 border-b">{idx + 1}</td>
                  <td className="px-6 py-4 border-b font-semibold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b">{user.email}</td>
                  <td className="px-6 py-4 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 border-b flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleDelete(user._id)}
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

export default ManageUsers;

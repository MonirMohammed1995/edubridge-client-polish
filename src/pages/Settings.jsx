import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.displayName || "Admin",
        email: user.email,
        role: user.role || "admin",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // API call to update admin profile (optional)
    Swal.fire("✅ Saved!", "Settings updated successfully.", "success");
  };

  const inputClass =
    "w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500";

  return (
    <main className="max-w-4xl mx-auto mt-12 mb-16 px-6 py-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl transition-colors duration-300">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 text-center">
        Admin Settings
      </h2>

      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-300">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className={`${inputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={profile.role}
              disabled
              className={`${inputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Settings;

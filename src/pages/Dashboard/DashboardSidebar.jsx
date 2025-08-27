import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, PlusSquare, BookOpen, Bookmark, LogOut, Users, Settings } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch((error) => toast.error(`Logout failed: ${error.message}`));
  };

  const userMenu = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Overview", path: "/dashboard/user/overview", icon: <Home size={18} /> },
    { name: "My Tutors", path: "/dashboard/user/my-tutors", icon: <BookOpen size={18} /> },
    { name: "My Booked Tutors", path: "/dashboard/user/my-booked", icon: <Bookmark size={18} /> },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Dashboard Overview", path: "/dashboard/admin/overview", icon: <Home size={18} /> },
    { name: "Add Tutor", path: "/dashboard/admin/add-tutor", icon: <PlusSquare size={18} /> },
    { name: "Manage Users", path: "/dashboard/admin/manage-users", icon: <Users size={18} /> },
    { name: "Manage Tutors", path: "/dashboard/admin/manage-tutors", icon: <BookOpen size={18} /> },
    { name: "Settings", path: "/dashboard/admin/settings", icon: <Settings size={18} /> },
  ];

  const menuItems = role === "admin" ? adminMenu : userMenu;

  return (
    <aside className="w-64 h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 fixed top-0 left-0 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
      {/* Logo / Title */}
      <div className="px-6 py-5 text-2xl font-bold border-b border-gray-300 dark:border-gray-700 select-none">
        EduBridge
      </div>

      {/* Menu */}
      <nav className="mt-6 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 ${
                    isActive ? "bg-indigo-200 dark:bg-indigo-700 font-semibold shadow-md" : ""
                  }`
                }
                end
              >
                <span className="text-indigo-600 dark:text-indigo-300">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-300 dark:border-gray-700 p-4">
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition shadow-md"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;

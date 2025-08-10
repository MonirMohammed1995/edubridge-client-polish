import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, BookOpen, Bookmark, LogOut } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const DashboardSidebar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Logged out successfully');
                navigate('/login');
            })
            .catch((error) => toast.error(`Logout failed: ${error.message}`));
    };

    const menuItems = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Overview', path: '/dashboard/user/overview', icon: <Home size={18} /> },
        { name: 'Add Tutor', path: '/dashboard/user/add-tutor', icon: <PlusSquare size={18} /> },
        { name: 'My Tutors', path: '/dashboard/user/my-tutors', icon: <BookOpen size={18} /> },
        { name: 'My Booked Tutors', path: '/dashboard/user/my-booked', icon: <Bookmark size={18} /> },
    ];

    return (
        <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 shadow-lg flex flex-col">
            <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
                Dashboard
            </div>
            <nav className="mt-4 flex-1">
                <ul className="space-y-1">
                    {menuItems.map((item, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-5 py-3 hover:bg-gray-800 transition-all duration-200 ${
                                        isActive ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                                    }`
                                }
                                end
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="border-t border-gray-700 p-4">
                {user && (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default DashboardSidebar;

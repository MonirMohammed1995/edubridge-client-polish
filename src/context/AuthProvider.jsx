import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          // ✅ Backend থেকে user role ফেচ
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${currentUser.email}`
          );
          if (!res.ok) throw new Error("Failed to fetch role");
          const data = await res.json();
          setRole(data?.role || "user"); // fallback role = user
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole("user");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

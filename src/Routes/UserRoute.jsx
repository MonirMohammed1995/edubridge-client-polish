import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader";

const UserRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (user && role?.toLowerCase() === "user") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default UserRoute;

import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import FindTutors from "../pages/FindTutors";
import MyBookings from "../pages/MyBookings";
import AddTutor from "../pages/AddTutor";
import MyTutors from "../pages/MyTutors";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import TutorDetails from "../pages/TutorDetails";
import UpdateTutor from "../pages/Update";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import ManageUsers from "../pages/MangeUsers";
import ManageTutors from "../pages/ManageTutors";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", Component: Home },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/find-tutors", element: <FindTutors /> },
      { path: "/find-tutors/:language", element: <FindTutors /> },
      // {
      //   path: "/add-tutor",
      //   element: (
      //     <PrivateRoute>
      //       <AddTutor />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/my-tutors",
        element: (
          <PrivateRoute>
            <MyTutors />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookings/:id",
        element: (
          <PrivateRoute>
            <TutorDetails/>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-tutor/:id",
        element: (
          <PrivateRoute>
            <UpdateTutor />
          </PrivateRoute>
        ),
      },
      {
        path: "/tutor/:id",
        element: (
          <PrivateRoute>
            <TutorDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // User Dashboard
  {
    path: "/dashboard/user",
    element: (
      <UserRoute>
        <DashboardLayout />
      </UserRoute>
    ),
    children: [
      { path: "/dashboard/user/overview", element: <DashboardOverview /> },
      { path: "/dashboard/user/my-tutors", element: <MyTutors /> },
      { path: "/dashboard/user/my-booked", element: <MyBookings /> },
    ],
  },

  // Admin Dashboard
  {
    path: "/dashboard/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { path: "/dashboard/admin/overview", element: <DashboardOverview /> },
      { path: "/dashboard/admin/add-tutor", element : <AddTutor/>},
      { path: "/dashboard/admin/manage-users", element : <ManageUsers/>},
      { path: "/dashboard/admin/manage-tutors", element: <ManageTutors/>},
      { path: "/dashboard/admin/settings", element: <Settings/>}
    ],
  },
]);

export default router;

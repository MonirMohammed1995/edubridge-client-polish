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

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage/>,
    children:[
        {
            index:true,
            path:'/',
            Component:Home,
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:'/find-tutors',
            element:<FindTutors/>
        },
        {
            path:'/find-tutors/:language',
            element:<FindTutors/>
        },
        {
            path:'/add-tutor',
            element:(<PrivateRoute>
                <AddTutor/>
            </PrivateRoute>)
        },
        {
            path:'/my-tutors',
            element:(<PrivateRoute>
                <MyTutors/>
            </PrivateRoute>)
        },
        {
            path:'/bookings',
            element:(<PrivateRoute>
                <MyBookings/>
            </PrivateRoute>)
        },
        {
            path:'/update-tutor/:id',
            element:(<PrivateRoute>
                <UpdateTutor/>
            </PrivateRoute>)
        },
        {
            path:'/tutor/:id',
            element:(<PrivateRoute>
                <TutorDetails/>
            </PrivateRoute>)
        },
    ]
  },
  {
            path:'/dashboard/user',
            element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
            children:[
                {
                    path:'/dashboard/user/overview',
                    element:<DashboardOverview/>
                },
                {
                    path: '/dashboard/user/add-tutor',
                    element:<AddTutor/>
                },
                {
                    path: '/dashboard/user/my-tutors',
                    element:<MyTutors/>
                },
                {
                    path: '/dashboard/user/my-booked',
                    element:<MyBookings/>
                },
                {
                     path:'/dashboard/user/my-tutors/tutor/:id',
                     element:<TutorDetails/>
                }
            ]
}
]);
export default router;
import { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  AUTH_ROUTES,
  ADMIN_ROUTES,
  USER_ROUTES,
} from "../config/routes.config";
import { AdminLayout, PublicLayout, UserLayout } from "../layout";
import {
  Users,
  Dashboard,
  ForgetPassword,
  Login,
  AdminProfile,
  Register,
  UserProfile,
} from "../pages";
import Models from "../pages/admin/Models";
import Otp from "../pages/auth/Otp";
import Payment from "../pages/auth/Payment";
import ResetFactorAuthentication from "../pages/auth/ResetFactorAuthentication";
import ResetPassword from "../pages/auth/ResetPassword";
import UserRegister from "../pages/auth/UserRegister";
import Key from "../pages/auth/Key";
import VerifyEmail from "../sections/auth/register_company/VerifyEmail";

//Each object in the userArray array represents a route configuration, with a path property defining the URL path for the route, and an element property specifying the component that should be rendered when the route is matched.
const userArray = [
  {
    path: AUTH_ROUTES.root,
    element: <Navigate to="/login" replace />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: AUTH_ROUTES.login,
        element: <Login />,
      },
      {
        path: AUTH_ROUTES.otp,
        element: <Otp />,
      },
      {
        path: AUTH_ROUTES.resetFactorAuthentication,
        element: <ResetFactorAuthentication />,
      },
      {
        path: AUTH_ROUTES.VerifyEmail,
        element: <VerifyEmail />,
      },
      {
        path: AUTH_ROUTES.keyPage,
        element: <Key />,
      },
      { path: AUTH_ROUTES.registerCompany, element: <Register /> },
      { path: AUTH_ROUTES.forgetPassword, element: <ForgetPassword /> },
      {
        path: AUTH_ROUTES.registerUser,
        element: <UserRegister />,
      },
      {
        path: AUTH_ROUTES.resetPassword,
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: USER_ROUTES.root,
        element: <UserProfile />,
      },
      {
        path: USER_ROUTES.models,
        element: <Models />,
      },
    ],
  },
];

//Each object in the adminArray array represents a route configuration, with a path property defining the URL path for the route, and an element property specifying the component that should be rendered when the route is matched.
const adminArray = [
  {
    path: AUTH_ROUTES.root,
    element: <Navigate to="/login" replace />,
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: AUTH_ROUTES.login,
        element: <Login />,
      },
        {
          path: AUTH_ROUTES.payment, 
          element: <Payment />,
        },
      {
        path: AUTH_ROUTES.otp,
        element: <Otp />,
      },
      { path: AUTH_ROUTES.registerCompany, element: <Register /> },
      { path: AUTH_ROUTES.forgetPassword, element: <ForgetPassword /> },
      {
        path: AUTH_ROUTES.registerUser,
        element: <UserRegister />,
      },
      {
        path: AUTH_ROUTES.resetPassword,
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: ADMIN_ROUTES.root,
        children: [{ index: true, element: <Dashboard /> }],
      },

      {
        path: ADMIN_ROUTES.users,
        element: <Users />,
      },
      {
        path: ADMIN_ROUTES.adminProfile,
        element: <AdminProfile />,
      },
      {
        path: ADMIN_ROUTES.models,
        element: <Models />,
      },
    ],
  },
];

//The useEffect hook is used to update the routeArray based on the user's role. If the user is an admin, the routeArray is set to adminArray, otherwise it is set to userArray.
function Router() {
  const [routeArray, setRouteArray] = useState(adminArray);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    
    if (user && user?.role === "admin") {
      setRouteArray(adminArray);
    } 
    else {
      setRouteArray(userArray);
    }
  }, [user]);
  return useRoutes(routeArray);
}

export default Router;

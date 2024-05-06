import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import HomePage from "../pages/HomePage";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotOtp from "../pages/ForgotOtp";
import RenewPassword from "../pages/RenewPassword";
import App from "../App";
import Profile from "../pages/Profile";
import { adminLoginRouter, adminRouter } from "./adminRoutes";
import UsersProfile from "../pages/UsersProfile";
import FollowRequests from "../pages/FollowRequests";
import Search from "../pages/Search";
import SavedPost from "../pages/SavedPost";
import ProtectedRoutes from './protectedRoutes/ProtectedROutes'
import Chat from "../pages/Chat";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/users-profile/:userId',
                element: <UsersProfile />
            },
            {
                path: '/follow-requests',
                element: <FollowRequests />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/saved-post',
                element: <SavedPost />
            },
        ]
    },
    {
        path: '/chat',
        element: (
            <ProtectedRoutes>
                <Chat />
            </ProtectedRoutes>
        ),
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/otp",
        element: <Otp />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/forgot-otp",
        element: <ForgotOtp />
    },
    {
        path: "/renew-password",
        element: <RenewPassword />
    },

    adminRouter,
    adminLoginRouter
])

export default appRouter;

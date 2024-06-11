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
import Error from "../components/Error";
import ProtectedVideoCall from '../components/chatComponents/ProtectVideoCall'
import ProtectedGroupVideoCall from '../components/chatComponents/ProtectedGroupVideoCall'
import PremiumPage from "../pages/PremiumPage";
import Premium from "../components/Premium";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentFailed from "../components/PaymentFailed";
import Notifications from "../components/Notifications";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error message="Something Went Wrong" />,
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
            {
                path: '/notifications',
                element: <Notifications />
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
        errorElement: <Error message="Something Went Wrong" />
    },
    {
        path: "/video-call/:roomId/:userId",
        element: <ProtectedVideoCall />,
    },
    {
        path: "/group-video-call/:roomId/:userId",
        element: <ProtectedGroupVideoCall />,
    },
    {
        path: '/premium',
        element: <PremiumPage />,
        children: [
            {
                path: '/premium/plans',
                element: <Premium />
            },
            {
                path: '/premium/payment-success',
                element: <PaymentSuccess />
            },
            {
                path: '/premium/payment-failed',
                element: <PaymentFailed />
            },
        ]
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

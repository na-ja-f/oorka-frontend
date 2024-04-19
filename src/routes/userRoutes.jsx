import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import HomePage from "../pages/HomePage";
import ForgotPassword from "../pages/ForgotPassword";
import ForgotOtp from "../pages/ForgotOtp";
import RenewPassword from "../pages/RenewPassword";
import App from "../App";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:'/',
                element:<HomePage />
            }
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
])

export default appRouter;

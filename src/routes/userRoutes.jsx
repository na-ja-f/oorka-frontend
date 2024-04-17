import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import HomePage from "../pages/HomePage";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
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
])

export default appRouter;

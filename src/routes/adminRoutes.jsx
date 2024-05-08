import { Children } from "react"
import Admin from "../pages/admin/Admin"
import AdminLogin from "../pages/admin/AdminLogin"
import UsersList from "../pages/admin/UsersList"
import ReportList from "../pages/admin/ReportList"
import BlockedPosts from '../pages/admin/BlockedPosts'
import Transactions from "../pages/admin/Transactions"
import Hashtags from '../pages/admin/Hashtags'
import AdminDashboard from "../pages/admin/AdminDashboard"

export const adminRouter = {
    path: "/admin",
    element: <Admin />,
    children: [
        {
            path: '/admin/',
            element: <AdminDashboard />
        },
        {
            path: "/admin/users",
            element: <UsersList />
        },
        {
            path: "/admin/reports",
            element: <ReportList />
        },
        {
            path: "/admin/blocked-posts",
            element: <BlockedPosts />
        },
        {
            path: "/admin/transactions",
            element: <Transactions />
        },
        {
            path: "/admin/hashtags",
            element: <Hashtags />
        },
    ]
}

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
}
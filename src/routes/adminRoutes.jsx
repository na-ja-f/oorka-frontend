import { Children } from "react"
import Admin from "../pages/admin/Admin"
import AdminLogin from "../pages/admin/AdminLogin"
import UsersList from "../pages/admin/UsersList"
import ReportList from "../pages/admin/ReportList"
import BlockedPosts from '../pages/admin/BlockedPosts'

export const adminRouter = {
    path: "/admin",
    element: <Admin />,
    children: [
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
    ]
}

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
}
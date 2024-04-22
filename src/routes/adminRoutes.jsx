import { Children } from "react"
import Admin from "../pages/admin/Admin"
import AdminLogin from "../pages/admin/AdminLogin"
import UsersList from "../pages/admin/UsersList"

export const adminRouter = {
    path: "/admin",
    element: <Admin />,
    children: [
        {
            path: "/admin/users",
            element: <UsersList />
        }
    ]
}

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
}
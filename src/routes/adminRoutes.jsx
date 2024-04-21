import Admin from "../pages/admin/Admin"
import AdminLogin from "../pages/admin/AdminLogin"

export const adminRouter = {
    path:"/admin",
    element: <Admin />
}

export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
}
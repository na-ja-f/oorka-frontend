import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from "../../components/admin/Navbar";

function Admin() {
    const selectAdmin = (state) => state.adminAuth.admin;
    const admin = useSelector(selectAdmin)
    const navigate = useNavigate()

    useEffect(() => {
        if (!admin) {
            navigate('/admin/login')
        }
    },[admin, navigate])
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Admin

import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
      <h1>hello</h1>
      <Outlet />
    </div>
  )
}

export default Admin

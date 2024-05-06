import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOutIcon, LayoutDashboard, ShieldBan, Hash, MessageCircleWarning, DollarSign } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { AdminLogout } from '../../redux/reducers/adminAuthSlice'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(AdminLogout())
        localStorage.removeItem("email")
        toast.info("logout succesfull")
        navigate("/admin/login")
    }

    return (
        <body className="font-poppins m-5 mt-16 rounded-lg">
            <div className="h-full flex flex-row">
                <div className="bg-white pb-10 rounded-xl flex md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out">
                    <div className="space-y-2 md:space-y-4 mt-2">
                        <h1 className="md:block font-bold text-sm md:text-xl text-center">
                            Admin
                        </h1>
                        <div className="space-y-3">
                            <img src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                            <div>
                                <h2 className="font-medium text-xs md:text-sm text-center  text-gradient-to-b text-from-purple-600 text-to-blue-400">
                                    Muhammad Najaf
                                </h2>
                                <p className="text-xs text-gray-500 text-center">
                                    Administrator
                                </p>
                            </div>
                        </div>

                        <div id="menu" className="flex flex-col  mt-4 space-y-2">
                            <Link to={'/admin'} className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-myViolet hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                                <LayoutDashboard className="inline-block" />
                                <span className="ml-2">Dashboard</span>
                            </Link>
                            <Link to={"/admin/users"} className="text-sm flex font-medium text-gray-700 py-2 px-2 hover:bg-myViolet hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                <User2 />
                                <span className="ml-2">Users</span>
                            </Link>
                            <Link to="/admin/blocked-posts" className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-myViolet hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                            >
                                <ShieldBan className="inline-block" />
                                <span className="ml-2">Blocked Posts</span>
                            </Link>
                            <Link to={"/admin/reports"} className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-myViolet hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                <MessageCircleWarning className="inline-block" />
                                <span className="ml-2">Reports</span>
                            </Link>
                            <Link to={"/admin/hashtags"} className="text-sm flex font-medium text-gray-700 py-2 px-2 hover:bg-myViolet hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                <Hash />
                                <span className="ml-2">Hashtags</span>
                            </Link>
                            <Link to={"/admin/transactions"} className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-myViolet hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                <DollarSign className="inline-block" />
                                <span className="ml-2">Transactions</span>
                            </Link>

                            <button onClick={handleLogout} className="text-sm flex font-medium text-gray-700 py-2 mt-80  px-2 hover:bg-myViolet hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out">
                                <LogOutIcon />
                                <span className="ml-2">Logout</span>
                            </button>
                            {/* Other menu items */}
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Navbar

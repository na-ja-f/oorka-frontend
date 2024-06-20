import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/reducers/authSlice"
import { useNavigate, useLocation, NavLink } from "react-router-dom"
import { toast } from "sonner"
import { LayoutGrid, BellRing, MessageSquareText, UserPlus, Bookmark, User, ListCollapse, LogOut, Search, ImagePlus } from 'lucide-react'


function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("email");
        toast.info("logout succsfull")
        navigate("/login")
    }

    return (
        <>
            <aside className="fixed shadow-2xl z-50 flex flex-col w-64 px-4 py-5 h-full overflow-none rounded-xl rtl:border-r-0 rtl:border-l bg-white  dark:border-gray-700">
                <div className="flex flex-col justify-between flex-1 mt-5">
                    <nav>
                        <NavLink
                            to={"/"}
                            className={`flex items-center px-4 py-2 ${location.pathname === "/"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }`}
                        >
                            <LayoutGrid size={30}/>
                            <span className="ml-5">Dashboard</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/search"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/search"}
                        >
                            <Search size={30}/>
                            <span className="mx-5 ">Search</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/notifications"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/notifications"}
                        >
                            <BellRing size={30}/>
                            <span className="mx-5 ">Notifications</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/messages"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/chat"}
                        >
                            <MessageSquareText size={30}/>
                            <span className="mx-5 ">Messages</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/follow-requests"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/follow-requests"}
                        >
                            <UserPlus size={30}/>
                            <span className="mx-5 ">Requests</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/saved-post"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/saved-post"}
                        >
                            <Bookmark size={30}/>
                            <span className="mx-5 ">Saved Posts</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/profile"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/profile"}
                        >
                            <User size={30}/>
                            <span className="mx-5 ">Profile</span>
                        </NavLink>
                        <NavLink
                            className={`flex items-center px-4 mt-2 py-2 ${location.pathname === "/settings"
                                ? "text-myViolet border-r-2 border-myViolet"
                                : "text-myText"
                                }  rounded-lg`}
                            to={"/settings"}
                        >
                            <ListCollapse size={30}/>
                            <span className="mx-5 ">More</span>
                        </NavLink>
                        {/* Add more navigation links */}
                    </nav>
                </div>
                <div
                    onClick={handleLogout}
                    className="flex text-myText cursor-pointer mt-32 px-4"
                >
                    <LogOut size={30}/>
                    <button className="mx-5 ">Logout</button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar

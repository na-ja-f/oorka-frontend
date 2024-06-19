
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function GroupMembers({ members, onClose }) {
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id || ""

    return (
        <div className="absolute top-0 left-0 z-40 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg" style={{ height: "450px", width: "450px" }}>
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold mb-4">members</h2>
                    <X onClick={onClose} className=" cursor-pointer" />
                </div>
                <hr className="border-gray-300 w-full mb-2" />
                <div className="overflow-auto" style={{ height: "270px" }}>
                    <ul>
                        {members.map((user) => (
                            <>
                                <div className="lg:col-span-2 w-12/12  pb-2 mb-2" id="posted">
                                    <div className="flex justify-between bg-white rounded-lg">
                                        <Link
                                            to={user._id === userId ? "/profile" : `/users-profile/${user._id}`} className="info flex items-center mr-24 gap-2">
                                            <img src={user.profileImg} alt="profile" className=" h-10 rounded-full" />
                                            <p className="text-gray-800 text-sm mx-1">
                                                {user.name}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GroupMembers

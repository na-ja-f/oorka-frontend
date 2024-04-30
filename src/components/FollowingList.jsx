import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getUserConnections,
    followUser,
    unFollowUser,
    rejectFollowRequest
} from "../services/api/user/apiMethods";


function FollowingList({ followingUsers, setFollowingUsers, onClose, currentUser }) {

    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id || ""
    const [following, setFollowing] = useState([])
    const [requested, setRequested] = useState([])

    useEffect(() => {
        getUserConnections({ userId })
            .then((response) => {
                const connectionData = response.data.connection
                const followingIds = connectionData.following.map((user) => user._id)
                setFollowing(followingIds)
                const requestedIds = connectionData.requestSent.map((user) => user._id)
                setRequested(requestedIds)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])

    const isFollowing = (likedUserId) => {
        return following.includes(likedUserId)
    };

    const isRequested = (likedUserId) => {
        return requested.includes(likedUserId)
    };

    const handleFollow = (likedUserId) => {
        followUser({ userId, followingUser: likedUserId })
            .then((response) => {
                if (response.data.followed) {
                    setFollowing([...following, likedUserId])
                } else {
                    setRequested((prevRequested) => [...prevRequested, likedUserId])
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const handleReject = (likedUserId) => {
        rejectFollowRequest({ userId, requestedUser: likedUserId })
            .then((response) => {
                setRequested(requested.filter((id) => id !== likedUserId))
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const handleUnFollow = (likedUserId) => {
        unFollowUser({ userId, unfollowingUser: likedUserId })
            .then((response) => {
                setFollowing(following.filter((userId) => userId !== likedUserId))
                if (currentUser == userId) {
                    setFollowingUsers(followingUsers.filter((user) => user._id !== likedUserId))
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="absolute top-0 left-0 z-40 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg" style={{ height: "450px", width: "450px" }}>
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold mb-4">Following</h2>
                    <X onClick={onClose} className=" cursor-pointer" />
                </div>
                <hr className="border-gray-300 w-full mb-2" />
                <div className="overflow-auto" style={{ height: "270px" }}>
                    <ul>
                        {followingUsers.map((user) => (
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
                                        {userId !== user._id && (
                                            <div className="items-center flex gap-5 actions">
                                                {!isFollowing(user._id) && !isRequested(user._id) && (
                                                    <button onClick={() => handleFollow(user._id)} className="text-sm text-white px-4 py-1 bg-gradient-to-b from-purple-600 to-blue-400 hover:bg-blue-400 rounded-md">
                                                        follow
                                                    </button>
                                                )}
                                                {isFollowing(user._id) && (
                                                    <button onClick={() => handleUnFollow(user._id)} className="text-sm text-gray-800 px-4 py-1 bg-gray-100 rounded-md">
                                                        unfollow
                                                    </button>
                                                )}
                                                {isRequested(user._id) && (
                                                    <button onClick={() => handleReject(user._id)} className="text-sm text-gray-800 px-4 py-1 bg-gray-100 rounded-md">
                                                        requested
                                                    </button>
                                                )}
                                            </div>
                                        )}
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

export default FollowingList

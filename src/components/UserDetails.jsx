import { Pencil, Share2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Followers from './FollowersList'
import Following from './FollowingList'
import { toast } from "sonner";
import { unFollowUser, followUser, getUserConnections, rejectFollowRequest } from "../services/api/user/apiMethods";
import { Link } from "react-router-dom";


function UserDetails({ user, connections, isConnected }) {
    const selectUser = (state) => state.auth.user;
    const userData = useSelector(selectUser)
    const userId = userData._id || "";

    const [isFollowed, setIsFollowed] = useState(false);
    const [isFollowRequested, setIsFollowRequested] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollowingModal, setIsFollowingModal] = useState(false);
    const [isFollowersModal, setIsFollowersModal] = useState(false);

    useEffect(() => {
        const followingUserId = user?._id;
        console.log(followingUserId);
        getUserConnections({ userId: followingUserId })
            .then((response) => {
                const connectionData = response.data.connection;
                setFollowing(connectionData.following);
                setFollowers(connectionData.followers);
                setIsFollowed(connections.followers.includes(userId));
                setIsFollowRequested(connections.requested.includes(userId));
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    const handleFollow = () => {
        const followingUser = user._id;
        followUser({ userId, followingUser })
            .then((response) => {
                response.data.followed ?
                    setIsFollowed(true) :
                    setIsFollowRequested(true);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleUnFollow = () => {
        const unfollowingUser = user._id;
        unFollowUser({ userId, unfollowingUser })
            .then((response) => {
                setIsFollowed(false)
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleReject = () => {
        const requestedUser = user._id;
        rejectFollowRequest({ userId, requestedUser })
            .then((response) => {
                setIsFollowRequested(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleFollowersModal = () => {
        if (!isConnected) {
            toast.warning("this account is private. follow to view posts")
            return;
        }
        return setIsFollowersModal(!isFollowersModal)
    }

    const handleFollowingModal = () => {
        if (!isConnected) {
            toast.warning("this account is private. follow to view posts")
            return;
        }
        return setIsFollowingModal(!isFollowingModal)
    }

    return (
        <div className=" ms-96 flex mt-5 flex-col shadow-2xl bg-white pb-3 pl-5 w-11/12 rounded-xl">
            <div className="flex gap-20">
                <div className="gap-4 m-5">
                    <img className=" h-36 w-36 rounded-full" src={user?.profileImg} alt="profilepic" />
                </div>
                <div className="flex flex-col mt-4">
                    <p className="font-semibold text-lg flex justify-center">{user.name}</p>
                    {user?.isVerified && (<svg
                        viewBox="0 0 22 22"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                    >
                        <path
                            d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                            fill="#1d9bf0"
                        ></path>
                    </svg>
                    )}
                    <p className="flex justify-center">{user.bio}</p>
                    {user?._id !== userId && (
                        <div className="flex justify-around">
                            {isFollowed ? (
                                <span onClick={handleUnFollow} className="text-red-500 cursor-pointer">
                                    UnFollow
                                </span>
                            ) : isFollowRequested ? (
                                <span onClick={handleReject} className="text-blue-500 cursor-pointer">
                                    requested
                                </span>
                            ) : (
                                <span onClick={handleFollow} className="text-blue-500 cursor-pointer">
                                    Follow
                                </span>
                            )}

                            <Link to={`/chat?userId=${user._id}`} className="text-purple-500">
                                Message
                            </Link>

                        </div>
                    )}
                    <div className="flex gap-6 mt-5">
                        <div onClick={handleFollowingModal} className="flex flex-col cursor-pointer items-center">
                            <p className="font-medium text-lg">{following.length}</p>
                            <p className="text-sm">Following</p>
                        </div>
                        <div onClick={handleFollowersModal} className="flex flex-col cursor-pointer items-center">
                            <p className="font-medium text-lg">{followers.length}</p>
                            <p className="text-sm">Followers</p>
                        </div>
                        <div className="flex flex-col cursor-pointer items-center">
                            <p className="font-medium text-lg">0</p>
                            <p className="text-sm">Posts</p>
                        </div>
                    </div>
                </div>
            </div>
            {isFollowersModal && (
                <Followers
                    followers={followers}
                    followingUsers={following}
                    setFollowingUsers={setFollowing}
                    onClose={handleFollowersModal}
                />
            )}
            {isFollowingModal && (
                <Following
                    followingUsers={following}
                    setFollowingUsers={setFollowing}
                    onClose={handleFollowingModal}
                    currentUser={user._id}
                />
            )}
        </div>
    )
}

export default UserDetails

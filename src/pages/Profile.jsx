import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserPost, getUserConnections } from "../services/api/user/apiMethods";
import { setPosts } from "../redux/reducers/authSlice";
import { Tooltip } from "flowbite-react";
import { BadgeDollarSign, Pencil } from "lucide-react";
import PostGallery from "../components/PostGallery";
import FollowersList from "../components/FollowersList";
import FollowingList from "../components/FollowingList";
import { useNavigate } from "react-router-dom";
import ProfileEdit from '../components/ProfileEdit'



function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectPosts = (state) => state.auth.posts
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)
    const userId = user._id;
    const posts = useSelector(selectPosts) || []

    const [isProfileEdit, setIsProfileEdit] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollowingModal, setIsFollowingModal] = useState(false);
    const [isFollowersModal, setIsFollowersModal] = useState(false);

    useEffect(() => {
        try {
            getUserPost(userId)
                .then((response) => {
                    const postData = response.data
                    dispatch(setPosts({ posts: response.data }))
                })
                .catch((error) => {
                    console.log(error);
                })

            getUserConnections({ userId })
                .then((response) => {
                    const connectionData = response.data.connection;
                    setFollowing(connectionData.following)
                    setFollowers(connectionData.followers);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleFollowersModal = () => {
        return setIsFollowersModal(!isFollowersModal)
    }

    const handleFollowingModal = () => {
        return setIsFollowingModal(!isFollowingModal)
    }

    const handleEditClose = () => {
        return setIsProfileEdit(!isProfileEdit)
    }

    return (
        <div className="ml-5 mt-11 w-8/12 ">
            <div className=" ms-96 flex mt-5 flex-col shadow-2xl bg-white p-4 pb-3 pl-5 w-11/12 rounded-xl">
                <div className="flex gap-20 ">
                    <div className="gap-4">
                        <img className=" h-36 rounded-full border-2 border-myViolet" src={user.profileImg} alt="profile" />
                        <div className="flex items-top ml-3 justify-center gap-2">
                            <p className="font-medium text-lg mt-2">{user.username}</p>
                            {user?.isVerified && (
                                <svg
                                    viewBox="0 0 22 22"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mt-1"
                                >
                                    <path
                                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                        fill="#1d9bf0"
                                    ></path>
                                </svg>
                            )}
                        </div>
                        <p className="text-sm flex justify-center text-gray-600">{user?.bio}</p>

                    </div>
                    <div className="flex flex-col mt-4">
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
                                <p className="font-medium text-lg">{posts.length}</p>
                                <p className="text-sm">Posts</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 ml-10 mt-10">
                        <div onClick={() => setIsProfileEdit(true)}
                            className="flex gap-3 cursor-pointer">
                            <Tooltip content="Edit Profile" style="light">
                                <Pencil
                                    size={20}
                                    color="black"
                                />
                            </Tooltip>
                            <p className="text-sm text-gray-500">Edit Profile</p>
                        </div>
                        <div className="flex gap-3">
                            <Tooltip content="Get Verified" style="light">
                                <BadgeDollarSign
                                    className=" cursor-pointer"
                                    color="black"
                                />
                            </Tooltip>
                            <p className="text-sm text-gray-500">Get Premium</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms-96 mt-14 grid grid-cols-2 md:grid-cols-3 w-11/12 gap-3">
                {posts && posts.map((post) => {
                    return <div key={post._id}>
                        <PostGallery post={post} />
                    </div>
                })}
            </div>
            {isProfileEdit && <ProfileEdit user={user} onClose={handleEditClose} />}

            {isFollowersModal && (
                <FollowersList
                    followers={followers}
                    followingUsers={following}
                    setFollowingUsers={setFollowing}
                    onClose={handleFollowersModal} />
            )}
            {isFollowingModal && (
                <FollowingList
                    currentUser={userId}
                    followingUsers={following}
                    setFollowingUsers={setFollowing}
                    onClose={handleFollowingModal} />
            )}
        </div>
    )
}

export default Profile

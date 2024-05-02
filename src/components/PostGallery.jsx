import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ViewPost from './ViewPost'
import { getCommentsCount, likePost } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { loginSuccess, setPosts } from "../redux/reducers/authSlice";
import { BadgeCheck, Heart, MessageSquareMore, X } from "lucide-react";
import LikedUsers from "./LikedUsers";
import { Link } from "react-router-dom";

function PostGallery({ post }) {
    const images = post.imageUrl || [];
    const dispatch = useDispatch()
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id || ""

    const [likedUsers, setLikedUsers] = useState(post.likes);
    const [commentsCount, setCommentsCount] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [isLikedByUser, setIsLikedByUser] = useState(post.likes.includes(userId) || post.likes.some((user) => user._id === userId))
    const [showLikedUsersPopup, setShowLikedUsersPopup] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);

    useEffect(() => {
        const postId = post._id
        getCommentsCount(postId)
            .then((response) => {
                setCommentsCount(response.data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    useEffect(() => {
        const interValid = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
                setIsTransitioning(false)
            }, 500)
        }, 5000)
        return () => clearInterval(interValid)
    }, [images.length])

    const handleLike = (postId, userId) => {
        try {
            likePost({ postId, userId })
                .then((response) => {
                    const postData = response.data;
                    dispatch(setPosts({ posts: postData.posts }))
                    setIsLikedByUser(!isLikedByUser)
                    if (isLikedByUser) {
                        setLikedUsers((prevLikedUsers) => prevLikedUsers.filter((likedUser) => likedUser._id !== userId))
                        setLikeCount((prev) => prev + 1)
                    } else {
                        setLikedUsers((prevLikedUsers) => [...prevLikedUsers, user])
                        setLikeCount((prev) => prev + 1)
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    const toggleLikedUsersPopup = () => {
        setShowLikedUsersPopup(!showLikedUsersPopup);
    };


    return (
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img onClick={() => setShowCommentModal(true)} className={`h-64 cursor-pointer w-full  ${isTransitioning ? "fadeOut" : "fadeIn"
                } ${isHovered ? "darken" : ""}`} src={images[currentImageIndex]} alt="images" />
            {isHovered && (
                <>
                    <div className="absolute top-5 left-4 ">
                        <Link to={user._id === post.userId._id ? "/profile" : `/users-profile/${post.userId._id}`} className="flex items-center space-x-1">
                            <img src={post.userId.profileImg} alt="user" className=" h-6 rounded-full" />
                            <div className="flex items-center">
                                <p className="text-gray-100 text-xs font-medium mx-1">
                                    {post.userId.name}
                                </p>
                                {post.userId?.isVerified && (
                                    <BadgeCheck size={15} color="white" fill="#7E3AF2" />
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className="absolute bottom-4 left-4 ">
                        <div className="flex flex-col top-10">
                            <p className="text-xs font-extralight text-gray-200">{post.description}</p>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <button onClick={() => handleLike(post._id, user._id)} className="flex justify-center items-center gap-2 px-2  rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                    <Heart
                                        color={isLikedByUser ? "#7E3AF2" : "gray"}
                                        fill={isLikedByUser ? "#7E3AF2" : "none"}
                                        size={22}
                                    />
                                </button>
                                <p onClick={toggleLikedUsersPopup} className="text-center cursor-context-menu text-white text-xs">
                                    {likedUsers.length} Likes
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <button onClick={() => setShowCommentModal(true)} className="flex justify-center items-center gap-2 px-2  rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                    <MessageSquareMore color="gray" size={22} />
                                </button>
                                {!post.hideComment && (
                                    <span onClick={toggleLikedUsersPopup} className=" cursor-pointer text-white text-center text-xs">
                                        {commentsCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showCommentModal && (
                <div className="addpost-popup z-50">
                    <div className="addpost-popup">
                        <ViewPost
                            post={post}
                        />
                        <div className="fixed right-10 top-10">
                            <button onClick={() => setShowCommentModal(false)} className="close-button me-5">
                                <X size={25} color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostGallery

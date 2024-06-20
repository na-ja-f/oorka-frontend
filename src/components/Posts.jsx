import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginSuccess, setPosts } from "../redux/reducers/authSlice";
import { Modal, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import { deletePost, likePost, getCommentsCount, savePost } from "../services/api/user/apiMethods";
import EditPost from "./EditPost";
import LikedUsers from "./LikedUsers";
import {
    BadgeCheck,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    EllipsisVertical,
    Heart,
    MessageSquareMore,
    X,
} from "lucide-react";
import ViewPost from './ViewPost'
import ReportModal from "./ReportModal";
import { BASE_URL } from '../constants/baseURL'
import { io } from "socket.io-client";



function Posts({ post }) {
    const dispatch = useDispatch();
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const userId = user._id || ""
    const [isOpen, setIsOpen] = useState(false)
    const [editPost, setEditPost] = useState(null)
    const [deletePostId, setDeletePostId] = useState(null)
    const [likedUsers, setLikedUsers] = useState(post.likes)
    const [isLikedByUser, setIsLikedByUser] = useState(
        post.likes.includes(userId) || post.likes.some((user) => user._id === userId)
    )
    const [likeCount, setLikeCount] = useState(post.likes.length)
    const [showLikedUserPopup, setShowLikedUserPopup] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [commentsCount, setCommentsCount] = useState(0)
    const [isSavedByUser, setIsSavedByUser] = useState(user?.savedPost.includes(post._id))
    const [reportModal, setReportModal] = useState(false)
    const [showCategory, setShowCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const socket = useRef();

    const images = post.imageUrl

    useEffect(() => {
        socket.current = io(BASE_URL)

        const postId = post._id
        getCommentsCount(postId)
            .then((response) => {
                setCommentsCount(response.data)
            })
            .catch((error) => {
                console.log(error.message);
            });
        console.log('user', user.savedPost);
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleEdit = () => {
        setEditPost(post)
    }

    const handleDelete = (postId, userId) => {
        try {
            deletePost({ postId, userId })
                .then((response) => {
                    const postData = response.data;
                    dispatch(setPosts({ posts: postData.posts }))
                    toast.info("post deleted")
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        } catch (error) {
            console.log(error.message);
        }
    }

    const confirmDeletePost = () => {
        if (deletePostId) {
            handleDelete(deletePostId, post?.userId?._id)
            toggleDropdown();
            setDeletePostId(null)
        }
    }

    const handleCancelEdit = () => {
        setEditPost(null)
    }

    const handleLike = (postId, userId, receiverId) => {
        try {
            console.log('s', receiverId);
            socket.current.emit("sendNotification", { receiverId, senderName: user?.name, message: "liked your post" })
            likePost({ postId, userId })
                .then((response) => {
                    const postData = response.data;
                    dispatch(setPosts({ posts: postData.posts }))
                    setIsLikedByUser(!isLikedByUser)
                    if (isLikedByUser) {
                        setLikedUsers((prevlikedUsers) => prevlikedUsers.filter((likedUser) => likedUser._id !== userId))
                        setLikeCount((prev) => prev - 1)
                    } else {
                        setLikedUsers((prevlikedUsers) => [...prevlikedUsers, user])
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

    const toggleLikedUserPopup = () => {
        setShowLikedUserPopup(!showLikedUserPopup)
    }

    const openReportModal = () => {
        setReportModal(true);
        toggleDropdown();
    };

    const closeReportModal = () => {
        setReportModal(false);
    };

    const handleSave = (postId, userId) => {
        try {
            let category = selectedCategory
            savePost({ postId, userId, category })
                .then((response) => {
                    const userData = response.data
                    dispatch(loginSuccess({ user: userData }))
                    setIsSavedByUser(!isSavedByUser)
                    handleShowCategory();
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleShowCategory = () => {
        setShowCategoryModal(!showCategory);
    }

    return (
        <>
            <div className="w-full lg:w-6/12 lg:col-span-2 lg:ms-96 pl-4 pt-4" id="posted">
                <div className="flex  flex-col ">
                    <div onDoubleClick={() => handleLike(post._id, user._id, post?.userId?._id)} className="bg-white border p-4 mb-1 rounded-lg max-w-full">
                        <div className="flex items-center justify-between mb-2">
                            <Link to={user._id === post?.userId?._id ? "/profile" : `/users-profile/${post?.userId?._id}`}
                                className="flex items-center">
                                <img src={post?.userId?.profileImg} alt="user" className="h-10 mr-2 rounded-full" />
                                <p className="text-gray-800 font-bold mx-1">
                                    {post?.userId?.name}
                                </p>
                                <BadgeCheck size={22} color="white" fill="#7E3AF2" />
                            </Link>
                            {/* <div className="flex items-center">

                                {post.userId?.isVerified && (
                                    <BadgeCheck size={22} color="white" fill="#7E3AF2" />
                                )}
                            </div> */}
                            <div className="text-gray-500 cursor-pointer">
                                <button className="hover:bg-gray-50 rounded-full"
                                    onClick={toggleDropdown}>
                                    <EllipsisVertical />
                                </button>
                                {isOpen && (
                                    <div className="absolute z-40 right-96 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                                        {post?.userId?._id === user._id && (
                                            <>
                                                <button className="block px-4 py-2 hover:bg-gray-100 w-40"
                                                    onClick={handleEdit}>
                                                    Edit
                                                </button>
                                                <button className="block px-4 py-2 hover:bg-gray-100 w-40"
                                                    onClick={() => setDeletePostId(post?._id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                        {user._id !== post.userId._id && (
                                            <button
                                                className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-40"
                                                onClick={() => openReportModal()}
                                            >
                                                Report
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4 w-full">
                            <div className="h-96">
                                <Carousel pauseOnHover slideInterval={5000} leftControl={<ChevronLeft color="white" />} rightControl={<ChevronRight color="white" />} >
                                    {images &&
                                        images.map((image, index) => (
                                            <img key={index} src={image} alt="description" />
                                        ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-black text-md">
                                <span className="font-bold mr-4">{post?.userId?.name}</span> "{post.description}"
                            </p>
                            <a href="" className="text-blue-600">
                                {post.hashtags}
                            </a>{" "}
                            <p className="text-gray-500 text-sm">
                                - {formatDistanceToNow(
                                    new Date(post.date),
                                    { addSuffix: true }
                                )}
                            </p>
                        </div>
                        {/* bottom section(likes and comments) */}
                        <div className="flex items-center justify-between text-gray-500">
                            <div className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                    <button onClick={() => handleLike(post._id, user._id, post?.userId?._id)} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                        <Heart color={isLikedByUser ? " #7E3AF2" : "gray"}
                                            fill={isLikedByUser ? " #7E3AF2" : "none"}
                                            size={22} />
                                    </button>
                                    {!post.hideLikes && (
                                        <span onClick={toggleLikedUserPopup} className=" cursor-pointer text-sm">
                                            {likeCount} Likes
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <button onClick={() => setShowCommentModal(true)} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                        <MessageSquareMore size={22} />
                                    </button >
                                    {!post.hideComment && (
                                        <span onClick={toggleLikedUserPopup} className=" cursor-pointer text-sm">
                                            {commentsCount}
                                        </span>
                                    )}

                                </div>
                                {isSavedByUser ? (
                                    <button onClick={() => handleSave(post._id, user._id)} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                        <Bookmark
                                            color="gray"
                                            fill="grey"
                                            size={22}
                                        />
                                    </button>
                                ) : (
                                    <button onClick={handleShowCategory} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                        <Bookmark
                                            color="gray"
                                            fill="none"
                                            size={22}
                                        />
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={deletePostId !== null}
                    size="sm"
                    onClose={() => setDeletePostId(null)}
                    popup>
                    <Modal.Body>
                        <div className="text-center p-3">
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete this post?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={confirmDeletePost}>
                                    Delete
                                </Button>
                                <Button onClick={() => setDeletePostId(null)}>Cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            {editPost && (
                <EditPost post={editPost} onCancelEdit={handleCancelEdit} />
            )}
            {showLikedUserPopup && (
                <LikedUsers likedUsers={likedUsers} onClose={toggleLikedUserPopup} />
            )}
            {showCommentModal && (
                <div className="addpost-popup z-50">
                    <div className="addpost-popup">
                        <ViewPost post={post} socket={socket} />
                        <div className="fixed right-10 top-10">
                            <button
                                className="close-button me-5"
                                onClick={() => setShowCommentModal(false)}
                            >
                                <X size={25} color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {reportModal && (
                <ReportModal
                    userId={userId}
                    postId={post._id}
                    openReportModal={openReportModal}
                    closeReportModal={closeReportModal}
                />
            )}
            {showCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                    <div className="max-w-md w-full mx-auto rounded-lg shadow-lg">
                        <div className="bg-white rounded-lg shadow-lg p-6 relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowCategoryModal(false)}
                            >
                                <X />
                            </button>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                Save Post Category
                            </h2>
                            {user?.savedPost.length > 0 ? (
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 font-medium mb-2"
                                        htmlFor="category"
                                    >
                                        Select Category
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        id="category"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Choose a category</option>
                                        {user?.savedPost.map(
                                            (Category, index) => (
                                                <option key={index} value={Category.category}>
                                                    {Category.category}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <button
                                        onClick={() => handleSave(post._id, user._id)}
                                        className="w-full px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
                                        type="button"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-gray-600 mb-4">
                                        You don't have any categories yet.
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigate("/saved-post");
                                        }}
                                        className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        type="button"
                                    >
                                        Create Category
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Posts

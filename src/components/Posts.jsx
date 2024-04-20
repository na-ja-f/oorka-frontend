import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginSuccess, setPosts } from "../redux/reducers/authSlice";
import { Modal, Button } from "flowbite-react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import { deletePost } from "../services/api/user/apiMethods";
import EditPost from "./EditPost";


function Posts({ post }) {
    const dispatch = useDispatch();
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)
    const userId = user._id || ""

    const [isOpen, setIsOpen] = useState(false)
    const [editPost, setEditPost] = useState(null)
    const [deletePostId, setDeletePostId] = useState(null)

    const images = post.imageUrl

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
            handleDelete(deletePostId, post.userId._id)
            toggleDropdown();
            setDeletePostId(null)
        }
    }

    const handleCancelEdit = () => {
        setEditPost(null)
    }

    return (
        <>
            <div className="lg:col-span-2 ms-96 w-12/12 pl-4 pt-4" id="posted">
                <div className="flex  flex-col ">
                    <div className="bg-white border p-4 mb-1 rounded-lg max-w-full">
                        <div className="flex items-center mb-2">
                            <img src={post.userId.profileImg} alt="user" className="h-10 mr-2 rounded-full" />
                            <p className="text-gray-800 font-bold mx-1">
                                {post.userId.name}
                            </p>
                            <div className="flex items-center">

                                {post.userId?.isVerified && <svg
                                    viewBox="0 0 22 22"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                >
                                    <path
                                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                        fill="#1d9bf0"
                                    ></path>
                                </svg>}
                            </div>
                            <div style={{ marginLeft: "470px" }} className="text-gray-500 cursor-pointer">
                                <button className="hover:bg-gray-50 rounded-full p-1"
                                    onClick={toggleDropdown}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="7" r="1" />
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="17" r="1" />
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div className="absolute z-40 right-96 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                                        {post.userId._id === user._id && (
                                            <>
                                                <button className="block px-4 py-2 hover:bg-gray-100 w-40"
                                                    onClick={handleEdit}>
                                                    Edit
                                                </button>
                                                <button className="block px-4 py-2 hover:bg-gray-100 w-40"
                                                    onClick={() => setDeletePostId(post._id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4 " style={{ width: "620px" }}>
                            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                                <Carousel pauseOnHover slideInterval={5000}>
                                    {images &&
                                        images.map((image) => (
                                            <img src={image} alt="description" />
                                        ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-black text-md">
                            <span className="font-bold mr-4">{post.userId.name}</span> "{post.description}"
                            </p>
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
                                    <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                        <svg
                                            className="w-7 h-7 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                            />
                                        </svg>
                                    </button>
                                    <span className=" cursor-pointer text-sm">
                                        10 Likes
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                        <svg
                                            className="w-7 h-7 text-gray-500 "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                                            />
                                        </svg>
                                    </button >
                                    <span className=" cursor-pointer text-sm">
                                        10 comments
                                    </span>
                                </div>
                                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105">
                                    <svg
                                        className="w-7 h-7 text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                                        />
                                    </svg>
                                </button>
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
        </>
    )
}

export default Posts

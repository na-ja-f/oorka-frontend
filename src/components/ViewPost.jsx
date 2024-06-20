import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "flowbite-react";
import { toast } from "sonner";
import { BadgeCheck, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Modal } from "flowbite-react";
import LikedUsers from "./LikedUsers";
import { addComment, deleteComment, getComments, replyComment } from "../services/api/user/apiMethods";

function ViewPost({ post, socket }) {
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id || ""

    const [showLikedUserPopup, setShowLikedUserPopup] = useState(false)
    const [comments, setComments] = useState([])
    const [replyComments, setReplyComments] = useState(false)
    const [parentCommentId, setParentCommentId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const commentBoxRef = useRef()

    useEffect(() => {
        const postId = post._id
        getComments(postId)
            .then((response) => {
                const commentData = response.data.comments;
                setComments(commentData)
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            });
    }, [post._id])

    useEffect(() => {
        if (commentBoxRef.current) {
            commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
        }
    }, [comments, replyComments])

    const toggleLikedUserPopup = () => {
        setShowLikedUserPopup(!showLikedUserPopup)
    }

    const handleReplyComments = (commentId) => {
        setReplyComments(true)
        setParentCommentId(commentId)
    }

    const handleCancelReplyComments = () => {
        setReplyComments(false)
        setParentCommentId("")
    }

    const handleDeleteComments = (commentId) => {
        deleteComment(commentId)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    const commentData = data.comments;
                    setComments(commentData)
                    toast.error(data.message)
                } else {
                    toast.error(data.message)
                }
            })
            .catch((error) => {
                console.log(error?.message);
                toast.error("An error occurred. Please try again.");
            });
    }

    const commentInitialValues = {
        comment: ""
    }

    const commentValidationSchema = Yup.object({
        comment: Yup.string().required("comment is requires")
    })

    const commentHandleSubmit = (values, { resetForm }) => {
        try {
            const commentData = {
                postId: post._id,
                userId: userId,
                comment: values.comment
            }

            socket.current.emit("sendNotification", { receiverId:post.userId._id, senderName: user?.name, message: "commented on your post" })

            addComment(commentData)
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200) {
                        const commentData = data.comments;
                        setComments(commentData);
                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                })
                .catch((error) => {
                    console.log(error?.message);
                    toast.error("An error occurred. Please try again.");
                });

            resetForm();
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }

    const ReplyCommentHandleSubmit = (values, { resetForm }) => {
        try {
            const commentData = {
                commentId: parentCommentId,
                userId: userId,
                replyComment: values.comment,
            }

            replyComment(commentData)
                .then((response) => {
                    const data = response.data
                    if (response.status === 200) {
                        const commentData = data.comments;
                        setComments(commentData)
                        toast.success(data.message)
                    } else {
                        toast.error(data.message)
                    }
                })
                .catch((error) => {
                    console.log(error?.message);
                    toast.error("An error occurred. Please try again.");
                });
            setReplyComments(false)
            resetForm()
        } catch (error) {
            console.error("error submitting comment", error)
        }
    }

    return (
        <div className="bg-white overflow-hidden z-50 w-full shadow-none" style={{ width: "1000px" }}>
            <div className="grid grid-cols-3 min-w-full ">
                <div className=" col-span-2  w-full h-full">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel
                            pauseOnHover
                            slideInterval={5000}
                            leftControl={<ChevronLeft color="white" />}
                            rightControl={<ChevronRight color="white" />}
                        >
                            {post.imageUrl &&
                                post.imageUrl.map((image) => (
                                    <img className=" " src={image} alt="Description" />
                                ))}
                        </Carousel>
                    </div>
                </div>
                <div className="col-span-1 relative pl-4">
                    <header className="border-b border-grey-400">
                        <a href="#" className="cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                            <img src={post.userId.profileImg} alt="user" className="h-9 w-9 rounded-full object-cover" />
                            <div className="flex items-center">
                                <p className="block ml-2 font-bold mx-1">{post.userId.name}</p>
                                {post.userId.isVerified && (
                                    <BadgeCheck size={22} color="white" fill="#9333ea" />
                                )}
                            </div>
                        </a>
                    </header>
                    {post.hideComment && (
                        <div className="home-scroll-post">
                            <div className="home-scrollbox-post flex items-center justify-center">
                                <div>
                                    <h1 className="text-md font-semibold">
                                        Comments are hidden.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                    {!post.hideComment && (
                        <>
                            <div className="home-scroll-post">
                                <div ref={commentBoxRef} className="home-scrollbox-post">
                                    {comments.map((comment) => (
                                        <div key={comment._id}>
                                            <div className="mb-6">
                                                <div className="flex justify-between items-center me-4 ">
                                                    <img src={comment.userId.profileImg} alt="profile" className="h-9 rounded-full" />
                                                    <div className="w-full flex">
                                                        <p className="text-xs mx-3 font-semibold text-black">
                                                            {comment.userId.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400" style={{ fontSize: "9px" }}>
                                                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                        </p>
                                                    </div>
                                                    <div className="flex">
                                                        <button onClick={() => handleReplyComments(comment._id)} style={{ fontSize: "10px" }} className="text-xs text-purple-600 flex">
                                                            Reply
                                                        </button>
                                                        {user.name === comment.userId.name && (
                                                            <button onClick={() => {
                                                                setOpenModal(true);
                                                                setParentCommentId(comment._id);
                                                            }} className="ms-2">
                                                                <Trash2 color="gray" size={10} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Nested reply comments */}
                                            {comment?.replyComments.map((reply) => (
                                                <div key={reply._id} className="ms-10 mb-6 reply-commment">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center ">
                                                            <img src={reply.userId.profileImg} alt="profile" className="h-9 rounded-full mb-3" />
                                                            <div className="w-full flex mb-2">
                                                                <p className="text-xs mx-3 mb-2 font-semibold text-black">
                                                                    {reply.userId.name}
                                                                </p>
                                                                <p className="text-xs text-gray-400" style={{ fontSize: "9px" }}>
                                                                    {reply.timestamp ? formatDistanceToNow(new Date(reply.timestamp), { addSuffix: true }) : 'Invalid Timestamp'}

                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-800 mx-3">
                                                            {reply.replyComment}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {replyComments && (
                                <Formik
                                    initialValues={commentInitialValues}
                                    validationSchema={commentValidationSchema}
                                    onSubmit={ReplyCommentHandleSubmit}
                                >
                                    <Form>
                                        <div className="w-full items-center absolute bottom-0 pe-6 bg-white h-20">
                                            <div>
                                                <p className="text-xs font-bold mb-1">
                                                    @{user.username}
                                                </p>
                                            </div>
                                            <div className="flex">
                                                <Field className="w-full ps-3 border-gray-200 border  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600   rounded-md text-xs resize-none outline-none appearance-none"
                                                    aria-label="post your comments..."
                                                    placeholder="post your comments..."
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    style={{ height: "36px" }}
                                                    name="comment" />
                                                <button type="submit" className="mx-4 text-xs  focus:outline-none border-none bg-transparent text-purple-600">
                                                    Reply
                                                </button>
                                                <button onClick={handleCancelReplyComments} className="text-xs text-red-700 me-3">
                                                    cancel
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            )}
                            {!replyComments && (
                                <Formik
                                    initialValues={commentInitialValues}
                                    validationSchema={commentValidationSchema}
                                    onSubmit={commentHandleSubmit}>
                                    <Form>
                                        <div className="w-full flex items-center absolute bottom-0 pe-6 bg-white h-14">
                                            <Field
                                                className="w-full ps-3 border-gray-200 border  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600   rounded-md text-xs resize-none outline-none appearance-none"
                                                aria-label="post your comments..."
                                                placeholder="post your comments..."
                                                autoComplete="off"
                                                autoCorrect="off"
                                                style={{ height: "36px" }}
                                                name="comment"
                                            />
                                            <button type="submit" className="mx-2 text-xs  focus:outline-none border-none bg-transparent text-purple-600">
                                                Comment
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            )}
                        </>
                    )}
                </div>
            </div>
            {showLikedUserPopup && (
                <LikedUsers likedUsers={post.likes} onClose={toggleLikedUserPopup} />
            )}
            <Modal
                show={openModal}
                size='md'
                onClose={() => setOpenModal(false)}
                popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-xs font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this this comment?
                        </h3>
                        <div className="flex justify-center gap-4 ">
                            <button className="text-xs flex gap-1 text-purple-600 font-semibold border px-2 py-1 rounded-md border-purple-600"
                                onClick={() => {
                                    setOpenModal(false)
                                    handleDeleteComments(parentCommentId)
                                    setParentCommentId("")
                                }}>
                                Yes
                            </button>{" "}
                            <button className="text-xs border px-4 py-1 rounded-md border-gray-600" onClick={() => setOpenModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ViewPost

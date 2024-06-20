import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useSelector } from "react-redux";
import { Smile } from "lucide-react";
import { addMessage, addConversation } from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { BASE_URL } from '../../constants/baseURL'



function ViewStory({ story, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const numStories = story.stories.length;
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const socket = useRef();
    useEffect(() => {
        socket.current = io(BASE_URL)
    }, [])

    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)


    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? numStories - 1 : prevIndex - 1
        );
        updateProgress();
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % numStories);
        setProgress(0);
    };

    const updateProgress = () => {
        setProgress(0);
    };

    useEffect(() => {
        const incrementValue = 100 / (15 * 1000 / 300);
        const timer = setTimeout(() => {
            if (progress >= 100) {
                handleNextClick();
            } else {
                setProgress((prevProgress) =>
                    prevProgress + incrementValue
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [progress]);

    useEffect(() => {
        const timer = setTimeout(handleNextClick, 15000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === numStories) {
            onClose();
        }
    }, [currentIndex, numStories, onClose]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(null);
        }
    };

    const handleSubmit = (file) => {
        const formData = new FormData();
        const userId = user._id;
        const receiver = story.userId._id
        let messageType = "text";

        addConversation({ senderId: userId, receiverId: receiver })
            .then((response) => {
                const userData = response.data;
                // Add other message details to FormData
                formData.append("conversationId", userData._id);
                formData.append("sender", userId);
                formData.append("text", newMessage);
                formData.append("messageType", messageType);

                const receiverId = receiver

                socket.current.emit("sendMessage", {
                    senderId: userId,
                    receiverId,
                    text: newMessage,
                    messageType,
                    file: file?.name,
                });

                socket.current.emit("sendStoryReply", {
                    senderId: userId,
                    senderName: user.name,
                    receiverId,
                    text: newMessage,
                    // messageType,
                    // file: file?.name,
                });


                addMessage(formData)
                    .then((response) => {
                        toast.info("message has been sent");
                        setNewMessage("");
                    })
                    .catch((error) => {
                        console.error("Error sending message:", error);
                    });
            })
    };

    return (
        <div onClick={() => setShowEmojiPicker(false)} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="rounded-lg relative">
                <button
                    className="absolute z-50 top-8 right-2 text-gray-900"
                    onClick={onClose}
                >
                    <X color="white" />
                </button>
                <div className="flex left-3 absolute z-50 top-7 items-center">
                    <img
                        src={story.userId.profileImg}
                        alt="User Avatar"
                        className="h-9 w-9 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-100 font-medium">{story.userId.name}</span>
                </div>
                <div className="relative">
                    <div className="h-1 flex gap-2 w-full rounded-lg mb-2">
                        {Array.from({ length: numStories }).map((_, index) => (
                            <div
                                className="w-full rounded-lg h-1"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                    transition: "width 0.3s ease-in-out",
                                }}
                            >
                                <div
                                    key={index}
                                    className={`bg-gray-300 h-1 rounded-lg`}
                                    style={{
                                        width: `${currentIndex === index
                                            ? progress
                                            : index < currentIndex
                                                ? "100%"
                                                : "0"
                                            }%`,
                                        marginLeft: `${index !== 0 ? 1 : 0}%`,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    {story.stories[currentIndex]?.isVideo === true ? (
                        <video
                            src={story.stories[currentIndex].imageUrl}
                            alt="Story"
                            className="rounded-lg bg-black"
                            style={{ width: "400px", height: "550px" }}
                            autoPlay
                            loop
                        />
                    ) : (
                        < img
                            src={story.stories[currentIndex].imageUrl}
                            alt="Story"
                            className="rounded-lg"
                            style={{ width: "400px", height: "550px" }}
                        />
                    )
                    }

                    <div className="absolute top-2/4 left-0 transform -translate-y-2/4 w-full flex justify-between">
                        <button
                            onClick={handlePrevClick}
                            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextClick}
                            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {story.userId._id !== user._id &&
                <div className="absolute bottom-20 p-1 rounded-lg items-center bg-transparent" style={{ width: '410px' }}>
                    <div className="relative w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="w-full">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <button
                                    type="button"
                                    className="p-1 focus:outline-none focus:shadow-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEmojiPicker(!showEmojiPicker);
                                    }}
                                >
                                    <Smile size={18} />
                                </button>
                            </span>
                            <input
                                type="text"
                                value={newMessage}
                                className="w-full items-center h-12 pl-10 pr-4 text-xs border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600 transition-colors duration-300"
                                placeholder="Type your message..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        {showEmojiPicker && (
                            <div className="absolute bottom-12 left-0">
                                <Picker
                                    data={data}
                                    onEmojiSelect={(emoji) => {
                                        setNewMessage((prevMessage) => prevMessage + emoji.native);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )


}

export default ViewStory

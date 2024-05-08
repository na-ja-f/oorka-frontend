import { Image, Paperclip, SendHorizonal, Smile, Video, Search, Menu } from "lucide-react";
import '../../styles/Chat.css'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { addMessage, getUserMessages, setMessageRead } from "../../services/api/user/apiMethods";
import SendedChat from "./SendedChat";
import RecievedChat from "./RecievedChat";
import VoiceRecorder from "./VoiceRecorder";




function Messages({
    messages,
    setMessages,
    user,
    currentChat,
    socket,
    onlineUsers,
}) {
    const [newMessage, setNewMessage] = useState("");
    const [friend, setFriend] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false)
    const scrollRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const friend = currentChat?.members.find((m) => m._id !== user._id);
        setIsOnline(() => {
            if (onlineUsers.find((user) => user.userId === friend?._id)) {
                return true;
            } else {
                return false;
            }
        });
        setFriend(friend);
        const currentChatId = currentChat?._id;
        getUserMessages(currentChatId).then((response) => {
            setMessages(response.data);
        });
    }, [currentChat]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        setMessageRead({ conversationId: currentChat._id, userId: user._id });
    }, [socket]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(null);
        }
    };

    const handleSubmit = (file) => {
        const formData = new FormData();
        const currentChatId = currentChat?._id;
        const userId = user._id;
        const receiver = currentChat.members.find(
            (member) => member._id !== user._id
        );

        let messageType = "";

        if (file) {
            if (file.type.startsWith("image/")) {
                messageType = "image";
            } else if (file.type.startsWith("video/")) {
                messageType = "video";
            } else if (file.type.startsWith("audio/")) {
                messageType = "audio";
            }
            formData.append("file", file);
            setNewMessage(messageType);
        } else {
            messageType = "text";
        }

        // Add other message details to FormData
        formData.append("conversationId", currentChatId);
        formData.append("sender", userId);
        formData.append("text", newMessage);
        formData.append("messageType", messageType);

        const receiverId = receiver ? receiver._id : null;
        socket.current.emit("sendMessage", {
            senderId: userId,
            receiverId,
            text: newMessage,
            messageType,
            file: file?.name,
        });

        // Send FormData with file and other message details
        addMessage(formData)
            .then((response) => {
                toast.info("message has been sent");
                setNewMessage("");
                setMessages([...messages, response.data]);
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    };

    const handleImageClick = () => {
        const fileInput = document.getElementById("image");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleVidoClick = () => {
        const fileInput = document.getElementById("video");
        if (fileInput) {
            fileInput.click();
        }
    };

    const addAudioElement = async (blob) => {
        setIsRecording(false)
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);

        const audioFile = new File([blob], `${Date.now()}+audio.mp3`, {
            type: "audio/mpeg",
        });
        handleSubmit(audioFile);
    };

    const togglePinDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    function randomID(len) {
        let result = "";
        if (result) return result;
        const chars =
            "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
            maxPos = chars.length;
        len = len || 5;
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }

    const handleVideoCall = () => {
        const roomId = randomID(10);
        const recieverId = friend?._id;
        console.log(recieverId + "recieverId");
        const emitData = {
            senderId: user._id,
            senderName: user.name,
            senderProfile: user.profileImg,
            recieverId,
            roomId: roomId,
        };

        socket.current.emit("videoCallRequest", emitData);

        navigate(`/video-call/${roomId}/${user._id}`);
    };



    return (
        <div className="relative flex flex-col flex-1">
            <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
                <div
                    className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
                    style={{
                        backgroundImage: `url(${friend?.profileImg})`,
                    }}
                ></div>
                <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
                    <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">
                        {friend?.name}
                    </div>
                    {isOnline && (
                        <div className="overflow-hidden text-xs text-purple-600  leading-tight  whitespace-no-wrap">
                            Online
                        </div>
                    )}
                </div>
                <button
                    onClick={handleVideoCall}
                    className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300"
                >
                    <Video />
                </button>
                <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
                    <Search />
                </button>
                <button
                    type="button"
                    className="flex self-center p-2 ml-2 text-gray-500 rounded-full md:block focus:outline-none hover:text-gray-600 hover:bg-gray-300"
                >
                    <Menu />
                </button>
            </div>
            <div className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-auto bg-transparent bg-bottom bg-cover ">
                <div onClick={() => setShowEmojiPicker(false)} className="chat-scrollbox">
                    <div className="chat-scroll" ref={scrollRef}>
                        <div className="self-center flex-1 w-full ">
                            <div className="relative flex flex-col px-3 py-1 m-auto w-full">
                                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                                    Channel was created
                                </div>
                                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                                    {currentChat?.createdAt &&
                                        new Date(currentChat.createdAt).toLocaleDateString()}
                                </div>
                                {messages.length !== 0 &&
                                    messages.map((message, index) => {
                                        return message?.sender._id === user._id || message?.sender === user._id ? (
                                            <div key={index} className="self-end w-3/4 my-2">
                                                <SendedChat message={message} />
                                            </div>
                                        ) : (
                                            <div key={index} className="self-start w-3/4 my-2">
                                                <RecievedChat message={message} />
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                    <div className="w-full">
                        <input
                            type="file"
                            name="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    setImage(file);
                                    console.log(image);
                                    handleSubmit(file);
                                }
                            }}
                            hidden
                        />
                        <input
                            type="file"
                            name="file"
                            id="video"
                            accept="video/*"
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    setVideo(file);
                                    console.log(video);
                                    handleSubmit(file);
                                }
                            }}
                            hidden
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                            <button
                                type="button"
                                className="p-1 focus:outline-none focus:shadow-none"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <Smile size={18} />
                            </button>
                        </span>
                        {isDropdownOpen && (
                            <div className="z-50 transition-opacity duration-300">
                                <span className="absolute inset-y-0 right-24 flex items-center pr-6">
                                    <button
                                        onClick={handleVidoClick}
                                        type="submit"
                                        className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                                    >
                                        <Video
                                            className="size-5 lg:size-6 mr-3 md:mt-1 mt-1 ml-2  "
                                            size={18}
                                            color="purple"
                                        />
                                    </button>
                                </span>
                                <span className="absolute inset-y-0 right-16 flex items-center pr-6">
                                    <button
                                        onClick={handleImageClick}
                                        type="submit"
                                        className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                                    >
                                        <Image
                                            className="size-5 lg:size-6 mr-3 md:mt-1 mt-1 ml-2  "
                                            size={18}
                                            color="purple"
                                        />
                                    </button>
                                </span>
                            </div>
                        )}
                        {!newMessage.length && (
                            <>
                                <span onClick={() => setIsRecording(true)} className="absolute right-1 flex items-center">
                                    <VoiceRecorder
                                        onRecordingComplete={addAudioElement}
                                        setRecordedAudioBlob={setRecordedAudioBlob}
                                        style={{ background: "none ", borderRadius: 0 }}
                                    />
                                </span>
                                {!isRecording && (
                                    <span className="absolute inset-y-0 right-10 flex items-center ">
                                        <button
                                            onClick={togglePinDropdown}
                                            type="submit"
                                            className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                                        >
                                            <Paperclip
                                                className="size-5 lg:size-6 mr-3 md:mt-1 mt-4 ml-2  "
                                                size={18}
                                                color="purple"
                                            />
                                        </button>
                                    </span>
                                )}
                            </>
                        )}
                        {newMessage.length > 0 && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                                <button
                                    onClick={() => handleSubmit(null)}
                                    type="submit"
                                    className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                                >
                                    <SendHorizonal size={18} color="purple" />
                                </button>
                            </span>
                        )}
                        <input
                            type="text"
                            value={newMessage}
                            className="w-full items-center h-10 pl-10 pr-4  bg-white  text-xs border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600 transition-colors duration-300"
                            placeholder="Type your message..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </div>
                {showEmojiPicker && (
                    <Picker
                        data={data}
                        onEmojiSelect={(emoji) => {
                            setNewMessage((prevMessage) => prevMessage + emoji.native);
                        }}
                        style={{
                            position: "fixed",
                            bottom: "500px",
                            right: "10px",
                            backgroundColor: "white",
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default Messages

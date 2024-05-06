import { Image, Paperclip, SendHorizonal, Smile, Video, VideoIcon, Search, MenuIcon } from "lucide-react";
import RecievedChat from "./RecievedChat";
import SendedChat from "./SendedChat";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "./VoiceRecorder";
import { addGroupMessage, getGroupMessages } from "../../services/api/user/apiMethods";


function GroupMessages({ messages, setMessages, user, currentChat, socket }) {
    const navigate = useNavigate();

    const [newMessage, setNewMessage] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const currentChatId = currentChat?._id;
        getGroupMessages(currentChatId).then((response) => {
            console.log(response.data);
            setMessages(response.data);
        });
    }, [currentChat]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const togglePinDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(null);
        }
    };

    const handleSubmit = (file) => {
        const formData = new FormData();
        const group_id = currentChat?._id;
        const userId = user._id;

        let messageType = "";

        if (file) {
            if (file.type.startsWith("image/")) {
                messageType = "image";
            } else if (file.type.startsWith("video/")) {
                messageType = "video";
            } else if (file.type.startsWith('audio/')) {
                messageType = 'audio';
            }
            formData.append("file", file);
            setNewMessage(messageType);
        } else {
            messageType = "text";
        }

        formData.append("groupId", group_id);
        formData.append("sender", userId);
        formData.append("text", newMessage);
        formData.append("messageType", messageType);

        const data = {
            group_id,
            sender_id: userId,
            content: newMessage,
            messageType,
            file: file?.name,
            lastUpdate: Date.now(),
        };

        socket.current.emit("GroupMessage", data);
        addGroupMessage(formData).then(() => {
            setNewMessage("");
        });
    };

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);

        const audioFile = new File([blob], `${Date.now()}+audio.mp3`, { type: "audio/mpeg" });
        handleSubmit(audioFile);

    };


    const handleImageClick = () => {
        const fileInput = document.getElementById("image");
        if (fileInput) {
            console.log("Image Click");
            fileInput.click();
        }
    };

    const handleVideoClick = () => {
        const fileInput = document.getElementById("video");
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className="relative flex flex-col flex-1">
            <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
                <div
                    className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
                    style={{
                        backgroundImage: `url(${currentChat?.profile})`,
                    }}
                ></div>
                <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
                    <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">
                        {currentChat?.name}
                    </div>
                </div>

                <button
                    onClick=''
                    className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300"
                >
                    <Video />
                </button>
                <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
                    <Search />
                </button>
                <button
                    type="button"
                    className="flex self-center hidden p-2 ml-2 text-gray-500 rounded-full md:block focus:outline-none hover:text-gray-600 hover:bg-gray-300"
                >
                    <svg
                        className="w-6 h-6 text-gray-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="nonzero"
                            d="M12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z M12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 Z"
                        />
                    </svg>
                </button>
                <button className="p-2 text-gray-700 flex self-center rounded-full md:hidden focus:outline-none hover:text-gray-600 hover:bg-gray-200">
                    <MenuIcon />
                </button>
            </div>
            <div className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-auto bg-transparent bg-bottom bg-cover ">
                <div className="chat-scrollbox">
                    <div className="chat-scroll" ref={scrollRef}>
                        <div className="self-center flex-1 w-full ">
                            <div className="relative flex flex-col px-3 py-1 m-auto w-full">
                                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                                    Group was created
                                </div>
                                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                                    {currentChat?.created_at && new Date(currentChat.created_at).toLocaleDateString()}
                                </div>
                                {messages.length !== 0 &&
                                    messages.map((message) => {
                                        return message?.sender._id === user._id ||
                                            message?.sender === user._id ? (
                                            <div key={message?._id} className="self-end w-3/4 my-2">
                                                <SendedChat message={message} />
                                            </div>
                                        ) : (
                                            <div key={message?._id} className="self-start w-3/4 my-2">
                                                <RecievedChat message={message} />
                                            </div>
                                        );
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
                                        onClick={handleVideoClick}
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
                                <span className="absolute  right-1 flex items-center">
                                    <VoiceRecorder
                                        onRecordingComplete={addAudioElement}
                                        setRecordedAudioBlob={setRecordedAudioBlob}
                                    />
                                </span>

                                <span className="absolute inset-y-0 right-7 flex items-center pr-6">
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

export default GroupMessages

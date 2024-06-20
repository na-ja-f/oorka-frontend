import '../styles/Chat.css'
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from '../constants/baseURL'
import { useLocation, useNavigate } from "react-router-dom";
import {
    getUserDetails,
    addConversation,
    getUserConversations,
    getUserGroups,
    getLastMessages,
    getLastGroupMessages
} from '../services/api/user/apiMethods';
import ChatUsers from '../components/chatComponents/ChatUsers';
import Messages from "../components/chatComponents/Messages";
import NochatScreen from '../components/chatComponents/NoChatScreen'
import GroupMessages from "../components/chatComponents/GroupMessages";
import VideoCallModal from '../components/chatComponents/VideoCallModal';
import GroupVideoCallModal from '../components/chatComponents/GroupVideoCallModal';



function Chat() {
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id;

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const messageUserId = queryParams.get("userId")

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [lastMessages, setLastMessages] = useState([]);
    const [lastGroupMessages, setLastGroupMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [groupArrivalMessage, setGroupArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const [isGroup, setIsGroup] = useState(false);
    const [joinVideoCall, setJoinVideoCall] = useState(false);
    const [joinGroupVideoCall, setJoinGroupVideoCall] = useState(false);
    const [videoCallJoinRoomId, setVideoCallJoinRoomId] = useState('');
    const [callRequestedUser, setCallRequestedUser] = useState({ name: '', profile: '' })
    const socket = useRef();

    useEffect(() => {
        socket.current = io(BASE_URL)

        if (messageUserId) {
            console.log("message user", messageUserId);
            addConversation({ senderId: userId, receiverId: messageUserId })
                .then((response) => {
                    const userData = response.data;
                    const existChat = conversations.filter((con) => con._id === userData._id);
                    if (!existChat.length) {
                        setConversations((prev) => [...prev, userData]);
                    }
                    setCurrentChat(userData);
                })
        }

        getUserConversations(userId).then((response) => {
            setConversations(response.data);
        });

        getUserGroups(userId).then((response) => {
            setUserGroups(response.data);
        });

        getLastMessages().then((response) => {
            setLastMessages(response.data);
        })
        getLastMessage();

        socket.current.on("getMessage", (data) => {
            const senderId = data.senderId;
            getLastMessage();
            getUserDetails(senderId).then((response) => {
                setArrivalMessage({
                    sender: response.data.user,
                    text: data.text,
                    attachment: {
                        type: data.messageType,
                        filename: data.file
                    },
                    createdAt: Date.now(),
                });
            });
        })

        getGroupMessages();
    }, [])

    useEffect(() => {
        if (isGroup) {
            const emitData = {
                group_id: currentChat._id,
                userId: userId,
            };
            socket.current.emit("joinGroup", emitData);
            socket.current.on("joinGroupResponse", (message) => {
                console.log(message);
            });
        }
    }, [socket, currentChat]);

    useEffect(() => {
        (arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender)) ||
            (currentChat?.members.find(
                (member) => member._id !== arrivalMessage?.sender
            ) &&
                setMessages((prev) => [...prev, arrivalMessage]));
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        groupArrivalMessage &&
            currentChat?._id == groupArrivalMessage.group &&
            setMessages((prev) => [...prev, groupArrivalMessage]);
    }, [groupArrivalMessage, currentChat]);

    useEffect(() => {
        socket?.current?.emit("addUser", user._id);
        socket?.current?.on("getUsers", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    useEffect(() => {
        socket.current.on("videoCallResponse", (data) => {
            setVideoCallJoinRoomId(data.roomId);
            setCallRequestedUser({ name: data.senderName, profile: data.senderProfile });
            setJoinVideoCall(true);
        })

        socket.current.on("GroupVideoCallResponse", (data) => {
            setVideoCallJoinRoomId(data.roomId)
            setCallRequestedUser({ name: data.groupName, profile: data.groupProfile });
            setJoinGroupVideoCall(true)
        })
    }, [socket]);

    const getLastMessage = () => {
        getLastGroupMessages().then((response) => {
            setLastGroupMessages(response.data)
        })

    }

    const getGroupMessages = () => {
        socket.current.on("responseGroupMessage", (data) => {
            const senderId = data.sender_id;
            getUserDetails(senderId).then((response) => {
                const newGroupMessage = {
                    group: data.group_id,
                    sender: response.data.user,
                    text: data.content,
                    attachment: {
                        type: data.messageType,
                        filename: data.file
                    },
                    createdAt: Date.now(),
                };
                console.log(newGroupMessage);
                setGroupArrivalMessage(newGroupMessage);
            });
        });
    };

    const handleJoinVidoCallRoom = () => {
        navigate(`/video-call/${videoCallJoinRoomId}/${userId}`);
    }

    const handleJoinGroupVidoCallRoom = () => {
        navigate(`/group-video-call/${videoCallJoinRoomId}/${userId}`);
    }
    


    return (
        <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
            <ChatUsers
                conversations={conversations}
                user={user}
                setCurrentChat={setCurrentChat}
                onlineUsers={onlineUsers}
                userGroups={userGroups}
                isGroup={isGroup}
                setIsGroup={setIsGroup}
                setUserGroups={setUserGroups}
                setConversations={setConversations}
                lastMessages={lastMessages}
                lastGroupMessages={lastGroupMessages}
                currentChat={currentChat}
            />
            {
                !isGroup && currentChat && (
                    <Messages
                        messages={messages}
                        setMessages={setMessages}
                        user={user}
                        currentChat={currentChat}
                        socket={socket}
                        onlineUsers={onlineUsers}
                    />
                )
            }
            {!currentChat && (
                <NochatScreen />
            )}
            {isGroup && currentChat && (
                <GroupMessages
                    messages={messages}
                    setMessages={setMessages}
                    user={user}
                    currentChat={currentChat}
                    socket={socket}
                    userGroups={userGroups}
                />
            )}
            {joinVideoCall &&
                <VideoCallModal
                    show={joinVideoCall}
                    onHide={() => setJoinVideoCall(false)}
                    onAccept={handleJoinVidoCallRoom}
                    onReject={() => {
                        setVideoCallJoinRoomId('');
                        setJoinVideoCall(false);
                    }}
                    caller={callRequestedUser}
                />
            }
            {joinGroupVideoCall &&
                <GroupVideoCallModal
                    show={joinGroupVideoCall}
                    onHide={() => setJoinGroupVideoCall(false)}
                    onAccept={handleJoinGroupVidoCallRoom}
                    onReject={() => {
                        setVideoCallJoinRoomId('');
                        setJoinGroupVideoCall(false);
                    }}
                    caller={callRequestedUser}
                />

            }
        </div>
    )
}

export default Chat

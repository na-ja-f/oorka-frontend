import { useEffect, useRef, useState } from "react";
import { Home, MessageSquarePlus, PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getChatEligibleUsers } from "../../services/api/user/apiMethods";
import Friend from "./Friend";
import Group from "./Group";
import AddGroup from "./AddGroup";
import MessageUsersModal from "./MessageUsersModal";


function ChatUsers({
    conversations,
    user,
    setCurrentChat,
    onlineUsers,
    userGroups,
    isGroup,
    setIsGroup,
    setUserGroups,
    currentChat,
    setConversations,
    lastMessages,
    lastGroupMessages }) {

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const emailInputRef = useRef(null);
    const [chatEligibleUsers, setChatEligibleUsers] = useState([]);
    const [messageUsersModal, setMessageUsersModal] = useState(false);

    useEffect(() => {
        const userId = user._id;
        getChatEligibleUsers({ userId: userId })
            .then((response) => {
                setChatEligibleUsers(response.data.users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className={`${currentChat ? "hidden" : "block"
            } lg:bock relative flex flex-col  h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out`}
            style={{ width: "24rem" }}>
            <div className="flex justify-between px-3 pt-1 text-white">
                <div className="flex items-center w-full py-2">
                    <button
                        onClick={() => navigate("/")}
                        aria-haspopup="true"
                        className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200"
                    >
                        <Home />
                    </button>
                    <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <button
                                type="submit"
                                className="p-1 focus:outline-none focus:shadow-none"
                            >
                                <Search />
                            </button>
                        </span>
                        <input
                            type="search"
                            name="q"
                            className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                            style={{ borderRadius: "25px" }}
                            placeholder="Search..."
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <div className="border-b shadow-bot">
                <ul className="flex flex-row items-center px-2 list-none select-none">
                    <li onClick={() => setIsGroup(false)} className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
                        <a className={`flex items-center justify-center py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 ${!isGroup ? "border-purple-500" : "border-transparent"}`}>
                            All
                        </a>
                    </li>
                    <li onClick={() => setIsGroup(true)} className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
                        <a className={`flex items-center justify-center py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 ${isGroup ? "border-purple-500" : "border-transparent"}`}>
                            Groups
                        </a>
                    </li>
                </ul>
            </div>
            <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
                <ul className="flex flex-col w-full h-screen px-2 select-none">
                    {!isGroup && conversations && !conversations?.isGroup &&
                        conversations.map((conversation) => (
                            <div onClick={() => setCurrentChat(conversation)}>
                                <Friend
                                    CurrentUser={user}
                                    conversation={conversation}
                                    onlineUsers={onlineUsers}
                                    lastMessages={lastMessages} />
                            </div>
                        ))}
                    {isGroup && userGroups &&
                        userGroups.map((group) => (
                            <div onClick={() => setCurrentChat(group)}>
                                <Group
                                    CurrentUser={user}
                                    group={group}
                                    onlineUsers={onlineUsers}
                                    lastGroupMessages={lastGroupMessages}
                                />
                            </div>
                        ))}
                </ul>
            </div>
            <div className="fixed bottom-0 right-0 z-40 mb-6 mr-4">
                {isGroup ? (
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink"
                    >
                        <PlusCircle />
                    </button>
                ) : (
                    <button
                        onClick={() => setMessageUsersModal(true)}
                        className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink"
                    >
                        <MessageSquarePlus />
                    </button>
                )}
            </div>
            {
                <AddGroup
                    chatEligibleUsers={chatEligibleUsers}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    emailInputRef={emailInputRef}
                    setUserGroups={setUserGroups}
                />
            }
            {messageUsersModal && !isGroup && (
                <MessageUsersModal
                    setCurrentChat={setCurrentChat}
                    setMessageUsersModal={setMessageUsersModal}
                    chatEligibleUsers={chatEligibleUsers}
                    user={user}
                    setConversations={setConversations}
                    conversations={conversations}
                />
            )}
        </div>
    )
}

export default ChatUsers

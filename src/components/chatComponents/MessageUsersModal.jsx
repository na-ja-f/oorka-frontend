import {
    MessageCircleReply,
    MessageSquare,
    MessageSquarePlus,
    X,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { addConversation } from "../../services/api/user/apiMethods";


function MessageUsersModal({
    setMessageUsersModal,
    chatEligibleUsers,
    user,
    setCurrentChat,
    setConversations,
    conversations,
}) {
    const userId = user._id;

    const handleMessage = (sender) => {
        const senderId = sender._id;
        addConversation({ senderId: userId, receiverId: senderId }).then(
            (response) => {
                const userData = response.data;
                const existChat = conversations.filter((con) => con._id === userData._id);
                if (!existChat.length) {
                    setConversations((prev) => [...prev, userData]);
                }
                setCurrentChat(userData);
                setMessageUsersModal(false);
            }
        );
    };

    return (
        <div className="absolute top-0 left-0 z-40 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg" style={{ height: "350px" }}>
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold mb-4">New Users</h2>
                    <X
                        onClick={() => setMessageUsersModal(false)}
                        className=" cursor-pointer"
                    />
                </div>
                <hr className="border-gray-300 w-full mb-2" />
                <div className="overflow-auto" style={{ height: "270px" }}>
                    <ul>
                        {chatEligibleUsers.map((user) => (
                            <>
                                <div className="lg:col-span-2 w-12/12  pb-2 mb-2" id="posted">
                                    <div className="flex justify-between bg-white rounded-lg">
                                        <Link
                                            to={
                                                user._id === userId
                                                    ? "/profile"
                                                    : `/users-profile/${user._id}`
                                            }
                                            className="info flex items-center mr-24 gap-2"
                                        >
                                            <img
                                                src={user.profileImg}
                                                alt="User"
                                                className=" h-10 rounded-full"
                                            />
                                            <p className="text-gray-800 text-sm mx-1">
                                                {user.name}
                                            </p>
                                        </Link>
                                        {userId !== user._id && (
                                            <div className="items-center flex gap-5 actions">
                                                <button
                                                    onClick={() => handleMessage(user)}
                                                    className="text-sm text-black px-4 py-1  rounded-md"
                                                >
                                                    <MessageSquare />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <li key={user._id}>{user.userName}</li> */}
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MessageUsersModal

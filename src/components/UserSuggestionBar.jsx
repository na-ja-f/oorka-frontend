import { useEffect, useState } from "react";
import { BadgeCheck, UserRoundPlus, UserRoundSearch } from "lucide-react";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser, getUserConnections, getUserSuggestions } from '../services/api/user/apiMethods'


function UserSuggestionBar() {
    const selectUser = (state) => state.auth.user;
    const userData = useSelector(selectUser);
    const userId = userData._id || "";
    const Navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [following, setFollowing] = useState([]);
    const [requested, setRequested] = useState([]);

    useEffect(() => {
        getUserSuggestions({ userId })
            .then((response) => {
                setUsers(response.data.suggestedUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });


        getUserConnections({ userId })
            .then((response) => {
                const connectionData = response.data.connection;
                setFollowing(connectionData.following);
                setRequested(connectionData.requestSent);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFollow = (foloweduserId, followedUserName) => {
        // const notificationData = {
        //     postImage: userData.profileImg,
        //     receiverId: foloweduserId,
        //     senderName: followedUserName,
        //     message: "Started follwing you",
        // };
        // socket.current.emit("sendNotification", notificationData);

        followUser({ userId, followingUser: foloweduserId })
            .then((response) => {
                setUsers(users.filter((user) => user._id !== foloweduserId));
                response.data.followed
                    ? toast.info(`Followed ${followedUserName}`)
                    : toast.info(`Follow Request Sent to ${followedUserName}`);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    const debouncedSearch = debounce(() => {
        getUserSuggestions({ userId, searchTerm: searchValue })
            .then((response) => {
                setUsers(response.data.suggestedUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, 1000);

    const handleSearch = () => {
        const searchTerm = searchValue.trim();
        if (searchTerm === "") return;
        debouncedSearch();
    };

    const isFollowing = (likedUserId) => {
        return following.some((user) => user._id === likedUserId);
    };

    const isRequested = (likedUserId) => {
        return requested.includes(likedUserId);
    };

    return (
        <>
            <div className="fixed shadow-xl right-36 lg:col-span-2 ms-10 h-4/6 w-1/5 p-4 bg-white rounded-lg  mt-16 overflow-scroll" id="posted">
                <h1 className="mb-4 text-gray-600 text-center font-semibold">
                    SUGGESTIONS
                </h1>
                <div className="flex flex-col">
                    <div className="flex items-center w-full mb-3 max-w-sm mx-auto">
                        <label htmlFor="simple-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <UserRoundSearch size={20} color="gray" />
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                value={searchValue}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    if (e.target.value.trim() !== "") {
                                        handleSearch();
                                    } else {
                                        setLoading(true);
                                        getUserSuggestions({ userId })
                                            .then((response) => {
                                                setUsers(response.data.suggestedUsers);
                                                setLoading(false);
                                            })
                                            .catch((error) => {
                                                console.log(error.message);
                                            });
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <div className=""></div>
                    ) : (
                        <div className="">
                            {users.map((suggestedUser) => (
                                <div key={suggestedUser._id} className="flex justify-between bg-gray-50 p-2 mb-3 rounded-lg  max-w-full">
                                    <div className="flex gap-2 justify-between mb-2 cursor-pointer" onClick={() => Navigate(`/users-profile/${suggestedUser._id}`)}>
                                        <img
                                            src={suggestedUser.profileImg}
                                            alt="User Avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div className="flex items-center">
                                            <div className="flex flex-col ">
                                                <div className="flex gap-1">
                                                    <p className="text-gray-600 text-sm">
                                                        {suggestedUser.name}
                                                    </p>
                                                    {suggestedUser.isVerified && (
                                                        <BadgeCheck size={20} color="white" fill="#7E3AF2" />

                                                    )}
                                                </div>
                                                <p className="text-gray-500 text-xs">
                                                    {(!isFollowing(suggestedUser._id) && !isRequested(suggestedUser._id)) ?
                                                        'Suggested For You' : 'Go to profile'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Message */}
                                    <div className="flex flex-col items-center justify-between">
                                        <div className="text-gray-500 justify-end items-center cursor-pointer">
                                            {!isFollowing(suggestedUser._id) && !isRequested(suggestedUser._id) && (<button
                                                onClick={() =>
                                                    handleFollow(
                                                        suggestedUser._id,
                                                        suggestedUser.name
                                                    )
                                                }
                                                className=" hover:bg-gray-50 rounded-full p-1"
                                            >
                                                <UserRoundPlus size={20} />
                                            </button>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserSuggestionBar

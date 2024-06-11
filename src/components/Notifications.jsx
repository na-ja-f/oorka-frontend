import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { BellRing } from "lucide-react";
import { getNotifications } from "../services/api/user/apiMethods";

function Notifications() {
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser);
    const userId = user._id || "";

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        try {
            getNotifications({ userId: userId })
                .then((response) => {
                    const notificationsData = response.data.notifications;
                    setNotifications(notificationsData);
                    console.log(notificationsData);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="">
            <div className="lg:ms-96 z-40">
                <div className="border profile-nav flex  items-center justify-start ps-6 bg-white rounded-md lg:mt-5 lg:mx-5">
                    <p className="text-lg flex items-center p-2 gap-2 text-gray-500">
                        Notifications <BellRing color="gray" size={20} />
                    </p>
                </div>

                <div className="home-scroll">
                    <div className="home-scrollbox">
                        {notifications?.map((notification) => (
                            <div
                                key={notification._id}
                                className="pl-3 pb-2 bg-white  lg:mx-5 w-12/12 mt-2 rounded-lg"
                            >
                                <div
                                    className="flex notifications-section justify-between py-1 ml-2"
                                // style={{ width: "800px" }}
                                >
                                    <div className="info flex items-center justify-between w-full">
                                        <div className="flex gap-1 lg:gap-2">
                                            <div className="bg-gradient-to-b from-purple-600 to-blue-400 w-0.5 lg:w-1 mr-1 lg:mr-3"></div>
                                            <div className="flex items-center">
                                                <img
                                                    src={notification.senderId.profileImg}
                                                    alt="User"
                                                    className="h-10 rounded-full"
                                                />
                                                <div className="flex">
                                                    <p className="text-gray-800 ms-2 lg:ms-4 text-xs font-semibold mx-1">
                                                        {notification.senderId.name}
                                                    </p>
                                                    <p className="text-gray-500 text-xs lg:mx-1">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                <p
                                                    className="text-gray-500 text-xs ms-1 lg:ms-4 lg:px-2"
                                                    style={{ fontSize: "9px" }}
                                                >
                                                    {formatDistanceToNow(
                                                        new Date(notification.createdAt),
                                                        { addSuffix: true }
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* <div className="flex justify-end p-4 lg:p-4 py-2">
                                            <button className="text-xs rounded btn lg:border lg:px-4 py-1 lg:py-2 cursor-pointer bg-white lg:ml-2 text-purple-600">
                                                View
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications

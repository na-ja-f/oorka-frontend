import { useEffect, useState } from "react";
import { acceptFollowRequest, getRequestedUsers, rejectFollowRequest } from '../services/api/user/apiMethods'
import { useSelector } from 'react-redux'
import { toast } from "sonner";
import Requests from "../components/Requests";

function FollowRequests() {

    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id

    const [requests, setRequests] = useState([])

    useEffect(() => {
        setTimeout(() => {
            getRequestedUsers({ userId })
                .then((response) => {
                    setRequests(response.data.requests)
                })
        }, 2000);
    }, [])

    const handleAccepRequest = (requestedUser) => {
        acceptFollowRequest({ userId, requestedUser })
            .then((response) => {
                setRequests(response.data.connections)
                toast.info("request accepted")
            })
    }

    const handleReject = (requestedUser) => {
        rejectFollowRequest({ userId, requestedUser })
            .then((response) => {
                setRequests(response.data.connections)
                toast.info("request rejected")
            })
    }

    return (
        <>
            <div className="mt-10 flex flex-col  h-screen">
                <div className="z-40 mt-3">
                    <div className="lg:col-span-2 ms-96 w-12/12 p-3" id="posted">
                        <div className="flex justify-between bg-white p-4 ml-2 rounded-lg" style={{ width: "660px" }}>
                            <h1 className=" text-xl font-semibold"> Follow Requests</h1>
                        </div>
                    </div>
                </div>
                <div>
                    {requests.map((request) => (
                        <Requests key={request._id} request={request} handleAcceptRequest={handleAccepRequest} handleReject={handleReject} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default FollowRequests

import { useEffect, useState } from "react";
import { acceptFollowRequest, getRequestedUsers, rejectFollowRequest } from '../services/api/user/apiMethods'
import { useSelector } from 'react-redux'
import { toast } from "sonner";
import Requests from "../components/Requests";
import { useNavigate } from "react-router-dom";

function FollowRequests() {

    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id
    const navigate = useNavigate()

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
                navigate('/')
            })
    }

    const handleReject = (requestedUser) => {
        rejectFollowRequest({ userId, requestedUser })
            .then((response) => {
                setRequests(response.data.connections)
                toast.info("request rejected")
                navigate('/')
            })
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="z-40">
                    <div className="lg:col-span-2 lg:ms-80 w-screen p-3" id="posted">
                        <div className="flex justify-between bg-white p-4 rounded-lg w-full">
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

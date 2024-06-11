import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";


function VideoCall() {
    const { roomId } = useParams();
    const containerRef = useRef(null);
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const userId = user._id;
    const userName = user.name;


    const handleLeaveRoom = () => {
        navigate('/chat');
    }

    useEffect(() => {
        console.log(userName);
        if (!containerRef.current) return;


        const myMeeting = async () => {
            const appId = 1405362731;
            const serverSecret = "cb4b6b5f9dd231cb42f4cb002620066c";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                roomId,
                userId,
                userName,
            );
            const zc = ZegoUIKitPrebuilt.create(kitToken)
            console.log('zc', kitToken);
            zc.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,

                },
                showScreenSharingButton: true,
                showPreJoinView: false,
                turnOnCameraWhenJoining: true,
                turnOnMicrophoneWhenJoining: false,
                showLeaveRoomConfirmDialog: false,
                onLeaveRoom: handleLeaveRoom,
                onUserLeave: handleLeaveRoom,
            })
        };
        myMeeting();
    }, [roomId, userId, userName, navigate])

    return (
        <div>
            <div ref={containerRef} style={{ height: '100vh', width: '100vw' }} />
        </div>
    )
}

export default VideoCall

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCall from './VideoCall'
import Error from "../Error";


function ProtectVideoCall() {
    const { userId } = useParams();
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const loggedInUserId = user._id;
    if (loggedInUserId === userId) {
        return <VideoCall />;
    } else {
        return <Error message="Unauthorized access" />;
    }
}

export default ProtectVideoCall

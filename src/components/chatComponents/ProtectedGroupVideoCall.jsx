import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../Error";
import GroupVideoCall from './GroupVideoCall'


function ProtectedGroupVideoCall() {
    const {  userId } = useParams();
    const selectUser = (state) => state.auth.user;
     const user = useSelector(selectUser);
     const loggedInUserId = user._id;  
    if (loggedInUserId === userId) {
      return <GroupVideoCall />;
    } else {
      return <Error message="Unauthorized access" />;
    }
  }
  
  export default ProtectedGroupVideoCall;
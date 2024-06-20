import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import { getUserDetails, getUserPost } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import PostShimmer from '../components/shimmerUI/PostShimmer'
import Posts from "../components/Posts";
import { useSelector } from "react-redux";
import PostGallery from "../components/PostGallery";

function UsersProfile() {
    const selectUser = (state) => state.auth.user;
    const userData = useSelector(selectUser)
    const loggedUserId = userData._id;

    const [isConnected, setIsConnected] = useState(false)
    const [connections, setConnections] = useState(false)
    const [user, setUser] = useState(null)
    const [Post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const { userId } = useParams();

    useEffect(() => {
        getUserDetails(userId)
            .then((response) => {
                setUser(response.data.user);
                setConnections(response.data.connections)
                const followers = response.data.connections.followers
                setIsConnected(followers.includes(loggedUserId))
            })
            .catch((error) => {
                toast.error(error.message)
            })
        getUserPost(userId)
            .then((response) => {
                console.log('res', response.data);
                const postData = response.data;
                setPost(postData)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div className="ml-5 mt-11 lg:w-8/12">
            {!loading && <UserDetails user={user} connections={connections} isConnected={isConnected} />}

            {isConnected && (
                <>
                    {loading ? (
                        <div>
                            <PostShimmer />
                            <PostShimmer />
                            <PostShimmer />
                        </div>
                    ) : (
                        <div className="lg:ms-96 mt-14 grid grid-cols-2 md:grid-cols-3 w-11/12 gap-3">
                            {Post.length !== 0 && Post.map((post) => (
                                <PostGallery key={post._id} post={post} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default UsersProfile

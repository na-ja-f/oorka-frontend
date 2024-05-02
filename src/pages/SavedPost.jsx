import { useEffect, useState } from "react"
import PostShimmer from '../components/shimmerUI/PostShimmer'
import Posts from '../components/Posts'
import { getSavedPost } from "../services/api/user/apiMethods"
import { toast } from "sonner"
import { useSelector } from "react-redux"

function SavedPost() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id;

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getSavedPost(userId)
                .then((response) => {
                    const postData = response.data;
                    setPosts(postData)
                })
                .catch((error) => {
                    toast.error(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 2000);
    }, [])

    return (
        <div className="mt-11">
            <div className="flex flex-col  h-full">
                {loading ? (
                    <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                <PostShimmer />
                            </div>
                        ))}
                    </div>
                ) : (
                    // Render posts when not loading
                    <div className="">
                        {posts.map((post) => (
                            <Posts key={post._id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedPost

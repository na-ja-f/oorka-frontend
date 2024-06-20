import { ImagePlus } from 'lucide-react'
import Story from '../components/story/Story'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import AddPost from '../components/AddPost';
import HomePageShimmer from '../components/shimmerUI/HomePageShimmer';
import { getPosts } from '../services/api/user/apiMethods';
import { toast } from 'sonner';
import Posts from '../components/Posts';
import UserSuggestionBar from '../components/UserSuggestionBar';


function HomePage() {
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
  const userId = user._id || "";

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const fetchPosts = () => {
    setLoading(true);
    getPosts({ userId: userId })
      .then((response) => {
        const postData = response.data
        setPosts(postData)
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div>
          <div className="lg:ms-96">
            <Story />
          </div>
          <div>
            <button onClick={() => setShowModal(true)} className="fixed bottom-10 right-4 z-50 mb-8 mr-8 bg-myViolet hover:bg-violet-900 text-white font-bold py-5 px-5 rounded-2xl shadow-xl shadow-gray-600">
              <ImagePlus size={30} />
            </button>
          </div>
        </div>

        {/* shimmer */}
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <HomePageShimmer />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}
        {showModal && <AddPost setNewPost={setPosts} setShowModal={setShowModal} />}
      </div>
      <div className="hidden lg:block">
        <UserSuggestionBar />
      </div>
    </>
  )
}

export default HomePage

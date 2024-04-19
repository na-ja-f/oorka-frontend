import { ImagePlus } from 'lucide-react'
import Story from '../components/story/Story'
import { useSelector } from "react-redux";
import { useState } from 'react';
import AddPost from '../components/AddPost';


function HomePage() {
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
  const userId = user._id || "";

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className=" ms-96 mt-6 w-12/12">
        <Story />
      </div>
      <div>
        <button onClick={() => setShowModal(true)} class="fixed bottom-8 right-8 mb-8 mr-8 bg-myViolet hover:bg-violet-900 text-white font-bold py-5 px-5 rounded-2xl shadow-xl shadow-gray-600">
          <ImagePlus size={30} />
        </button>
      </div>
      {showModal && <AddPost setNewPost={setPosts} setShowModal={setShowModal} /> }
    </div>
  )
}

export default HomePage

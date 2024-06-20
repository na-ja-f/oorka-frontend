import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Protect from './routes/protect'
import Sidebar from './components/Sidebar'
import { toast } from 'sonner'
import { io } from "socket.io-client";
import { BASE_URL } from './constants/baseURL'
import MobileNavBar from './components/MobileNavBar'


function App() {
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  useEffect(() => {
    socket.current = io(BASE_URL)
    socket?.current?.emit("addUser", user._id);

    socket.current.on("getStoryReply", (data) => {
      toast.info(`${data.senderName} replied ${data.text} to your story`)
    })

    socket.current.on("getNotifications", (data) => {
      toast.info(`${data.senderName} ${data.message} `)
    })

  }, [user])

  return (
    <>
      <Protect>
        {/* <div style={{ backgroundColor: 'rgb(243,244,246)' }} className='h-14 fixed inset-x-0 top-0 z-50 '></div> */}
        <div className='flex h-screen mb-64'>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="lg:hidden">
            <MobileNavBar />
          </div>
          <Outlet />
        </div>
      </Protect>
    </>
  )
}

export default App

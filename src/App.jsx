import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Protect from './routes/protect'
import Sidebar from './components/Sidebar'
// import { useSocket } from './utils/context/SocketContext'
import { toast } from 'sonner'


function App() {
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  // const socket = useSocket()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  // useEffect(() => {
  //   if (!socket.current) return
  //   socket.current.on("getNotifications", (data) => {
  //     toast(
  //       <div className="flex gap-2">
  //         <img src={data.postImage[0]} alt="User" className="h-8 rounded-full" />
  //         <p className="text-sm">
  //           {data.senderName} {data.message}
  //         </p>
  //       </div>
  //     )
  //   })
  // }, [socket])

  return (
    <>
      <Protect>
        <div style={{ backgroundColor: 'rgb(243,244,246)' }} className='h-14 fixed inset-x-0 top-0 z-50 '></div>
        <div className='flex h-screen mb-64'>
          <Sidebar />
          <Outlet />
        </div>
      </Protect>
    </>
  )
}

export default App

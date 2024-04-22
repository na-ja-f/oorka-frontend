import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Protect from './routes/protect'
import Sidebar from './components/Sidebar'


function App() {
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])
  return (
    <>
      <Protect>
        <div style={{backgroundColor: 'rgb(243,244,246)'}} className='h-14 fixed inset-x-0 top-0 z-50 '></div>
        <div className='flex h-screen mb-64'>
          <Sidebar />
          <Outlet />
        </div>
      </Protect>
    </>
  )
}

export default App

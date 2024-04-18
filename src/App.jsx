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
        <div className='flex h-screen'>
          <Sidebar />
          <Outlet />
        </div>
      </Protect>
    </>
  )
}

export default App

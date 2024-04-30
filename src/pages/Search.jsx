import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSearchUsers } from '../services/api/user/apiMethods';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


function SearchBar() {
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)

    const [input, setInput] = useState("")
    const [results, setresults] = useState([])
    const [userData, setUserdata] = useState([])

    useEffect(() => {
        getSearchUsers()
            .then((response) => {
                setUserdata(response.data.users)
                console.log(userData);
            })
    }, [])

    const handleChange = (value) => {
        setInput(value)
        const result = userData.filter((user) => {
            return value && user && user.name && user.name.toLowerCase().includes(value)
        })
        setresults(result)
    }

    return (
        <div className="mt-11">
            <div className="ms-96 flex flex-col p-4">
                <div class="pt-2 relative mx-auto text-gray-600">
                    <input style={{ width: '500px' }} className="border-1 border-myViolet bg-white h-12 rounded-xl text-xl focus:outline-none"
                        type="search" name="search" placeholder="Search" value={input} onChange={(e) => handleChange(e.target.value)} />
                    <div className="absolute right-0 top-0 mt-5 mr-4">
                        <Search />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className=" w-11/12">
                        {results.map((result, id) => (
                            <Link to={user._id === result?._id ? "/profile" :`/users-profile/${result?._id}`}>
                            <div key={id} className='mt-4 pl-4 border border-myViolet h-14 rounded-xl flex pt-2'>
                                <div>
                                    <img src={result.profileImg} alt="" className='w-10 rounded-full mr-4' />
                                </div>
                                <div className='pt-1 text-xl font-semibold font-serif'>
                                    {result.name}
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchBar

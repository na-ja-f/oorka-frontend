import { useEffect, useState } from 'react';
import { getSearchUsers, getPosts } from '../services/api/user/apiMethods';
import { Link } from 'react-router-dom';
import PostGallery from '../components/PostGallery'
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { BadgeCheck, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';


function SearchBar() {
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id || "";
    const Navigate = useNavigate()

    const [isPostSelected, setIsPostSelected] = useState(true);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState("")
    const [results, setresults] = useState([])
    const [userData, setUserdata] = useState([])
    const [postSearchData, setPostSearchData] = useState({ search: null });

    useEffect(() => {
        setLoading(true);
        const searchValue = postSearchData.search || "";

        getPosts({ userId: userId, searchTerm: searchValue })
            .then((response) => {
                const postsData = response.data;
                setPosts(postsData);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        getSearchUsers({ searchTerm: searchValue })
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => {
                toast.error(error.message);
            });

    }, [postSearchData, userId]);

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        // Update the postSearchData in the context
        setPostSearchData((prevData) => ({
            ...prevData,
            search: searchValue.trim() ? searchValue : null,
        }));
        // console.log(postSearchData);
    };

    return (
        <div className="lg:ml-5 w-full p-2 lg:w-8/12">
            <div className="ms-96 mt-16 text-gray-600">
                <input
                    type="search"
                    // onClick={() => Navigate('/explore')}
                    name="search"
                    placeholder="Search"
                    onChange={handleSearch}
                    className="bg-white h-10 px-5 w-96 pr-10 rounded-full text-sm focus:ring-none focus:outline-none border border-gray-300"
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                    <Search size={20} />
                </button>
            </div>
            <div className="flex gap-2 lg:ms-96 mt-2 lg:mt-5">
                <div
                    onClick={() => setIsPostSelected(true)}
                    className={`${isPostSelected ? "bg-white" : "bg-gray-200 cursor-pointer"
                        } py-2 px-3 rounded-lg`}
                >
                    <p className={`${isPostSelected ? "" : "text-gray-500"}`}>Posts</p>
                </div>
                <div
                    onClick={() => setIsPostSelected(false)}
                    className={`${!isPostSelected ? "bg-white" : "bg-gray-200 cursor-pointer"
                        } py-2 px-3 rounded-lg`}
                >
                    <p className={`${!isPostSelected ? "" : "text-gray-500"}`}>Users</p>
                </div>
            </div>
            {isPostSelected && (
                <div className="lg:ms-96 mt-5 grid grid-cols-2 md:grid-cols-3 w-full lg:w-11/12 gap-4">
                    {!loading &&
                        posts.map((post) => (
                            <div key={post._id}>
                                <PostGallery post={post} />
                            </div>
                        ))}
                </div>
            )}
            {!isPostSelected && users.length !== 0 && (
                <div className="lg:ms-96 mt-5 p-2 grid grid-cols-2 md:grid-cols-3 w-full lg:w-11/12 gap-4">
                    {users.map((user) => (
                        <div className="bg-white rounded-lg  h-52">
                            <div className="flex  justify-center mt-5">
                                <img
                                    src={user.profileImg}
                                    className="rounded-full h-16"
                                    alt=""
                                />

                            </div>
                            <div className="flex items-center gap-1 justify-center mt-5">
                                <p className="text-sm font-medium">{user.name}</p>
                                {
                                    user.isVerified &&
                                    <BadgeCheck size={20} color="white" fill="#7E3AF2" />
                                }

                            </div>
                            <div className="flex justify-center mt-5">
                                <Link
                                    className="flex text-white bg-purple-600 rounded-lg p-2 text-sm font-medium"
                                    to={`/users-profile/${user._id}`}
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar

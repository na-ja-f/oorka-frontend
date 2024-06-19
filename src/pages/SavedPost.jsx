import { useEffect, useState } from "react"
import PostShimmer from '../components/shimmerUI/PostShimmer'
import Posts from '../components/Posts'
import { getSavedPost, getSavedCategories, createCategory } from "../services/api/user/apiMethods"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/reducers/authSlice"

function SavedPost() {
    const dispatch = useDispatch()

    // const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id;
    const [createModal, setCreateModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        // setLoading(true)
        getSavedCategories(userId)
            .then((response) => {
                const categoryData = response.data;
                setCategories(categoryData)
            })
            .catch((error) => {
                toast.error(error.message);
            })
        // .finally(() => {
        //     setLoading(false);
        // });
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]); // Set initial category if available
        }
    }, [categories]);

    useEffect(() => {
        if (selectedCategory) {
            let category = selectedCategory

            getSavedPost({ userId, category })
                .then((response) => {
                    const savedPostData = response.data;
                    setPosts(savedPostData)
                })
                .catch((error) => {
                    toast.error(error.message);
                })
        }
    }, [selectedCategory]);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            if (!categoryName.trim()) {
                console.log("Category name can't be empty");
                return;
            }

            createCategory({ userId, categoryName })
                .then((response) => {
                    const userData = response.data
                    dispatch(loginSuccess({ user: userData }))
                    toast.info("category created succesfully")
                    setCreateModal(false);
                    setCategoryName("");
                })
                .catch((error) => {
                    toast.error(error.message);
                })

        } catch (error) {
            console.error("Error creating category:", error);
        }
    }
    return (
        <div className="flex flex-col">
            <div className="lg:col-span-2 ms-96 w-full pl-4 pt-4 mt-10">
                <div className="mt-4 flex">
                    <div className="w-full  px-4">
                        <div className="bg-white rounded-3xl my-1 mx-5  p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold">Collections</h1>
                                <div className="relative">
                                    {categories.length > 0 ? (
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="appearance-none rounded-md bg-gray-200 py-2 px-4 pr-8 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>No categories available</p>
                                    )}

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg
                                            className="h-4 w-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M14.707 7.293a1 1 0 0 0-1.414 0L10 10.586 6.707 7.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setCreateModal(true)}
                                className="bg-indigo-700 text-white px-4 py-2 rounded shadow-md"
                            >
                                Create category
                            </button>

                            <div className="mt-4">
                                <h2 className="text-2xl font-semibold">
                                    Posts in {selectedCategory}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    createModal && (
                        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="relative p-4 w-full max-w-md">
                                <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Create New Category
                                        </h3>
                                        <button
                                            onClick={() => setCreateModal(false)}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                        >
                                            <svg
                                                className="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 14"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4 md:p-5" onSubmit={handleCreateCategory}>
                                        <div className="grid gap-4 mb-4">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    placeholder="Enter category name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Create Category
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="mb-4 ml-16">
                        <Posts post={post} />
                    </div>
                ))
            ) : (
                <div className="neumorphism-placeholder p-8 rounded-lg shadow-neumorphism">
                    <div className="flex flex-col items-center ms-96 justify-center">
                        <img
                            src="https://www.cortfurnitureoutlet.com/assets/images/no-image.png"
                            alt="No posts found"
                            className="neumorphism-image w-48 h-48 mb-4"
                        />
                        <p className="text-gray-500 text-center">
                            There are no posts available for the selected category.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SavedPost

// < div className = "mt-11" >
//     <div className="flex flex-col  h-full">
//         {loading ? (
//             <div>
//                 {Array.from({ length: 5 }).map((_, index) => (
//                     <div key={index}>
//                         <PostShimmer />
//                     </div>
//                 ))}
//             </div>
//         ) : (
//             // Render posts when not loading
//             <div className="">
//                 {posts.map((post) => (
//                     <Posts key={post._id} post={post} />
//                 ))}
//             </div>
//         )}
//     </div>
//     </div >
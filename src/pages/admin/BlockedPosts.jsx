import { CheckCheck, BookLockIcon } from "lucide-react";
import { Button, Modal, Pagination } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminPostBlock, adminPostList } from "../../services/api/admin/apiMethods";

function BlockedPosts() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [blockAction, setBlockAction] = useState("block");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = () => {
        adminPostList(currentPage)
            .then((response) => {
                const postsData = response.data;
                setPosts(postsData.posts);
                setFilteredPosts(postsData.posts);
                const totalpostCount = Math.ceil(postsData.totalPosts / 6)
                setTotalCount(totalpostCount)
                console.log(postsData.posts);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handlePostBlock = (postId, status) => {
        try {
            setSelectedUserId(postId);
            setBlockAction(status === "block" ? "unblock" : "block");
            setOpenModal(true);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const confirmBlockPost = (postId, status) => {
        setOpenModal(false);
        const requestData = { postId };
        console.log(requestData);
        adminPostBlock(requestData)
            .then((response) => {
                const data = response.data;
                if (status == "block") {
                    toast.error(data.message);
                } else {
                    toast.info(data.message);
                }
                setPosts((prevposts) =>
                    prevposts.map((post) => {
                        if (post._id === postId) {
                            return { ...post, isBlocked: !post.isBlocked };
                        }
                        return post;
                    })
                );
                setFilteredPosts((prevposts) =>
                    prevposts.map((post) => {
                        if (post._id === postId) {
                            return { ...post, isBlocked: !post.isBlocked };
                        }
                        return post;
                    })
                );
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleSearch = (searchText) => {
        const filtered = posts.filter((post) =>
            post.userId.userName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <div className="w-12/12">
                <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <input
                        type="search"
                        id="search"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </div>
            <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            User
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Likes
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 font-medium flex justify-center text-gray-900"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {!loading && filteredPosts.length > 0 &&
                        filteredPosts.map((post) => (
                            <tr key={post._id} className="hover:bg-gray-50">
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-10 w-10">
                                        <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src={post.imageUrl[0]}
                                            alt=""
                                        />
                                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">
                                            {post.title}
                                        </div>
                                        <div className="text-gray-400">{post.description}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <div className="relative  h-10 w-10">
                                        <div>

                                            <img
                                                className="h-full w-full rounded-full object-cover object-center"
                                                src={post.userId.profileImg}
                                                alt=""
                                            />
                                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">
                                            {post.userId.userName}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {post.likes.length}

                                </td>
                                <td className="px-6 py-4">
                                    {formatDistanceToNow(
                                        new Date(post.createdAt),
                                        { addSuffix: true }
                                    )}
                                </td>

                                <td className="px-6 py-4">
                                    {post.isBlocked ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600">
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                            UnBlocked
                                        </span>
                                    )}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        {post.isBlocked ? (
                                            <button
                                                type="button"
                                                onClick={() => handlePostBlock(post._id, "unblock")}
                                                className=" bg-white text-blue-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                            >
                                                <CheckCheck />
                                                UnBlock
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handlePostBlock(post._id, "block")}
                                                className=" bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                            >
                                                Block
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    {/* Additional rows can be added here */}
                </tbody>
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination
                        layout="table"
                        currentPage={currentPage}
                        totalPages={totalCount} // Change this to the total number of pages
                        onPageChange={onPageChange}
                        showIcons
                    />    </div>
            </table>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <Modal.Body>
                    <div className="text-center">
                        <BookLockIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to{" "}
                            {blockAction === "unblock" ? "block" : "unblock"} this user?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color={blockAction === "block" ? "blue" : "failure"}
                                onClick={() => confirmBlockPost(selectedUserId, "block")}
                            >
                                Yes, {blockAction === "unblock" ? "block" : "unblock"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default BlockedPosts

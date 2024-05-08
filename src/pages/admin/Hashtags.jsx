import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Modal, Button, Pagination } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";
import { addHashtag, getHashtags, BlockHashtag } from '../../services/api/admin/apiMethods'

function Hashtags() {
    const [hashtags, setHashtags] = useState([]);
    const [filteredHashtags, setFilteredHashtags] = useState([]);
    const [tag, setTag] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedHashtagId, setSelectedHashtagId] = useState("");
    const [blockAction, setBlockAction] = useState("block");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        fetchHashtags();
    }, [currentPage]);

    const fetchHashtags = () => {
        getHashtags(currentPage)
            .then((response) => {
                const hashtagData = response.data;
                setHashtags(hashtagData.hashtags);
                setFilteredHashtags(hashtagData.hashtags);
                const totalhashtagCount = Math.ceil(hashtagData.totalHashtags / 6)
                setTotalCount(totalhashtagCount)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmit = async () => {
        if (tag.trim() === "") {
            toast.error("Provide a Hashtag");
            return;
        }
        if (!tag.startsWith("#")) {
            toast.error("The hashtag should start with a '#' ");
            return;
        }
        try {
            await addHashtag({ hashtag: tag })
                .then((response) => {
                    const hashtagData = response.data;
                    setHashtags(hashtagData.hashtags);
                    setTag("");
                    toast.info("Hashtag Added");
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to add hashtag");
        }
    };

    const handleHashtagBlock = (hashtagId, status) => {
        try {
            setSelectedHashtagId(hashtagId);
            setBlockAction(status === "block" ? "unblock" : "block");
            setOpenModal(true);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const confirmBlockHashtag = () => {
        setOpenModal(false);
        const requestData = { hashtagId: selectedHashtagId };
        BlockHashtag(requestData)
            .then((response) => {
                const data = response.data;
                if (blockAction === "block") {
                    toast.error(data.message);
                } else {
                    toast.info(data.message);
                }
                setHashtags((prevHashtags) =>
                    prevHashtags.map((hashtag) => {
                        if (hashtag._id === selectedHashtagId) {
                            return { ...hashtag, isBlocked: !hashtag.isBlocked };
                        }
                        return hashtag;
                    })
                );
                setFilteredHashtags((prevFilteredHashtags) =>
                    prevFilteredHashtags.map((hashtag) => {
                        if (hashtag._id === selectedHashtagId) {
                            return { ...hashtag, isBlocked: !hashtag.isBlocked };
                        }
                        return hashtag;
                    })
                );
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleSearch = (searchText) => {
        const filtered = hashtags.filter((hashtag) =>
            hashtag.hashtag.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredHashtags(filtered);
    };

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                        <input
                            type="text"
                            id="search"
                            onChange={(e) => setTag(e.target.value)}
                            value={tag}
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add new hashtag"
                            required
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="w-5/12">
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
            </div>
            <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Posts
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
                    {filteredHashtags.length &&
                        filteredHashtags.map((hashtag) => (
                            <tr key={hashtag._id} className="hover:bg-gray-50">
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">
                                            {hashtag.hashtag}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        {hashtag.posts.length}
                                    </span>
                                </td>
                                <td className="px-6 py-4"> {formatDistanceToNow(
                                    new Date(hashtag.date),
                                    { addSuffix: true }
                                )}</td>

                                <td className="px-6 py-4">
                                    {hashtag.isBlocked ? (
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
                                        {hashtag.isBlocked ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleHashtagBlock(hashtag._id, "unblock")
                                                }
                                                className=" bg-white text-blue-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                            >
                                                UnBlock
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleHashtagBlock(hashtag._id, "block")}
                                                className=" bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                                Block
                                            </button>
                                        )}
                                      </div>
                                </td>
                            </tr>
                        ))}
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
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to{" "}
                            {blockAction === "unblock" ? "block" : "unblock"} this hashtag?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color={blockAction === "block" ? "success" : "failure"}
                                onClick={confirmBlockHashtag}
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

export default Hashtags

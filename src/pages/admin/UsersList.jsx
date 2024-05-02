import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCheck, BookLockIcon, Search, X, Check, LockKeyhole } from "lucide-react";
import { Button, Modal, Pagination } from "flowbite-react";
import { adminUsersList, userBlock } from "../../services/api/admin/apiMethods";

function UsersList() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState("")
    const [blockAction, setBlockAction] = useState("block")
    const [currentPage, setCurrentPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    const onPageChange = (page) =>  setCurrentPage(page)

    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const fetchUsers = () => {
        adminUsersList(currentPage)
            .then((response) => {
                const userData = response.data;
                setUsers(userData.users)
                setFilteredUsers(userData.users)
                const totalUserCount = Math.ceil(userData.totalusers / 6)

                setTotalCount(totalUserCount)
            })
            .catch((error) => {
                console.log(error);
                toast.error("failed to fetch users")
            })
            .finally(() => {
            })
    }

    const handleUserBlock = (userId, status) => {
        try {
            setSelectedUserId(userId)
            setBlockAction(status === "block" ? "unblock" : "block")
            setOpenModal(true)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const confirmUserBlock = (userId, status) => {
        setOpenModal(false)
        const requestData = { userId }
        userBlock(requestData)
            .then((response) => {
                const data = response.data
                if (status == "block") {
                    toast.error(data.message)
                } else {
                    toast.info(data.message)
                }
                setUsers((prevUsers) =>
                    prevUsers.map((user) => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: !user.isBlocked }
                        }
                        return user
                    })
                )
                setFilteredUsers((prevUsers) =>
                    prevUsers.map((user) => {
                        if (user._id === userId) {
                            return { ...user, isBlocked: !user.isBlocked }
                        }
                        return user
                    })
                )
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    const handleSearch = (searchText) => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredUsers(filtered)
    }

    return (
        <div className="w-8/12 mt-16 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ml-24">
            <div className="w-12/12">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search />
                    </div>
                    <input
                        type="search"
                        id="search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-myViolet focus:border-myViolet"
                        placeholder="Search"
                        required
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>
            <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                            Google
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
                    {filteredUsers.length > 0 &&
                        filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-10 w-10">
                                        <img
                                            className="h-full w-full rounded-full object-cover object-center"
                                            src={user.profileImg}
                                            alt=""
                                        />
                                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mt-2 text-gray-700">
                                            {user.userName}
                                        </div>
                                        <div className="text-gray-400">{user.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {user.isGoogle ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                            <Check color="green" />
                                        </span>
                                    ) : (
                                        <X color="red" />
                                    )}
                                </td>

                                <td className="px-6 py-4">
                                    {user.isBlocked ? (
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
                                        {user.isBlocked ? (
                                            <button
                                                type="button"
                                                onClick={() => handleUserBlock(user._id, "unblock")}
                                                className=" bg-white text-blue-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                            >
                                                <CheckCheck />
                                                UnBlock
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleUserBlock(user._id, "block")}
                                                className=" bg-white gap-2 text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                            >
                                                <LockKeyhole />
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
                        totalPages={totalCount} 
                        onPageChange={onPageChange}
                        showIcons
                    />
                </div>
            </table>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 mt-6 text-lg font-normal text-black">
                            Are you sure you want to{" "}
                            {blockAction === "unblock" ? "block" : "unblock"} this user?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color={blockAction === "block" ? "blue" : "failure"}
                                onClick={() => confirmUserBlock(selectedUserId, "block")}
                            >
                                {blockAction === "unblock" ? "block" : "unblock"}
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

export default UsersList

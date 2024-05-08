import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { getAllTransactions } from "../services/api/user/apiMethods";

function PremiumPage() {
    const selectUser = (state) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";

    const [transactions, setTransaction] = useState([]);

    useEffect(() => {
        getAllTransactions({ userId: userId })
            .then((response) => {
                if (response.data.success === true) {
                    const transactionData = response.data.allPremiumUserData;
                    setTransaction(transactionData);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(error.message);
                localStorage.removeItem("sessionId");
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="bg-white pt-8 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            <div className="flex justify-center items-center text-yellow-400">
                                Premium
                            </div>
                        </h2>

                        <p className="mt-6 text-sm leading-8 text-gray-600">
                            Elevate your profile with our premium subscription! Gain a coveted
                            blue tick badge for enhanced credibility and visibility.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                                1 Year membership
                            </h3>
                            <p className="mt-6 text-xs leading-7 text-gray-600">
                                Upgrade to premium and stand out from the crowd with a
                                prestigious blue tick badge on your profile, boosting your
                                credibility and attracting more attention.
                            </p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-purple-600">
                                    What’s included
                                </h4>
                                <div className="h-px flex-auto bg-gray-100"></div>
                            </div>
                            <ul
                                role="list"
                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                            >
                                <li className="flex gap-x-3">
                                    <svg
                                        className="h-6 w-5 flex-none text-purple-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Verification Icon
                                </li>
                                <li className="flex gap-x-3">
                                    <svg
                                        className="h-6 w-5 flex-none text-purple-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Boosted Credibility
                                </li>
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            {transactions.length !== 0 && (
                <div className="px-40 ">
                    <p className="text-2xl font-bold tracking-tight text-gray-900 pt-16">
                        Transaction History
                    </p>

                    {transactions?.map((transaction) => (
                        <div
                            key={transaction._id}
                            className="mx-auto my-5 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none"
                        >
                            <div className="p-8 sm:p-10 lg:flex-auto">
                                <h3 className="text-xl  tracking-tight text-gray-900">
                                    Transcation ID{" "}
                                </h3>
                                <p className="mt-1 text-xs leading-7 text-gray-600">
                                    {transaction.transactionId}{" "}
                                </p>
                                <div className="mt-10 flex items-center gap-x-4">
                                    <h4 className="flex-none text-sm font-semibold leading-6 text-purple-600">
                                        Details
                                    </h4>
                                    <div className="h-px flex-auto bg-gray-100"></div>
                                </div>
                                <ul
                                    role="list"
                                    className="mt-8 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                                >
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-purple-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Amount : ₹<span> {transaction.amount}</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-purple-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Paid On :
                                        <span>
                                            {new Date(transaction.startDate).toLocaleDateString()}
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-purple-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Valid till :{" "}
                                        <span>
                                            {new Date(transaction.expiryDate).toLocaleDateString()}
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg
                                            className="h-6 w-5 flex-none text-purple-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Plan validity : <span>365days</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PremiumPage

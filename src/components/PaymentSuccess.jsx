import animationData from '../assets/Animation - 1712580527345.json';
import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { updateUser } from '../redux/reducers/authSlice';
import Lottie from 'lottie-react'
import { validatePayment } from '../services/api/user/apiMethods';

function PaymentSuccess() {
    const dispatch = useDispatch();
    const selectUser = (state) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            const sessionId = localStorage.getItem('sessionId');
            if (sessionId) {
                validatePayment({ userId: userId, sessionId: sessionId }).then((response) => {
                    if (response.data.success === true) {
                        setIsSuccess(true)
                        const userData = response.data.user;
                        dispatch(updateUser({ user: userData }));
                        localStorage.removeItem('sessionId');
                    } else {
                        navigate('/premium/payment-failed');
                    }
                })
                    .catch((error) => {
                        toast.error(error.message);
                        localStorage.removeItem('sessionId');
                        console.log(error);
                    });;
            } else {
                navigate('/premium/plans');
            }
        }, 2000);

        return () => {
            clearTimeout(timeout);
            localStorage.removeItem('sessionId');
        };
    }, [navigate]);

    return (
        <>
            {isSuccess ? (
                <div className="success rounded-2xl  bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8 flex flex-col items-center">
                        <p className="text-base font-semibold text-purple-600">Payment Successful</p>
                        <div style={{ width: "120px" }} className=' flex justify-center'>
                            <Lottie animationData={animationData} loop={false} />
                        </div>


                        <a onClick={() => navigate('/premium/plans')} className=" cursor-pointer block w-full rounded-md bg-purple-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            Get Transaction Details
                        </a>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                            Invoices and receipts available for easy company reimbursement
                        </p>
                    </div>
                </div>
            ) : (
                <div className="loading rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                        <p className="text-base font-semibold text-gray-600 animate-pulse">Payment Processing</p>
                        <div className='flex justify-center items-center mt-5' >
                            <p className="mt-6 flex items-baseline justify-center gap-x-2" >
                                <span className="text-5xl font-bold tracking-tight text-gray-900">₹ 499</span>
                                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/Year</span>
                            </p>

                        </div>

                        <button
                            disabled={true}
                            className="mt-10 block cursor-pointer w-full rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Spinner color="success" aria-label="Medium sized spinner example" size="md" /> Get access
                        </button>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                            Invoices and receipts available for easy company reimbursement
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default PaymentSuccess

import animationData from '../assets/Animation - 1712580677390.json';
import Lottie from 'lottie-react';
import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { initialCheckout } from '../services/api/user/apiMethods';


function PaymentFailed() {
    const navigate = useNavigate();
    const selectUser = (state) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        const timeout = setTimeout(() => {
            const sessionId = localStorage.getItem('sessionId');
            if (sessionId) {
                triggerApiFunction(sessionId);
            } else {
                navigate('/premium/plans');
            }
        }, 2000);

        return () => {
            clearTimeout(timeout);
            localStorage.removeItem('sessionId');
        };
    }, [navigate]);

    const triggerApiFunction = (sessionId) => {
        console.log('Triggering API function with sessionId:', sessionId);
        setIsSuccess(true)
    };

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51PDiEYSBGMY6u2sBmq8s1B4X9S4iLvtUB1fLsQlFGHvXYs2OqDPtrLArbZTdFJyrmp96GykpigFDmLsGRugCQ9Wb00MZfoGKHg")

        try {
            setLoading(true);

            initialCheckout({ userId }).then((response) => {
                const stripeId = response.data.id;
                localStorage.setItem('sessionId', stripeId);
                setLoading(false);
                const result = stripe?.redirectToCheckout({
                    sessionId: stripeId
                })
                console.log(result);

            })

                .catch((error) => {
                    console.log(error?.message);
                });
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <>
            {isSuccess ? (
                <div className="success rounded-2xl  bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8 flex flex-col items-center">
                        <p className="text-base font-semibold text-red-600">Payment Unsuccessful</p>
                        <div style={{ width: "228px" }} className=' flex justify-center'>
                            <Lottie animationData={animationData} loop={false} />
                        </div>


                        <a onClick={makePayment} className=" block w-full rounded-md bg-white border px-3 py-3 text-center text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">

                            {loading && (
                                <Spinner className="me-2" color="failure" aria-label="Medium sized spinner example" size="md" />
                            )}
                            Try again
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
                                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/mo</span>
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

export default PaymentFailed

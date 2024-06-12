import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from '../components/TextError'
import { initialValues, validationSchema } from "../utils/validations/registerValidation"
import { postRegister, googleAuthenticate } from '../services/api/user/apiMethods'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/authSlice";
import BouncingBall from "../components/BouncingBall";
import { provider, auth } from "../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";

function Signup() {
    const dispatch = useDispatch();
    localStorage.removeItem("otpTimer");

    const navigate = useNavigate();

    const submit = (values) => {
        postRegister(values)
            .then((response) => {
                const data = response.data
                if (response.status === 200) {
                    toast.success(data.message);
                    navigate(`/otp?email=${data.email}`)
                } else {
                    toast.error(data.message)
                }
            })
            .catch((error) => {
                toast.error(error?.message)
            })
    }

    const handlegoogleSignUp = () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data);

            const userData = {
                username: data.user.displayName,
                email: data.user.email,
                imageUrl: data.user.photoURL,
            };

            googleAuthenticate(userData)
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200) {
                        toast.success(data.message);
                        dispatch(loginSuccess({ user: data }));
                        navigate("/");
                    } else {
                        console.log(response.message);
                        toast.error(data.message);
                    }
                })
                .catch((error) => {
                    console.log(error?.message);
                });
        });
    };

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div>
                    <div className="flex min-h-full flex-col justify-center px-6 p-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h1 className='text-4xl font-semibold text-center'>Create Your Account</h1>
                            <h2 className="leading-9 tracking-tight text-gray-500 text-center">Sign up to see photos and videos from your friends</h2>
                        </div>
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="btn-wrapper text-center">
                                <button
                                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-10 py-3 rounded-md outline-grey focus:outline-none uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handlegoogleSignUp}
                                >
                                    <img
                                        alt="..."
                                        className="w-5 mr-1"
                                        src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                                    />
                                    Google
                                </button>
                            </div>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={submit}
                            >
                                <Form>
                                    <div className="mb-4">
                                        <Field
                                            type="text"
                                            id="username"
                                            placeHolder="Name"
                                            name="username"
                                            className=" w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage name="username" component={TextError} />
                                    </div>

                                    <div className="mb-4">
                                        <Field
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                            name="email"
                                            className=" w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage name="email" component={TextError} />
                                    </div>

                                    <div className="mb-4">
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="password"
                                            className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage name="password" component={TextError} />
                                    </div>

                                    <div className="mb-4">
                                        <Field
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confrim Password"
                                            className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage name="confirmPassword" component={TextError} />
                                    </div>

                                    <div className="flex mb-4">
                                        <p className=" text-gray-500 text-xs">
                                            By signing up you agree to our Terms of Service and Privacy
                                            policy and confirm that you are at least 18 years old
                                        </p>
                                    </div>

                                    <div>
                                        <button type="submit" className="flex w-full justify-center rounded-md bg-violet-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                                    </div>
                                </Form>
                            </Formik>

                            <p className="mt-10 text-center text-sm ">
                                Already a member?
                                <a href="#" className="font-semibold leading-6 text-violet-800 hover:text-indigo-500"><Link to='/login'>sign in</Link> </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <BouncingBall />
        </div>
    )
}

export default Signup

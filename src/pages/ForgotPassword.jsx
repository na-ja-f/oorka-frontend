import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import * as Yup from "yup"
import { toast } from "sonner";
import { forgotPassword } from "../services/api/user/apiMethods";

function ForgotPassword() {
    localStorage.removeItem("otpTimer")
    const navigate = useNavigate();

    const email = "";
    const emailValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("invalid email address")
            .required("email is required")
    })

    const submit = (values) => {
        forgotPassword({ email: values.email })
            .then((response) => {
                const data = response.data
                toast.success(data.message)
                navigate(`/forgot-otp?email=${data.email}`)
            })
            .catch((error) => {
                toast.error(error?.message)
            })
    }

    return (
        <div className="flex justify-center">
            <div className="lg:p-36 md:p-52 sm:20 lg:w-1/2">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-semibold mb-2">Forgot Password</h1>
                    <h1 className="text-lg font-normal mb-4">Recover Password</h1>
                </div>
                <Formik
                    initialValues={{ email: email }}
                    validationSchema={emailValidationSchema}
                    onSubmit={submit}
                >
                    {(
                        { handleSubmit } // Destructure handleSubmit from props
                    ) => (
                        <Form onSubmit={handleSubmit}>
                            {" "}
                            {/* Pass handleSubmit to onSubmit */}
                            {/* Email Input */}
                            <div className="mb-4">
                                <Field
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="email" component={TextError} />
                            </div>
                            {/* Login Button */}
                            <button
                                type="submit"
                                className="bg-violet-800 hover:bg-violet-950 text-white font-semibold rounded-md py-3 px-4 w-full"
                            >
                                Send OTP
                            </button>
                        </Form>
                    )}
                </Formik>{" "}
                {/* Sign up Link */}
                <div className="mt-6 text-sm text-center">
                    You already have an account?
                    <Link to="/login" className="text-violet-800 hover:underline">
                        Sign In!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

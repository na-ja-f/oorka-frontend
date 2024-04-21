import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    initialValues,
    validationSchema,
} from "../../utils/validations/loginValidations";
import { toast } from "sonner";
import TextError from '../../components/TextError'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { AdminLoginSuccess } from '../../redux/reducers/adminAuthSlice'
import { adminLogin } from '../../services/api/admin/apiMethods'


function AdminLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectAdmin = (state) => state.adminAuth.admin;
    const admin = useSelector(selectAdmin)

    useEffect(() => {
        if (admin) {
            navigate("/admin")
        }
    }, [admin, navigate])

    const submit = (values) => {
        adminLogin(values)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    toast.success(data.message)
                    dispatch(AdminLoginSuccess({ admin: data }))
                    navigate("/admin/")
                } else {
                    console.log(response.message);
                    toast.error(data.message)
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error)
            })
    }

    return (
        <>
            <div className=" flex justify-center items-center h-screen">
                <div className=" lg:p-10 md:p-10 sm:20rounded-xl  lg:w-2/6">
                    <div className="flex flex-col items-center">
                        <h1 className=" text-4xl font-semibold mb-6">Admin Login</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                    >
                        <Form className="space-y-4 ">
                            <div className="mb-4 flex flex-col items-center">
                                <Field
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    className=" w-96 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="email" component={TextError} />
                            </div>
                            {/* Password Input */}
                            <div className="mb-4 flex flex-col items-center">
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    className="w-96 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="password" component={TextError} />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-myViolet hover:bg-purple-950 text-white font-semibold rounded-md py-3 px-4 w-96"
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    </Formik>{" "}
                    {/* Sign up Link */}
                </div>
            </div>
        </>
    )
}

export default AdminLogin

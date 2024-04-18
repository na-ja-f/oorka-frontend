import BouncingBall from "../components/BouncingBall";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  initialValues,
  validationSchema,
} from "../utils/validations/loginValidations";
import { toast } from "sonner";
import { postLogin, googleAuthenticate } from "../services/api/user/apiMethods";
import TextError from "../components/TextError";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/reducers/authSlice";
import { provider, auth } from "../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  //authenticator
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const submit = (values) => {
    postLogin(values)
      .then((response) => {
        const data = response.data;
        if (response.status === 200) {
          toast.info(data.message);
          dispatch(loginSuccess({ user: data }));
          navigate("/");
        } else {
          console.log(response.message);
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
        console.log(error?.message);
      });
  };

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
          toast.error(error?.message);
        });
    });
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-col items-center">
            <h1 className=" text-4xl font-semibold mb-2">Welcome Back</h1>
            <h1 className="text-lg font-normal mb-4">Login to your account</h1>
          </div>
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="btn-wrapper text-center">
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 px-10 py-3 rounded-md outline-grey focus:outline-none mr-3 mb-5  uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            <Form className="space-y-4">
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
              {/* Password Input */}
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
              {/* Forgot Password Link */}
              <div className="mb-6 text-sm text-red-500">
                <Link to="/forgot-password" className="hover:underline">
                  Forgot Password?
                </Link>
              </div>
              {/* Login Button */}
              <button
                type="submit"
                className="bg-violet-800 hover:bg-violet-950 text-white font-semibold rounded-md py-3 px-4 w-full"
              >
                Login
              </button>
            </Form>
          </Formik>{" "}
          {/* Sign up Link */}
          <div className="mt-6 text-sm  text-center">
            Don't have an account?
            <Link to="/signup" className="text-violet-800 hover:underline">
              Sign up!
            </Link>
          </div>
        </div>
      </div>
      <BouncingBall />
    </div>
  )
}

export default Login

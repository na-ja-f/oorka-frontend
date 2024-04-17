import * as Yup from "yup"

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    email: Yup.string().email("invalid email address").required("email is required"),
    password: Yup.string().min(8, "password must be atleast 8 characters").required("password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "password must match").required("password is required"),

})

export {initialValues,validationSchema}
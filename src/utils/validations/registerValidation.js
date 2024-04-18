import * as Yup from "yup"

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("username is required").matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Username must start with a letter and can only contain letters and numbers').min(4, 'Username must be at least 4 characters long'),
    email: Yup.string().email("invalid email address").required("email is required"),
    password: Yup.string().min(6, "password must be atleast 6 characters").required("password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "password must match").required("password is required"),

})

export { initialValues, validationSchema }
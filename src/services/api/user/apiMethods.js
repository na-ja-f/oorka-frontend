import { apiCall } from "./apiCalls"
import { userUrls } from "../endPoints"

// ! user register
// ? POST
export const postRegister = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.register, userData)
                .then((response) => {
                    resolve(response);
                    console.log(response);
                })
                .catch((err) => {
                    reject(err)
                })
        } catch (error) {
            resolve({ status: 500, message: "somethings wrong" })
        }
    })
}

// ! verify otp 
// ? POST
export const postOTP = (otp) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(otp);
            apiCall("post", userUrls.registerOtp, otp)
                .then((response) => {
                    resolve(response)
                    console.log("api methods" + response)
                })
                .catch((err) => {
                    reject(err)
                })
        } catch (error) {
            resolve({ status: 500, message: "somethings wrong" })
        }
    })
}

// ! resend otp
// ? POST
export const postResendOTP = (email) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(email);
            apiCall("post", userUrls.resendOtp, email)
                .then((response) => {
                    resolve(response);
                    console.log("apiMethods" + response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    });
};

export const googleAuthenticate = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.googleAuth, userData)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            resolve({ status: 500, message: "Somethings wrong." });
        }
    })
}

// ! User Login
// ?   POST
export const postLogin = (userData) => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", userUrls.login, userData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };
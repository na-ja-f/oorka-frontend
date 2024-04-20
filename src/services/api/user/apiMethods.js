import { apiCall } from "./apiCalls"
import { userUrls, postUrls } from "../endPoints"

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

// ! google authentication on signup and login
// ? POST
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

// ! forgot password
// ?   POST
export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("hello" + email);
      apiCall("post", userUrls.forgotPassword, email)
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

// ! forgot password otp sent
// ?   POST
export const forgotOtp = (otp) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.forgotOtp, otp)
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

// ! renew password
// ?   POST
export const resetPassword = (email) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.resetPassword, email)
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

// ! add a post
// ? POST
export const addPost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addPost, postData)
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
}

// ! get  all posts
// ? get
export const getPosts = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getPosts, userId)
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
}

// ! delete post
// ? DELETE 
export const deletePost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.deletePost, postData)
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
}

// ! edit post
// ? POST 
export const editPost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("put", postUrls.editPost, postData)
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
}
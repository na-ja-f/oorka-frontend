import { apiCall } from "./apiCalls"
import { userUrls, postUrls, connectionUrls } from "../endPoints"

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

// ! user posts
// ? GET 
export const getUserPost = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${postUrls.getUserPosts}/${userId}`
      apiCall("get", url, null)
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

// ! user details
// ? GET 
export const getUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.getUserDetails + `/${userId}`, null)
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

// ! get connections of a user
// ? POST 
export const getUserConnections = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.getConnection, userId)
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

// ! follow a user
// ? POST 
export const followUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.follow, data)
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

// ! un-follow a user
// ? POST 
export const unFollowUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.unFollow, data)
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

// ! get all requested  users
// ? POST 
export const getRequestedUsers = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.requestedUsers, userId)
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

// ! accept follow request
// ? POST 
export const acceptFollowRequest = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.acceptRequest, data)
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

// ! reject follow request
// ? POST 
export const rejectFollowRequest = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.rejectRequest, data)
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

// ! edit user profile
// ? POST 
export const editProfile = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrls.editProfile, userData)
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

// ! search users
// ? POST 
export const getSearchUsers = (searchTerm) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.searchUsers, searchTerm)
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

// ! like posts
// ? POST 
export const likePost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.likePost, postData)
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

// ! get comments count
// ? GET 
export const getCommentsCount = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${postUrls.commentsCount}/${postId}`
      apiCall("get", url, null)
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

// ! get comments
// ? GET 
export const getComments = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${postUrls.getComments}/${postId}`
      apiCall("get", url, null)
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

// ! add comment
// ? POST 
export const addComment = (commentData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addComment, commentData)
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

// ! reply comment
// ? POST 
export const replyComment = (commentData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.replyComment, commentData)
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

// ! delete comment
// ? DELETE 
export const deleteComment = (commentId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.deleteComment, commentId)
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

// ! save post 
// ? POST 
export const savePost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.savePost, postData)
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

// ! get saved post 
// ? GET 
export const getSavedPost = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${postUrls.getSavedPost}/${userId}`
      apiCall("get", url, null)
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
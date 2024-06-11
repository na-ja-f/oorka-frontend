import { apiCall } from "./apiCalls"
import { userUrls, postUrls, connectionUrls, chatUrl, storyUrl } from "../endPoints"

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
export const getPosts = (userId,searchTerm) => {
  return new Promise((resolve, reject) => {
    try {
      const requestData = searchTerm?.length!==0 ? { userId, searchTerm } : { userId };
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

// ! add new conversation 
// ? POST 
export const addConversation = (conversationData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addConversation, conversationData)
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


// ! get user conversations 
// ? GET 
export const getUserConversations = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getUserConversation}/${userId}`
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

// ! add new message 
// ? POST 
export const addMessage = (formData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addMessage, formData)
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

// ! get user messages
// ? GET 
export const getUserMessages = (conversationId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getMessages}/${conversationId}`;
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

// ! get cht eligible users 
// ? POST 
export const getChatEligibleUsers = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.getEligibleUsers, userId)
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

// ! set messages read
// ? PATCH 
export const setMessageRead = (messageData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", chatUrl.setMessageRead, messageData)
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

// ! get unread messages
// ? POST 
export const getUnreadMessages = (messageData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.getUnreadMessages, messageData)
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

// ! add a group
// ? POST 
export const addChatGroup = (conversationData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addChatGroup, conversationData)
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


// ! get user groups 
// ? GET 
export const getUserGroups = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getUserGroups}/${userId}`
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

// ! get last messages 
// ? GET 
export const getLastMessages = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", chatUrl.lastMessages, null)
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

// ! add  group message
// ? POST 
export const addGroupMessage = (formData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addGroupMessage, formData)
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

// ! get last group messages 
// ? GET 
export const getGroupMessages = (groupId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getGroupMessages}/${groupId}`;
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

// ! get last group messages 
// ? GET 
export const getLastGroupMessages = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", chatUrl.lastGroupMessages, null)
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

// ! report a post
// ? POST 
export const reportPost = (reportData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.reportPost, reportData)
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

// ! get transaction details
// ? POST 
export const getAllTransactions = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.allTransactions, userId)
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

// ! initial checkout
// ? POST 
export const initialCheckout = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.checkout, userId)
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

// ! validate checkout
// ? POST 
export const validatePayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.validate, paymentData)
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

// ! add Story
// ? POST 
export const addStory = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", storyUrl.addStory, postData)
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

// ! get Stories
// ? GET 
export const getStories = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${storyUrl.getStories}/${userId}`
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

// ! get Stories
// ? GET 
export const getUserStory = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${storyUrl.getUserStory}/${userId}`
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

// ! get Stories
// ? POST 
export const readStory = (storyData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", storyUrl.readStory, storyData)
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

// ! get hashtags
// ? GET 
export const getAllHashtags = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.getHashtags, null)
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

// ! get user suggestions
// ? GET 
export const getUserSuggestions = ({userId, searchTerm}) => {
  return new Promise((resolve, reject) => {
    try {
      const requestData = searchTerm?.length!==0 ? { userId, searchTerm } : { userId };
      apiCall("post", userUrls.userSuggestions, requestData)
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

// ! get notifications
// ? GET 
export const getNotifications = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.getNotifications, userId)
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


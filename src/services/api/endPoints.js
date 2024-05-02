export const userUrls = {
    register: "/register",
    registerOtp: "/register-otp",
    resendOtp: "/resend-otp",
    googleAuth: "/google-auth",
    login: "/login",
    forgotPassword: "/forgot-password",
    forgotOtp: "/forgot-otp",
    resetPassword: "/reset-password",
    getUserDetails: "/user-details",
    editProfile: "/edit-profile",
    searchUsers: "/search-users",
}

export const postUrls = {
    addPost: '/post/add-post',
    getPosts: '/post/get-post',
    deletePost: '/post/delete-post',
    editPost: '/post/edit-post',
    getUserPosts: '/post/user-post',
    likePost: '/post/like-post',
    commentsCount: '/post/comments-count',
    getComments: '/post/get-comments',
    addComment: '/post/add-comment',
    replyComment: '/post/reply-comment',
    deleteComment: '/post/delete-comment',

}

export const adminUrl = {
    login: "/admin/login",
    userList: "/admin/get-users",
    userBlock: "/admin/user-block",
}

export const connectionUrls = {
    getConnection: "/connection/get-connection",
    follow: "/connection/follow",
    unFollow: "/connection/unfollow",
    acceptRequest: "/connection/accept-request",
    rejectRequest: "/connection/reject-request",
    requestedUsers: "/connection/get-requested-users",
}
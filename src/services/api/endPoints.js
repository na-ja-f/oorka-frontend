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
    checkout: "/checkout-user",
    validate: "/validate-payment",
    allTransactions: "/get-transactions",
    getHashtags: "/get-hashtags",
    userSuggestions: "/user-suggestions",
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
    savePost: 'post/save-post',
    getSavedPost: 'post/saved-post',
    reportPost: "/post/report-post",
}

export const adminUrl = {
    login: "/admin/login",
    userList: "/admin/get-users",
    userBlock: "/admin/user-block",
    postBlock: "/admin/post-block",
    getReports: "/admin/get-reports",
    postList: "/admin/get-posts",
    getTransactions: '/admin/transactions',
    hashtagList: "/admin/hashtags",
    addHashtag: "/admin/add-hashtag",
    blockHashtag: "/admin/block-hashtag",
    editHashtag: "/admin/edit-hashtag",
    chartData: '/admin/chart-data',
    dashboardStats: '/admin/dashboard-stats',
}

export const connectionUrls = {
    getConnection: "/connection/get-connection",
    follow: "/connection/follow",
    unFollow: "/connection/unfollow",
    acceptRequest: "/connection/accept-request",
    rejectRequest: "/connection/reject-request",
    requestedUsers: "/connection/get-requested-users",
}

export const chatUrl = {
    addConversation: '/chat/add-conversation',
    getUserConversation: '/chat/get-conversations',
    addMessage: "/chat/add-message",
    getMessages: "/chat/get-messages",
    getEligibleUsers: "/chat/chat-eligible-users",
    addGroupMessage: "/chat/add-group-message",
    getGroupMessages: "/chat/get-group-messages",
    getUserGroups: "/chat/get-groups",
    lastMessages: "/chat/get-last-messages",
    lastGroupMessages: "/chat/last-group-messages",
    setMessageRead: "/chat/set-message-read",
    getUnreadMessages: '/chat/get-unread-messages',
    addChatGroup: "/chat/add-chat-group",
}

export const storyUrl = {
    addStory: "/story/add-story",
    getStories: "/story/get-stories",
    readStory: '/story/read-story',
    getUserStory: '/story/get-user-story'
};
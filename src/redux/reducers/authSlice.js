import { createSlice } from '@reduxjs/toolkit'

const userInitialState = {
    user: null,
    token: null,
    posts: []
}

const authSlice = createSlice({
    name: "auth",
    initialState: userInitialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.user.token
        },      
        logout(state) {
            state.user = null;
            state.token = null;
            state.posts = [];
        },
        setPosts(state, action) {
            state.posts = action.payload.posts;
        }
    }
})

export const { loginSuccess, logout, setPosts } = authSlice.actions
export default authSlice.reducer


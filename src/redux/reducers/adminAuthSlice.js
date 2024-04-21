import { createSlice } from '@reduxjs/toolkit'

const AdminInitailState = {
    admin: null,
    token: null,
}

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState: AdminInitailState,
    reducers: {
        AdminLoginSuccess: (state, action) => {
            state.admin = action.payload.admin
            state.token = action.payload.token
        },
        AdminLogout: (state) => {
            state.admin = null
            state.token = null
        }
    }
})

export const { AdminLoginSuccess, AdminLogout } = adminAuthSlice.actions
export default adminAuthSlice.reducer
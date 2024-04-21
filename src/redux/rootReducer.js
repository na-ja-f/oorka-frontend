import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import adminAuthReducer from './reducers/adminAuthSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    adminAuth: adminAuthReducer,
})

export default rootReducer
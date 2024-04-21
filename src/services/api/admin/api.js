import axios from "axios";
import { store } from "../../../redux/store"
import { BASE_URL } from "../../../constants/baseURL"

export const adminApi = axios.create({
    baseURL:`${BASE_URL}/api`
})

adminApi.interceptors.request.use(
    async(config) => {
        console.log('hiiii');
        const state = store.getState();
        const authToken = state.adminAuth.token

        config.headers["Authorization"] = `Bearer ${authToken}`

        return config
    },
    async(error) => {
        return Promise.reject(error)
    }
)
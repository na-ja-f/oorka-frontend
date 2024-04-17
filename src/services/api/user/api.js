import axios from "axios";
import { store } from "../../../redux/store"
import { BASE_URL } from "../../../constants/baseURL"

export const api = axios.create({
    withCredentials:true,
    baseURL:`${BASE_URL}/api`
})

api.interceptors.request.use(
    async(config) => {
        const state = store.getState();
        const authToken = state.auth.token

        config.headers["Authorization"] = `Bearer ${authToken}`

        return config
    },
    async(error) => {
        return Promise.reject(error)
    }
)
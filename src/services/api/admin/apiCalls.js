import { toast } from "sonner";
import { adminApi } from "./api"
import { store } from "../../../redux/store"
import { AdminLogout } from "../../../redux/reducers/adminAuthSlice";

export const adminApiCalls = async (method, url, data) => {
    return await new Promise(async (resolve, reject) => {
        try {
            let response, error;

            if (method === "post") {
                response = await adminApi.post(url, data).catch((err) => {
                    error = err
                })
            } else if (method === "get") {
                response = await adminApi.get(url, data).catch((err) => {
                    error = err
                })
            } else if (method === "patch") {
                response = await adminApi.patch(url, data).catch((err) => {
                    error = err
                })
            } else if (method === "delete") {
                response = await adminApi.delete(url, data).catch((err) => {
                    error = err
                })
            } else if (method === "put") {
                response = await adminApi.put(url, data).catch((err) => {
                    error = err
                })
            }

            if (response) {
                resolve(response)
            } else if (error) {
                if (error?.response?.status == 401) {
                    toast.error("User is blocked");
                    store.dispatch(AdminLogout());
                    return
                }

                reject(error?.response?.data)
            }

        } catch (err) {
            reject(err?.response?.data)
        }
    })
}

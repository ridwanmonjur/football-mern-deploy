import { toast } from "react-toastify"

export const toastError = (error)=>{
    toast.error(`${error.response?.status || ""} Error: ${error.response?.data?.message || error.message}`)
}
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { AuthContext } from "@/context/auth";
import configuredAxios from "../../api/configuredAxios";

export const SigninForm = ({ switchToSignup }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const signinFormRef = useRef(null)
    const { setUserAuthInfo } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data, event) => {
        setLoading(true);
        event.preventDefault();
        configuredAxios.post("/login", { ...data })
            .then((response) => {
                setLoading(false);
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setUserAuthInfo(response.data)
                router.push("/todo")
            })
            .catch((error) => {
                if (loading) setLoading(false);
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            })
    }

    return (
        <div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form
                    className="space-y-4 md:space-y-6" action="#"
                    ref={signinFormRef}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input  {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input  {...register("password")} type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">

                            <div className="flex items-center h-5">
                                <input id="remember" {...register("remember")} aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                    </div>
                    <button type="submit"
                        className={`${loading ? "loading" : ""} w-full text-white bg-blue-600 hover:blue-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a onClick={() => { switchToSignup() }} className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import configuredAxios from "../../api/configuredAxios";

export const SignupForm = ({ switchToSignin }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const signupFormRef = useRef(null)
    const onSubmit = async (data, event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await configuredAxios.post("/signup", { ...data })
            await setTimeout(() => {
                setLoading(false);
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }, 3000);
        }
        catch (error) {
            if (loading) setLoading(false);
            toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
        }
    }
    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign up for your new account
                </h1>
                <form
                    className="space-y-4 md:space-y-6"
                    ref={signupFormRef}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" {...register("name")} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" {...register("email")} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" {...register("password")} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="password" {...register("confirmPassword")} id="retype=password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <button type="submit"
                        className={`${loading ? "loading" : ""} w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
                        Sign up
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an accoun? <a onClick={() => { switchToSignin() }} className="font-medium text-green-600 cursor-pointer hover:underline dark:text-green-500">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

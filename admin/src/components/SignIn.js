import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { AuthContext } from "@/context/auth";
import fetchWithCookie from "../../api/fetchClient";
import { Input, Label, Button } from '@/components/sharing/form'

export const SigninForm = ({ switchToSignup }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const signinFormRef = useRef(null)
    const { setAccessTokenClient } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data, event) => {
        setLoading(true);
        event.preventDefault();
        fetchWithCookie.post("/login", { ...data })
            .then((response) => {
                setLoading(false);
                toast.success("Successful login", {
                    position: toast.POSITION.TOP_RIGHT
                });
                console.log({response})
                setAccessTokenClient(response.token)
                router.push("/product")
            })
            .catch((error) => {
                // console.log({error, message: error?.response?.data?.message })
                if (loading) setLoading(false);
                toast.error(`${error?.response?.status || "Client"} Error: ${error?.response?.data?.message || error.message}`)
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
                        <Label htmlFor="email">Your email</Label>
                        <Input {...register("email")} type="email" id="email" placeholder="Your email" required="" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} type="password" id="password" placeholder="••••••••" required="" />
                    </div>

                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                    </div>
                    <Button type="submit"
                        classNames={`${loading ? "loading" : ""}`}>
                        Sign in
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a onClick={() => { switchToSignup() }} className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

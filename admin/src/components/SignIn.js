import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { AuthContext } from "@/context/auth";
import fetchWithCookie from "../../api/fetchClient";
import { Input, Label, ButtonSignIn } from '@/components/sharing/form'
import { toastError, toastSuccess } from "@/utils/toast";
import QueryString from "qs";

export const SigninForm = ({ switchToSignup }) => {
    const { register, handleSubmit } = useForm();
    const router = useRouter()
    const { password, username } = router.query
    const signinFormRef = useRef(null)
    const { setAccessTokenClient } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const onSubmit = (data, event) => {
        setLoading(true);
        event.preventDefault();
        fetchWithCookie.post("/login", { ...data })
            .then((response) => {
                setLoading(false);
                toastSuccess("Successful login")
                setAccessTokenClient(response.token)
                router.push("/product")
            })
            .catch((error) => {
                setLoading(false);
                toastError(error)
            })
    }
    useEffect(() => {
        if (password != undefined && username != undefined) {
            reset ({username, password});
            document.getElementById("submit").click();

        }
    }
    , [router.query.password, router.query.name])
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
                    <ButtonSignIn type="submit"
                        id="submit"
                        classNames={`${loading ? "loading" : ""}`}>
                        Sign in
                    </ButtonSignIn>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <a onClick={() => { switchToSignup() }} className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

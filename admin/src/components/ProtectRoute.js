import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const { accessToken } = authContext;
    console.log({accessToken})
    useEffect(() => {
        if (accessToken==undefined && router.pathname !== "/") {
            router.push("/");
        }
        if (accessToken!=undefined && router.pathname === "/") {
            router.push("/product");
        } 
    }, [router.pathname])
    return children;
};
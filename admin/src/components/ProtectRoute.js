import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const { refreshToken } = authContext;
    console.log({refreshToken})
    useEffect(() => {
        if (refreshToken===null && router.pathname !== "/") {
            router.push("/");
        }
        if (refreshToken!==null && router.pathname === "/") {
            router.push("/product");
        } 
    }, [router.pathname])
    return children;
};
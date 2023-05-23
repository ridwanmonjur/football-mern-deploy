import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isUserAuthenticated;
    useEffect(() => {
        if (!isLoggedIn && router.pathname !== "/") {
            router.push("/");
        }
        if (isLoggedIn && router.pathname === "/") {
            router.push("/product");
        } 
    }, [router.pathname])
    return children;
};
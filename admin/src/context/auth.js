import { createContext, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { maxAgeAccessoken } from "@/utils/const";
import { toast } from "react-toastify";
import fetchClient from "../../api/fetchClient";
import { useRouter } from "next/router";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN));

  const setAccessTokenClient = (myToken) => {
    setCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, myToken, {maxAge: maxAgeAccessoken});
    setAccessToken(getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN));
  };

  const handleLogout = () => {
    try {
        deleteAcessToken();
        router.replace("/")
    }
    catch (error) {
        toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
    }
}
  console.log({accessToken})

  const deleteAcessToken = () => {
    deleteCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN)
    // http-only cookie can be only cleared server-side with server-side method
    // deleteCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN)
    setAccessToken(null);
  }

  return (
    <Provider
      value={{
        setAccessTokenClient,
        handleLogout: ()=> handleLogout(),
        accessToken,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
import { createContext, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { maxAgeAccessoken } from "@/utils/const";
import { useRouter } from "next/router";
import { toastError } from "@/utils/toast";

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
       toastError(error)
    }
}
  const deleteAcessToken = () => {
    deleteCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN)
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
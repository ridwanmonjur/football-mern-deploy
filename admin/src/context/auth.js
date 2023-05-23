import { createContext, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { refreshToken } from "../../api/fetchClient";
import { maxAgeAccessoken } from "@/utils/const";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState(getCookie(process.env.CLIENT_COOKIE_REFRESH_TOKEN));

  const setAccessTokenClient = (myToken) => {
    setCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, myToken, {maxAge: maxAgeAccessoken});
    setRefreshToken(getCookie(process.env.CLIENT_COOKIE_REFRESH_TOKEN));
  };

  console.log({refreshToken})

  const deleteBothTokens = () => {
    deleteCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN)
    // http-only cookie can be only cleared server-side with server-side method
    // deleteCookie(process.env.CLIENT_COOKIE_REFRESH_TOKEN)
    setRefreshToken(null);
  }

  return (
    <Provider
      value={{
        setAccessTokenClient,
        deleteBothTokens,
        refreshToken,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
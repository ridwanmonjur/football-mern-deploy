import { createContext, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN));

  const setUserAuthInfo = (myToken) => {
    setCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, myToken);
    setAuthState(myToken);
  };

  const setAuthStateNull = () => { 
    setAuthState(null); 
    deleteCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN)
  }

  return (
    <Provider
      value={{
        authState,
        setUserAuthInfo,
        setAuthStateNull: ()=> setAuthStateNull(),
        isUserAuthenticated: !!authState,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
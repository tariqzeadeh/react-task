import React, { useState, useContext } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedHandler = (value) => {
    setIsLoggedIn(value);
  };

  const values = {
    isLoggedIn,
    setIsLoggedIn : loggedHandler,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

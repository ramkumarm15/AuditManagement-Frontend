import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState({
    isLoggedIn: false,
  });

  const stateValue = {
    auth,
    setAuth,
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};

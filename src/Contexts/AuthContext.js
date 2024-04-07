import React, { createContext, useState } from "react";
import { authClient } from "../Client/Authentication/Login";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const login = async (username, password) => {
    try {
      await authClient.login(username, password);
      setAccessToken(authClient.accessToken);
      console.log(authClient.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = () => {
    authClient.logout();
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const authContextValue = {
    accessToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

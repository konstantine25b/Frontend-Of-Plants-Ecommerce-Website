import React, { createContext, useEffect, useState } from "react";
import { authClient } from "../Client/Authentication/Login";
import { clientCustomers } from "../Client/users/Customer";
import { clientVendors } from "../Client/users/Vendor"; // Import Vendor Client
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation
  async function fetchUserData(accessToken, role) {
    try {
      // Call the appropriate client method based on the role
      const userData =
        role === "Customer"
          ? await clientCustomers.getCustomer(accessToken)
          : await clientVendors.getVendor(accessToken);

      if (userData) {
        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }


  useEffect(() => {
    let prevUser = JSON.parse(localStorage.getItem("user"));
    if (prevUser) {
      fetchUserData(localStorage.getItem("accessToken"), prevUser.role);
    }
  }, []);

 
  const login = async (username, password, role) => {
    try {
      await authClient.login(username, password);
      setAccessToken(localStorage.getItem("accessToken"));
      fetchUserData(localStorage.getItem("accessToken"), role);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const authContextValue = {
    accessToken,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

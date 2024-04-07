import React, { createContext, useState } from "react";
import { authClient } from "../Client/Authentication/Login";
import { useNavigate } from "react-router-dom";
import { clientCustomers } from "../Client/users/Customer";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation

  async function fetchCustomerData() {
    try {
      // Call the getCustomer method to fetch customer data
      const customer = await clientCustomers.getCustomer();
      if (customer) {
        console.log("Customer data:", customer);
      } else {
        console.log("Failed to fetch customer data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const login = async (username, password) => {
    try {
      await authClient.login(username, password);
      setAccessToken(authClient.accessToken);

      fetchCustomerData();
      // navigate("/");
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

import React, { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (userData, token, role) => {
    setUser(userData);
    Cookies.set("token", token, { expires: 7, path: "/" }); // expires in 7 days, path can be set to "/"
    setRole(role);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", JSON.stringify(role));

  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    // Retrieve cookie and localStorage data
    const accessToken = Cookies.get("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    console.log("AccessToken:", accessToken); // Debugging output
    console.log("StoredUser:", storedUser);
    console.log("StoredRole:", storedRole);

    // If user is stored in localStorage and token exists in cookies, authenticate
    if (accessToken && storedUser && storedRole) {
      try {
        setUser(JSON.parse(storedUser));
        setRole(JSON.parse(storedRole));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user or role from localStorage:", error);
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
    }

    setLoading(false);
  }, []); // Empty dependency array so it runs only once

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, role, Loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;

import React, { useEffect, useContext, useState, createContext } from "react";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const value = {
    authToken,
    setAuthToken,
    isLoggedIn,
    setIsLoggedIn,
    logout,
    role,
    setRole
  };
 

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

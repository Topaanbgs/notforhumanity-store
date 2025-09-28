import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    const isStaff = email.endsWith("@nfhmn.staff.com");
    setUser({ email });
    if (isStaff) navigate("/admin");
    else navigate("/");
  };

  const signup = (fullname, email, password) => {
    return true;
  };

  const logout = () => {
    setUser(null);
    navigate("/signin");
  };

  return <AuthContext.Provider value={{ user, login, logout, signup }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// src/auth/AuthProvider.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("reactCardLogin") === "true";
  });

  console.log("AuthProvider: isAuth =", isAuth); // Отладка

  useEffect(() => {
    localStorage.setItem("reactCardLogin", isAuth);
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
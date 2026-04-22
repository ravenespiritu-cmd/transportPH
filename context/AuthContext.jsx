"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsedUser);
      setRole(parsedUser.role || null);
    }
  }, []);

  const login = (nextToken, nextUser) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
    setRole(nextUser?.role || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setRole(null);
    window.location.href = "/login";
  };

  const value = useMemo(() => ({ user, token, role, login, logout }), [user, token, role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { createContext, useState, useCallback } from "react";

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Récupération depuis localStorage ou sessionStorage
  const getStoredUser = () => {
    const localUser = localStorage.getItem("user");
    const sessionUser = sessionStorage.getItem("user");
    return localUser
      ? JSON.parse(localUser)
      : sessionUser
      ? JSON.parse(sessionUser)
      : null;
  };

  const getStoredToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const [user, setUserState] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);

  // Wrapper for setUser that persists to storage
  const setUser = useCallback((userData) => {
    setUserState(userData);

    // Only persist if userData is not null
    if (userData === null) {
      return;
    }

    // Determine which storage to use based on where the token or user is currently stored
    const isLocalStorage =
      localStorage.getItem("token") !== null ||
      localStorage.getItem("user") !== null;

    if (isLocalStorage) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

  const login = (userData, jwt, rememberMe) => {
    setUser(userData);
    setToken(jwt);

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwt);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", jwt);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const logout = async () => {
    if (token) {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      await fetch(`${apiUrl}/users/sign_out`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }

    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
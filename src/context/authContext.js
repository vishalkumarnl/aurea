import { createContext, useState, useEffect } from "react";
import api from "api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login when app loads
  useEffect(() => {
    api.get("/user/profile")
      .then(res => {
        setUser(res.data.user);
      })
      .catch(async () => {
        // Access token might be expired → try refresh
        try {
          await api.post("/auth/refresh");
          const me = await api.get("/user/profile");
          setUser(me.data.user);
        } catch (e) {
          setUser(undefined);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async ({email,mobile, password}) => {
    const res = await api.post("/auth/login", { email,mobile, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login,loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

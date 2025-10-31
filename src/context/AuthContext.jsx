import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // mock: switch role to "customer" / "staff" / "technician" / "admin"
  const [user, setUser] = useState({ id: 1, name: "Nguyễn Khách", role: "customer" });
  const loginAs = (role) => setUser({ id: 1, name: "Demo", role });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

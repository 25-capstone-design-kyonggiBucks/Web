"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
  userRole: "admin" | "user" | null;
  setUserRole: (role: "admin" | "user" | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  setUserRole: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

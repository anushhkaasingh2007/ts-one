import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, getToken, setToken } from "@/lib/api";
import type { Student } from "@/types";

interface AuthContextValue {
  student: Student | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    api
      .get<Student>("/auth/me")
      .then(setStudent)
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, student: s } = await api.post<{ token: string; student: Student }>(
      "/auth/login",
      { email, password }
    );
    setToken(token);
    setStudent(s);
  };

  const logout = () => {
    setToken(null);
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

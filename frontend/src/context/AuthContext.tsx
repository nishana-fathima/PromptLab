import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, apiPost } from "../services/api";

export type User = { id: string; email: string; name: string };
type AuthContextValue = { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { api<{ user: User }>("/auth/me").then((result) => setUser(result.user)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const login = async (email: string, password: string) => { const result = await apiPost<{ user: User }>("/auth/login", { email, password }); setUser(result.user); };
  const register = async (name: string, email: string, password: string) => { const result = await apiPost<{ user: User }>("/auth/register", { name, email, password }); setUser(result.user); };
  const logout = async () => { await apiPost<void>("/auth/logout", {}); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used within AuthProvider"); return value; }

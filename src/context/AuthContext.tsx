// Auth context sederhana berbasis localStorage (demo only)
// Pada production, ganti dengan JWT dari backend Express + NextAuth
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DEMO_USERS, User, Role } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string, role: Role) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const USER_KEY = "dyylearning_user";
const ALL_USERS_KEY = "dyylearning_all_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const rawAll = localStorage.getItem(ALL_USERS_KEY);
    const merged = [...DEMO_USERS];
    if (rawAll) {
      const stored: User[] = JSON.parse(rawAll);
      stored.forEach(u => {
        if (!merged.find(m => m.email === u.email)) merged.push(u);
      });
    }
    return merged;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial sync check if needed, but useState already handles first load
  }, []);

  const persistUser = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
  };

  const persistAllUsers = (users: User[]) => {
    setAllUsers(users);
    // Filter out demo users before saving to localStorage to avoid redundancy
    const nonDemo = users.filter(u => !DEMO_USERS.find(d => d.email === u.email));
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(nonDemo));
  };

  const login: AuthContextType["login"] = (email, password) => {
    const found = allUsers.find((u) => u.email === email);
    if (!found) return { ok: false, error: "Email tidak terdaftar" };
    
    // Check password
    if (found.password && password !== found.password) {
      return { ok: false, error: "Password salah" };
    }
    
    // For demo users that might not have password in allUsers yet (fallback)
    if (!found.password && password !== "password123") {
      return { ok: false, error: "Password salah (gunakan: password123)" };
    }

    persistUser(found);
    return { ok: true };
  };

  const register: AuthContextType["register"] = (name, email, password, role) => {
    if (allUsers.find((u) => u.email === email)) return { ok: false, error: "Email sudah terdaftar" };
    if (password.length < 6) return { ok: false, error: "Password minimal 6 karakter" };
    
    const u: User = { id: `u${Date.now()}`, name, email, role, password };
    const newUsers = [...allUsers, u];
    persistAllUsers(newUsers);
    persistUser(u);
    return { ok: true };
  };

  const logout = () => persistUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus di dalam AuthProvider");
  return ctx;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { hashPassword } from "../../shared/utils/crypto";
import type { RegisterData, User, LoginData } from "../types";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  usersRegistered: RegisterData[];
  setUsersRegistered: (users: RegisterData[]) => void;
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  isAuthenticated: false as boolean,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  token: null as string | null,
  setToken: (token: string | null) => set({ token }),
  user: null as User | null,
  setUser: (user: User | null) => set({ user }),
  usersRegistered: [] as RegisterData[],
  setUsersRegistered: (users: RegisterData[]) => set({ usersRegistered: users }),
}), {
  name: 'auth-storage',
}));
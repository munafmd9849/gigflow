import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthenticatedUser } from "../types/auth.types";

interface AuthState {
  user: AuthenticatedUser | null;
  token: string | null;
  setAuth: (user: AuthenticatedUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "gigflow-auth",
    },
  ),
);

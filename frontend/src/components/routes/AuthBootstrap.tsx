import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { useAuthStore } from "../../stores/auth.store";

interface AuthBootstrapProps {
  children: ReactNode;
}

export const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const authQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (authQuery.data) {
      setUser(authQuery.data);
    }
  }, [authQuery.data, setUser]);

  useEffect(() => {
    if (authQuery.isError) {
      logout();
    }
  }, [authQuery.isError, logout]);

  if (token && authQuery.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-600 shadow-sm">
          Loading GigFlow...
        </div>
      </div>
    );
  }

  return children;
};

import { LogOut, Menu } from "lucide-react";
import type { AuthenticatedUser } from "../../types/auth.types";

interface DashboardNavbarProps {
  user: AuthenticatedUser | null;
  onOpenSidebar: () => void;
  onLogout: () => void;
}

export const DashboardNavbar = ({ user, onOpenSidebar, onLogout }: DashboardNavbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-md border border-white/10 p-2 text-neutral-400 hover:bg-white/10 hover:text-white lg:hidden transition"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm font-semibold text-white">Lead Operations</p>
          <p className="hidden text-xs text-neutral-400 sm:block">Manage pipeline activity and exports</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-white">{user?.name ?? "User"}</p>
          <p className="text-xs text-neutral-400">{user?.email}</p>
        </div>
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
          {user?.role ?? "User"}
        </span>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-md border border-white/10 p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

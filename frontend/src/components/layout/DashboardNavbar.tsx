import { LogOut, Menu } from "lucide-react";
import type { AuthenticatedUser } from "../../types/auth.types";

interface DashboardNavbarProps {
  user: AuthenticatedUser | null;
  onOpenSidebar: () => void;
  onLogout: () => void;
}

export const DashboardNavbar = ({ user, onOpenSidebar, onLogout }: DashboardNavbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-950">Lead Operations</p>
          <p className="hidden text-xs text-slate-500 sm:block">Manage pipeline activity and exports</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-950">{user?.name ?? "User"}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          {user?.role ?? "User"}
        </span>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

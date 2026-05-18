import { BarChart3, LogOut, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
] as const;

export const DashboardSidebar = ({ isOpen, onClose, onLogout }: DashboardSidebarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,calc(100vw-2rem))] flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl transition-transform lg:static lg:w-72 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div>
            <p className="text-lg font-semibold text-white">GigFlow</p>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">CRM Dashboard</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-neutral-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-400 hover:bg-white/10 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

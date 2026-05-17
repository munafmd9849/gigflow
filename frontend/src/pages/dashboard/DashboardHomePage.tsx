import { ArrowRight, Database, Download, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

const stats = [
  { label: "Protected API", value: "JWT", icon: ShieldCheck },
  { label: "Lead workflows", value: "CRUD", icon: Users },
  { label: "Data tools", value: "CSV", icon: Download },
  { label: "Persistence", value: "MongoDB", icon: Database },
] as const;

export const DashboardHomePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">
              Welcome back, {user?.name ?? "there"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Monitor lead activity, manage pipeline records, and export operational data from a focused SaaS-style
              dashboard.
            </p>
          </div>
          <Link
            to="/dashboard/leads"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Manage leads
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{stat.value}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-100 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

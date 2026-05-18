import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getDashboardStats } from "../../services/stats.service";
import { useAuthStore } from "../../stores/auth.store";

const COLORS = {
  New: "#60A5FA", // blue-400
  Contacted: "#FBBF24", // amber-400
  Qualified: "#34D399", // emerald-400
  Lost: "#F87171", // red-400
};

export const DashboardHomePage = () => {
  const user = useAuthStore((state) => state.user);

  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 60000,
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400">Dashboard</p>
            <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Welcome back, {user?.name ?? "there"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-300">
              Monitor lead activity, manage pipeline records, and export operational data from a focused SaaS-style dashboard.
            </p>
          </div>
          <Link
            to="/dashboard/leads"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition"
          >
            Manage leads
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl h-24 bg-white/5 border border-white/10 backdrop-blur-md animate-pulse" />
            ))}
          </section>
          <div className="text-center text-sm text-neutral-500 py-10">Loading charts...</div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="text-center text-sm text-neutral-500 py-10">
          Could not load stats. Please try again.
        </div>
      )}

      {/* Loaded state */}
      {stats && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl p-4 bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-blue-500 shadow-lg shadow-black/5">
              <p className="text-[13px] text-neutral-400 mb-1">Total leads</p>
              <p className="text-[28px] font-semibold text-white">{stats.totalLeads}</p>
            </div>
            <div className="rounded-xl p-4 bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-emerald-500 shadow-lg shadow-black/5">
              <p className="text-[13px] text-neutral-400 mb-1">Qualified</p>
              <p className="text-[28px] font-semibold text-white">{stats.byStatus["Qualified"] ?? 0}</p>
            </div>
            <div className="rounded-xl p-4 bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-purple-500 shadow-lg shadow-black/5">
              <p className="text-[13px] text-neutral-400 mb-1">Conversion rate</p>
              <p className="text-[28px] font-semibold text-white">{stats.conversionRate}%</p>
            </div>
            <div className="rounded-xl p-4 bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-red-500 shadow-lg shadow-black/5">
              <p className="text-[13px] text-neutral-400 mb-1">Lost</p>
              <p className="text-[28px] font-semibold text-white">{stats.byStatus["Lost"] ?? 0}</p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col shadow-lg shadow-black/5">
              <h3 className="text-sm font-medium text-white mb-4">Leads by status</h3>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      stroke="none"
                      dataKey="value"
                    >
                      {Object.entries(stats.byStatus).map(([name]) => (
                        <Cell key={name} fill={COLORS[name as keyof typeof COLORS] || "#CBD5E1"} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)", color: "#fff" }} itemStyle={{ color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                {Object.keys(stats.byStatus).map((key) => (
                  <div key={key} className="flex items-center gap-2 text-[13px] text-neutral-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[key as keyof typeof COLORS] || "#CBD5E1" }} />
                    {key}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col shadow-lg shadow-black/5">
              <h3 className="text-sm font-medium text-white mb-4">Leads by source</h3>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={Object.entries(stats.bySource).map(([name, value]) => ({ name, value }))}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#a3a3a3' }} />
                    <YAxis allowDecimals={false} fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#a3a3a3' }} />
                    <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)", color: "#fff" }} itemStyle={{ color: "#fff" }} />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col shadow-lg shadow-black/5">
            <h3 className="text-sm font-medium text-white mb-4">Leads over time</h3>
            <div className="w-full min-h-[260px]">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={stats.leadsOverTime.map(d => ({ ...d, date: d.date.substring(5) }))}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#a3a3a3' }} />
                  <YAxis allowDecimals={false} fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#a3a3a3' }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)", color: "#fff" }} itemStyle={{ color: "#fff" }} />
                  <Area type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

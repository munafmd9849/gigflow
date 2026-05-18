import type { LeadStatus } from "../../types/lead.types";

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusStyles: Record<LeadStatus, string> = {
  New: "border-blue-500/30 bg-blue-500/20 text-blue-400",
  Contacted: "border-amber-500/30 bg-amber-500/20 text-amber-400",
  Qualified: "border-emerald-500/30 bg-emerald-500/20 text-emerald-400",
  Lost: "border-red-500/30 bg-red-500/20 text-red-400",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

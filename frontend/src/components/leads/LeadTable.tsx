import { Edit2, Eye, Trash2 } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import type { Lead } from "../../types/lead.types";
import { formatDate } from "../../utils/date";

interface LeadTableProps {
  leads: Lead[];
  canDelete: boolean;
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onViewDetail: (id: string) => void;
}

export const LeadTable = ({ leads, canDelete, isLoading, onEdit, onDelete, onViewDetail }: LeadTableProps) => {
  if (isLoading) {
    return <LeadTableSkeleton />;
  }

  if (leads.length === 0) {
    return (
      <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center backdrop-blur-md">
        <div>
          <h3 className="text-base font-semibold text-white">No leads found</h3>
          <p className="mt-1 text-sm text-neutral-400">Create a lead or adjust your filters to see results.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 p-3 md:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{lead.name}</p>
                <p className="mt-1 truncate text-sm text-neutral-300">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-medium uppercase text-neutral-500">Source</p>
                <p className="mt-1 text-neutral-300">{lead.source}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-neutral-500">Created</p>
                <p className="mt-1 text-neutral-300">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => onViewDetail(lead.id)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition"
              >
                <Eye className="h-4 w-4" />
                View
              </button>
              <button
                type="button"
                onClick={() => onEdit(lead)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              {canDelete ? (
                  <button
                  type="button"
                  onClick={() => onDelete(lead)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-rose-500/20 px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[860px] w-full border-collapse text-left text-white">
          <thead className="bg-white/5 text-xs font-semibold uppercase text-neutral-400 border-b border-white/10">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{lead.name}</p>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-300">{lead.email}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-sm text-neutral-300">{lead.source}</td>
                <td className="px-4 py-3 text-sm text-neutral-300">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onViewDetail(lead.id)}
                      className="rounded-md border border-white/10 p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition"
                      aria-label={`View details for ${lead.name}`}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="rounded-md border border-white/10 p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition"
                      aria-label={`Edit ${lead.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={() => onDelete(lead)}
                        className="rounded-md border border-rose-500/20 p-2 text-rose-400 hover:bg-rose-500/10 transition"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const LeadTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="space-y-3 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((__, cellIndex) => (
              <div key={cellIndex} className="h-9 animate-pulse rounded-md bg-white/10" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

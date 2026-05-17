import { Edit2, Trash2 } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import type { Lead } from "../../types/lead.types";
import { formatDate } from "../../utils/date";

interface LeadTableProps {
  leads: Lead[];
  canDelete: boolean;
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadTable = ({ leads, canDelete, isLoading, onEdit, onDelete }: LeadTableProps) => {
  if (isLoading) {
    return <LeadTableSkeleton />;
  }

  if (leads.length === 0) {
    return (
      <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <div>
          <h3 className="text-base font-semibold text-slate-950">No leads found</h3>
          <p className="mt-1 text-sm text-slate-500">Create a lead or adjust your filters to see results.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 p-3 md:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-950">{lead.name}</p>
                <p className="mt-1 truncate text-sm text-slate-600">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">Source</p>
                <p className="mt-1 text-slate-700">{lead.source}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">Created</p>
                <p className="mt-1 text-slate-700">{formatDate(lead.createdAt)}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(lead)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              {canDelete ? (
                <button
                  type="button"
                  onClick={() => onDelete(lead)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
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
        <table className="min-w-[860px] w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/70">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-950">{lead.name}</p>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{lead.email}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{lead.source}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                      aria-label={`Edit ${lead.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={() => onDelete(lead)}
                        className="rounded-md border border-rose-200 p-2 text-rose-600 hover:bg-rose-50"
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
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="space-y-3 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((__, cellIndex) => (
              <div key={cellIndex} className="h-9 animate-pulse rounded-md bg-slate-100" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

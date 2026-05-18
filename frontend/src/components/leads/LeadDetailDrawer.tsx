import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Clock, FileText, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addNote, getLeadDetail } from "../../services/lead.service";
import type { ActivityType } from "../../types/lead.types";
import { formatDate } from "../../utils/date";
import { StatusBadge } from "../ui/StatusBadge";

interface LeadDetailDrawerProps {
  leadId: string | null;
  onClose: () => void;
}

export const LeadDetailDrawer = ({ leadId, onClose }: LeadDetailDrawerProps) => {
  const queryClient = useQueryClient();
  const [noteContent, setNoteContent] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lead-detail", leadId],
    queryFn: () => getLeadDetail(leadId!),
    enabled: !!leadId,
  });

  const addNoteMutation = useMutation({
    mutationFn: (note: string) => addNote(leadId!, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lead-detail", leadId] });
      toast.success("Note added");
      setNoteContent("");
    },
    onError: () => {
      toast.error("Failed to add note");
    },
  });

  if (!leadId) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getActivityLabel = (type: ActivityType, meta: any, actorName: string) => {
    switch (type) {
      case "lead_created":
        return `${actorName} created this lead`;
      case "status_changed":
        return `${actorName} changed status · ${meta.from || "None"} → ${meta.to}`;
      case "source_changed":
        return `${actorName} changed source · ${meta.from || "None"} → ${meta.to}`;
      case "field_updated":
        return `${actorName} updated ${meta.field}`;
      case "note_added":
        return `${actorName} added a note`;
      default:
        return `${actorName} performed an action`;
    }
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "lead_created":
        return <div className="w-3 h-3 rounded-full bg-blue-500" />;
      case "status_changed":
        return <ArrowRight className="w-3 h-3 text-amber-500" />;
      case "note_added":
        return <FileText className="w-3 h-3 text-purple-500" />;
      case "source_changed":
      case "field_updated":
      default:
        return <Clock className="w-3 h-3 text-neutral-400" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={handleBackdropClick}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-neutral-900/80 backdrop-blur-2xl z-50 shadow-2xl flex flex-col overflow-hidden border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <h2 className="text-lg font-semibold text-white">Lead details</h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
            </div>
          ) : isError || !data ? (
            <div className="text-center text-red-500 py-10">Failed to load lead details.</div>
          ) : (
            <>
              {/* Lead Info Card */}
              <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0 border border-blue-500/30">
                    {data.lead.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{data.lead.name}</h3>
                    <p className="text-sm text-neutral-400">{data.lead.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Status</p>
                    <StatusBadge status={data.lead.status} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">Source</p>
                    <span className="text-sm font-medium text-neutral-300">{data.lead.source}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-neutral-400 mb-1">Created</p>
                  <p className="text-sm text-neutral-300">{formatDate(data.lead.createdAt)}</p>
                </div>
              </div>

              {/* Add Note Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Add note</h4>
                <textarea
                  rows={3}
                  placeholder="Write a note about this lead..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-md px-3 py-2 text-sm focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 text-white placeholder:text-neutral-400 transition"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    disabled={!noteContent.trim() || addNoteMutation.isPending}
                    onClick={() => addNoteMutation.mutate(noteContent)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                  >
                    {addNoteMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    Add note
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white">Activity timeline</h4>
                
                {data.activity.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">No activity yet</p>
                ) : (
                  <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-white/10">
                    {data.activity.map((item) => (
                      <div key={item._id} className="relative flex gap-4">
                        <div className="absolute -left-6 mt-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 ring-4 ring-neutral-900">
                          {getActivityIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col">
                            <span className="text-sm text-neutral-200">
                              {getActivityLabel(item.type, item.meta, item.actorName)}
                            </span>
                            <span className="text-xs text-neutral-500">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                          {item.type === "note_added" && item.meta?.note && (
                            <div className="mt-2 rounded bg-white/5 border border-white/10 backdrop-blur-md px-3 py-2 text-sm italic text-neutral-300">
                              "{item.meta.note}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { LeadFilters } from "../../components/leads/LeadFilters";
import { LeadModal } from "../../components/leads/LeadModal";
import { LeadTable } from "../../components/leads/LeadTable";
import { Pagination } from "../../components/leads/Pagination";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { useDebounce } from "../../hooks/useDebounce";
import { getApiErrorMessage } from "../../lib/api";
import { createLead, deleteLead, exportCsv, getLeads, updateLead } from "../../services/lead.service";
import { useAuthStore } from "../../stores/auth.store";
import type { Lead, LeadFilters as LeadFiltersValue, LeadInput, LeadSort } from "../../types/lead.types";
import { leadSources, leadStatuses } from "../../types/lead.types";
import { downloadBlob } from "../../utils/download";

const defaultFilters: LeadFiltersValue = {
  page: 1,
  sort: "latest",
};

export const LeadsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const [modalState, setModalState] = useState<{ mode: "create" | "update"; lead?: Lead } | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const debouncedSearch = useDebounce(searchValue, 500);
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const canDelete = user?.role === "Admin";
  const canExport = user?.role === "Admin";

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";

    if (debouncedSearch === currentSearch) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", "1");

    if (debouncedSearch.trim()) {
      nextParams.set("search", debouncedSearch.trim());
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  }, [debouncedSearch, searchParams, setSearchParams]);

  const leadsQuery = useQuery({
    queryKey: ["leads", filters],
    queryFn: () => getLeads(filters),
  });

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      toast.success("Lead created successfully");
      setModalState(null);
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ leadId, input }: { leadId: string; input: LeadInput }) => updateLead(leadId, input),
    onSuccess: () => {
      toast.success("Lead updated successfully");
      setModalState(null);
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      toast.success("Lead deleted successfully");
      setLeadToDelete(null);
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const exportMutation = useMutation({
    mutationFn: exportCsv,
    onSuccess: (blob) => {
      downloadBlob(blob, "leads.csv");
      toast.success("CSV export started");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const handleFilterChange = (changes: Partial<LeadFiltersValue>) => {
    const nextFilters: LeadFiltersValue = {
      ...filters,
      ...changes,
      page: changes.page ?? 1,
    };
    setSearchParams(buildSearchParams(nextFilters));
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchParams(buildSearchParams(defaultFilters));
  };

  const handleSubmitLead = (input: LeadInput) => {
    if (modalState?.mode === "update" && modalState.lead) {
      updateMutation.mutate({ leadId: modalState.lead.id, input });
      return;
    }

    createMutation.mutate(input);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const leads = leadsQuery.data?.leads ?? [];
  const pagination = leadsQuery.data?.pagination;

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Pipeline</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">Leads</h1>
          <p className="mt-1 text-sm text-slate-600">Create, filter, update, and export lead records.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {canExport ? (
            <button
              type="button"
              onClick={() => exportMutation.mutate()}
              disabled={exportMutation.isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {exportMutation.isPending ? "Exporting..." : "Export CSV"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setModalState({ mode: "create" })}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            New lead
          </button>
        </div>
      </div>

      <LeadFilters
        filters={filters}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {leadsQuery.isError ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-5">
          <h2 className="text-sm font-semibold text-rose-900">Unable to load leads</h2>
          <p className="mt-1 text-sm text-rose-700">{getApiErrorMessage(leadsQuery.error)}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <LeadTable
            leads={leads}
            canDelete={canDelete}
            isLoading={leadsQuery.isLoading}
            onEdit={(lead) => setModalState({ mode: "update", lead })}
            onDelete={setLeadToDelete}
          />
          {pagination ? (
            <Pagination pagination={pagination} isLoading={leadsQuery.isFetching} onPageChange={(page) => handleFilterChange({ page })} />
          ) : null}
        </div>
      )}

      {modalState ? (
        <LeadModal
          mode={modalState.mode}
          lead={modalState.lead}
          isSubmitting={isSubmitting}
          onClose={() => setModalState(null)}
          onSubmit={handleSubmitLead}
        />
      ) : null}

      {leadToDelete ? (
        <ConfirmDialog
          title="Delete lead"
          description={`This will permanently delete ${leadToDelete.name}. This action cannot be undone.`}
          isLoading={deleteMutation.isPending}
          onCancel={() => setLeadToDelete(null)}
          onConfirm={() => deleteMutation.mutate(leadToDelete.id)}
        />
      ) : null}
    </div>
  );
};

const parseFilters = (params: URLSearchParams): LeadFiltersValue => {
  const page = Number(params.get("page") ?? "1");
  const status = params.get("status");
  const source = params.get("source");
  const search = params.get("search")?.trim();
  const sort = params.get("sort");

  return {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    status: leadStatuses.find((value) => value === status),
    source: leadSources.find((value) => value === source),
    search: search || undefined,
    sort: sort === "oldest" ? "oldest" : ("latest" satisfies LeadSort),
  };
};

const buildSearchParams = (filters: LeadFiltersValue): URLSearchParams => {
  const params = new URLSearchParams();
  params.set("page", String(filters.page));
  params.set("sort", filters.sort);

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.source) {
    params.set("source", filters.source);
  }

  if (filters.search?.trim()) {
    params.set("search", filters.search.trim());
  }

  return params;
};

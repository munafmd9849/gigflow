import { Filter, RotateCcw } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { leadSources, leadStatuses, type LeadFilters as LeadFiltersValue, type LeadSort } from "../../types/lead.types";

interface LeadFiltersProps {
  filters: LeadFiltersValue;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: Partial<LeadFiltersValue>) => void;
  onReset: () => void;
}

export const LeadFilters = ({
  filters,
  searchValue,
  onSearchChange,
  onFilterChange,
  onReset,
}: LeadFiltersProps) => {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Filter className="h-4 w-4 text-neutral-400" />
          Filters
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:bg-white/10 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_180px_160px]">
        <SearchInput value={searchValue} onChange={onSearchChange} />
        <select
          value={filters.status ?? ""}
          onChange={(event) =>
            onFilterChange({ status: event.target.value ? filtersStatusValue(event.target.value) : undefined })
          }
          className="h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
        >
          <option value="">All statuses</option>
          {leadStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={filters.source ?? ""}
          onChange={(event) =>
            onFilterChange({ source: event.target.value ? filtersSourceValue(event.target.value) : undefined })
          }
          className="h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
        >
          <option value="">All sources</option>
          {leadSources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
        <select
          value={filters.sort}
          onChange={(event) => onFilterChange({ sort: event.target.value as LeadSort })}
          className="h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

const filtersStatusValue = (value: string) => {
  return leadStatuses.find((status) => status === value);
};

const filtersSourceValue = (value: string) => {
  return leadSources.find((source) => source === value);
};

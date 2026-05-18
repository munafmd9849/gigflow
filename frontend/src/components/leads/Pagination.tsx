import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMetadata } from "../../types/lead.types";

interface PaginationProps {
  pagination: PaginationMetadata;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({ pagination, onPageChange, isLoading = false }: PaginationProps) => {
  const hasPrevious = pagination.page > 1;
  const hasNext = pagination.page < pagination.pages;

  return (
    <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between bg-white/5 backdrop-blur-md rounded-b-lg">
      <p className="text-sm text-neutral-400">
        Page <span className="font-semibold text-white">{pagination.page}</span> of{" "}
        <span className="font-semibold text-white">{Math.max(pagination.pages, 1)}</span>
        <span className="ml-2 text-neutral-500">({pagination.total} total)</span>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!hasPrevious || isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!hasNext || isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

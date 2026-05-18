import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name or email"
        className="h-10 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-neutral-400 focus:border-white/20 focus:ring-4 focus:ring-white/10"
      />
    </div>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { leadSources, leadStatuses, type Lead, type LeadInput } from "../../types/lead.types";

interface LeadModalProps {
  mode: "create" | "update";
  lead?: Lead;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (input: LeadInput) => void;
}

const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.email("Invalid email address").toLowerCase(),
  status: z.enum(leadStatuses),
  source: z.enum(leadSources),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const LeadModal = ({ mode, lead, isSubmitting, onClose, onSubmit }: LeadModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: getDefaultValues(lead),
  });

  useEffect(() => {
    reset(getDefaultValues(lead));
  }, [lead, reset]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 backdrop-blur-sm px-4 py-6">
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              {mode === "create" ? "Create lead" : "Update lead"}
            </h2>
            <p className="text-sm text-neutral-400">
              {mode === "create" ? "Add a new prospect to the pipeline." : "Edit lead details and status."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-md p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition disabled:opacity-60"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input
                {...register("name")}
                className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
                placeholder="Rahul Sharma"
              />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
                placeholder="rahul.sharma@pixelcraft.in"
              />
            </Field>
            <Field label="Status" error={errors.status?.message}>
              <select
                {...register("status")}
                className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
              >
                {leadStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Source" error={errors.source?.message}>
              <select
                {...register("source")}
                className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10"
              >
                {leadSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : mode === "create" ? "Create lead" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, error, children }: FieldProps) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-300">{label}</span>
      <span className="mt-1 block">{children}</span>
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
};

const getDefaultValues = (lead?: Lead): LeadFormValues => {
  return {
    name: lead?.name ?? "",
    email: lead?.email ?? "",
    status: lead?.status ?? "New",
    source: lead?.source ?? "Website",
  };
};

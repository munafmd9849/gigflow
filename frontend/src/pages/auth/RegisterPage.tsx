import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { getApiErrorMessage } from "../../lib/api";
import { register as registerUser } from "../../services/auth.service";
import { useAuthStore } from "../../stores/auth.store";
import { userRoles } from "../../types/auth.types";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(userRoles),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Sales",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (result) => {
      setAuth(result.user, result.token);
      toast.success("Account created successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 relative overflow-hidden">
      {/* Background gradients for auth page to match the landing page theme */}
      <div className="absolute top-1/4 -right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl">
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-white">GigFlow</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">Create account</h1>
          <p className="mt-2 text-sm text-neutral-400">Set up access for the lead dashboard.</p>
        </div>

        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
          <Field label="Name" error={errors.name?.message}>
            <input
              {...register("name")}
              className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10 placeholder:text-neutral-500 transition"
              placeholder="Aarav Mehta"
            />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10 placeholder:text-neutral-500 transition"
              placeholder="aarav.mehta@gigflow.dev"
            />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <input
              {...register("password")}
              type="password"
              className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10 placeholder:text-neutral-500 transition"
              placeholder="Password123"
            />
          </Field>
          <Field label="Role" error={errors.role?.message}>
            <select
              {...register("role")}
              className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10 transition"
            >
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition disabled:opacity-60"
          >
            {mutation.isPending ? "Creating account..." : "Create account"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
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

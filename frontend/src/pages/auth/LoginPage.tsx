import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { getApiErrorMessage } from "../../lib/api";
import { login } from "../../services/auth.service";
import { useAuthStore } from "../../stores/auth.store";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export const LoginPage = () => {
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname ?? "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      setAuth(result.user, result.token);
      toast.success("Logged in successfully");
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage leads and pipeline activity.">
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-4">
        <AuthField label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10 placeholder:text-neutral-500 transition"
            placeholder="aarav.mehta@gigflow.dev"
          />
        </AuthField>
        <AuthField label="Password" error={errors.password?.message}>
          <input
            {...register("password")}
            type="password"
            className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-white/20 focus:ring-4 focus:ring-white/10 placeholder:text-neutral-500 transition"
            placeholder="Password123"
          />
        </AuthField>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition disabled:opacity-60"
        >
          {mutation.isPending ? "Signing in..." : "Sign in"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-neutral-400">
        New to GigFlow?{" "}
        <Link to="/register" className="font-semibold text-white hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
};

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthShell = ({ title, subtitle, children }: AuthShellProps) => {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 relative overflow-hidden">
      {/* Background gradients for auth page to match the landing page theme */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl">
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-white">GigFlow</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </main>
  );
};

interface AuthFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const AuthField = ({ label, error, children }: AuthFieldProps) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-300">{label}</span>
      <span className="mt-1 block">{children}</span>
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
};

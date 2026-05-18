import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export const CTASection = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to modernize your pipeline?
        </h2>
        <p className="relative z-10 text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of high-performance teams managing their revenue operations on GigFlow.
        </p>
        <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
          {token ? (
            <Link to="/dashboard" className="px-8 py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link to="/register" className="px-8 py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="px-8 py-4 bg-transparent text-white rounded-xl font-medium border border-neutral-700 flex items-center justify-center hover:bg-neutral-800 transition-colors">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
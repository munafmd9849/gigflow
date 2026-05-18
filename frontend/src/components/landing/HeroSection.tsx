import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export const HeroSection = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>GigFlow 2.0 is now live</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8"
        >
          The modern CRM for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">modern sales teams</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
        >
          Turn leads into revenue with intelligent workflows, automated pipelines, and real-time analytics. Build your sales engine with the tools of tomorrow.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {token ? (
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-neutral-800 text-white rounded-xl font-medium border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors">
                Login
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};
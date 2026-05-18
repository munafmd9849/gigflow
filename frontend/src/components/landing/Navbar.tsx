import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export const Navbar = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl flex items-center justify-between px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">G</div>
          <span className="text-white font-semibold text-lg tracking-tight">GigFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
          <a href="#workflows" className="hover:text-white transition-colors flex items-center gap-1">
            <span className="text-blue-400">✧</span> Workflows
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          {token ? (
            <Link to="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
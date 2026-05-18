export const Footer = () => {
  return (
    <footer className="bg-neutral-950 py-12 px-6 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">G</div>
          <span className="text-white font-semibold tracking-tight">GigFlow</span>
        </div>
        <div className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} GigFlow Inc. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
};
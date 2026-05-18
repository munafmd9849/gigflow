export const SocialProof = () => {
  return (
    <section className="py-12 border-y border-neutral-800 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-neutral-500 mb-8 uppercase tracking-widest">Trusted by fast-growing teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {["Acme Corp", "GlobalTech", "Nexus", "Stark Ind", "Wayne Ent"].map((company) => (
            <div key={company} className="text-xl md:text-2xl font-bold text-neutral-400 font-serif">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { motion } from "framer-motion";
import { Filter, Users, Activity, BarChart } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    { icon: Users, title: "Smart lead management", desc: "Organize and track your leads efficiently with auto-enrichment." },
    { icon: Filter, title: "Advanced filtering", desc: "Find exactly what you need with powerful combined filters." },
    { icon: Activity, title: "Activity timeline", desc: "See every action, note, and status change in real-time." },
    { icon: BarChart, title: "Real-time analytics", desc: "Visualize your pipeline and conversion rates instantly." },
  ];

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to scale</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">GigFlow provides the infrastructure for your entire sales operation, from first touch to closed won.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-800 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all">
                <f.icon className="w-6 h-6 text-neutral-400 group-hover:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
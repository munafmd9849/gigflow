import { motion } from "framer-motion";
import { Sparkles, Zap, Target, ArrowRight } from "lucide-react";

export const WorkflowSection = () => {
  return (
    <section id="workflows" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>GigFlow Automation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your CRM, running on autopilot.
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Powerful lead routing, automated follow-ups, and custom activity triggers. Let GigFlow handle the busywork so your team can focus on closing.
            </p>
            <div className="space-y-6">
              {[
                { icon: Target, title: "Dynamic Lead Routing", text: "Automatically assign leads to the right rep based on rules." },
                { icon: Zap, title: "Automated Workflows", text: "Trigger actions instantly based on lead behavior." },
                { icon: ArrowRight, title: "Actionable Insights", text: "Get clear next steps and pipeline visibility." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-neutral-500 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl rounded-full" />
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Automation Engine</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-neutral-800 rounded-xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-neutral-200"><span className="text-purple-400 font-semibold">Trigger:</span> Acme Corp reached "Pricing Page" stage.</p>
                </div>
                <div className="bg-blue-600 rounded-xl rounded-tr-none p-4 max-w-[80%] ml-auto">
                  <p className="text-sm text-white"><span className="font-semibold">Action:</span> Sent automated follow-up email template.</p>
                </div>
                <div className="bg-neutral-800 rounded-xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-neutral-200"><span className="text-purple-400 font-semibold">Update:</span> Lead status changed to "Qualified".</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import fs from 'fs';
import path from 'path';

const landingDir = path.join('src', 'components', 'landing');
if (!fs.existsSync(landingDir)) fs.mkdirSync(landingDir, { recursive: true });

const components = {
  'Navbar.tsx': `
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
          <a href="#ai" className="hover:text-white transition-colors flex items-center gap-1">
            <span className="text-blue-400">✧</span> AI
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Login</Link>
          <Link to="/register" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">Get Started</Link>
        </div>
      </div>
    </motion.nav>
  );
};
`,
  'HeroSection.tsx': `
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
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
          <span>GigFlow AI 2.0 is now live</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8"
        >
          The AI-native CRM for <br className="hidden md:block" />
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
          <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
            Start Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-neutral-800 text-white rounded-xl font-medium border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors">
            View Dashboard
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
`,
  'SocialProof.tsx': `
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
`,
  'FeaturesSection.tsx': `
import { motion } from "framer-motion";
import { Filter, Users, Activity, Settings, BarChart } from "lucide-react";

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
`,
  'AISection.tsx': `
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Target } from "lucide-react";

export const AISection = () => {
  return (
    <section id="ai" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>GigFlow Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your CRM, now with a brain.
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Predictive lead scoring, automated follow-up drafting, and smart sentiment analysis. Let our AI handle the busywork so your team can focus on closing.
            </p>
            <div className="space-y-6">
              {[
                { icon: Target, title: "Predictive Lead Scoring", text: "Automatically identify leads most likely to convert." },
                { icon: Zap, title: "Automated Workflows", text: "Trigger intelligent actions based on lead behavior." },
                { icon: Brain, title: "Smart Recommendations", text: "Get contextual suggestions for next steps." }
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
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">GigFlow Assistant</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-neutral-800 rounded-xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-neutral-200">I noticed Acme Corp just visited the pricing page. Based on their profile, they have an 85% conversion probability. Should I draft a follow-up email?</p>
                </div>
                <div className="bg-blue-600 rounded-xl rounded-tr-none p-4 max-w-[80%] ml-auto">
                  <p className="text-sm text-white">Yes, draft it and queue it for review.</p>
                </div>
                <div className="bg-neutral-800 rounded-xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-neutral-200">Done. Draft created in your outbox. I've also updated their status to "Qualified".</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
`,
  'CTASection.tsx': `
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
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
          <Link to="/register" className="px-8 py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="px-8 py-4 bg-transparent text-white rounded-xl font-medium border border-neutral-700 flex items-center justify-center hover:bg-neutral-800 transition-colors">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};
`,
  'Footer.tsx': `
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
`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(landingDir, filename), content.trim());
}

console.log("Components created.");

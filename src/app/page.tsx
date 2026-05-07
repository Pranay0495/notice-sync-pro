"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, BarChart3, BellRing, Layers, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-6 lg:px-14 h-20 flex items-center justify-between border-b border-white/10 glass z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">NoticeSync <span className="text-primary">Pro</span></span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#about" className="hover:text-foreground transition-colors">About Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-14 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Automate your compliance workflow today
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6"
          >
            Never miss a tax notice again with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">unified tracking.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Built by professionals, for professionals. NoticeSync Pro automatically fetches and organizes Income Tax and GST notices for all your clients in one beautiful dashboard.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/register" className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#demo" className="glass px-8 py-4 rounded-full text-base font-semibold hover:bg-white/5 transition-all flex items-center justify-center">
              Book a Demo
            </Link>
          </motion.div>
        </section>

        {/* Value Proposition / Features */}
        <section id="features" className="px-6 lg:px-14 py-24 bg-black/40 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale your firm</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Stop wasting billable hours manually checking government portals. Let our bots do the heavy lifting.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Automated Dual-Sync",
                  description: "Seamlessly fetches notices from both Income Tax and GST portals without manual intervention.",
                  icon: <Zap className="w-6 h-6 text-yellow-400" />
                },
                {
                  title: "Bank-Grade Security",
                  description: "Client credentials are encrypted using AES-256 before being stored in our secure database.",
                  icon: <ShieldCheck className="w-6 h-6 text-green-400" />
                },
                {
                  title: "Smart Reminders",
                  description: "Get notified via email and dashboard alerts before a notice response deadline approaches.",
                  icon: <BellRing className="w-6 h-6 text-primary" />
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-2xl flex flex-col gap-4 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    {feature.icon}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-6 lg:px-14 py-24 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your firm's size. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground mb-6">Perfect for independent practitioners.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">₹499</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 25 Clients', 'Weekly Automated Sync', 'Income Tax & GST', 'Email Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-semibold">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="glass p-8 rounded-3xl border-primary shadow-2xl shadow-primary/20 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <div className="absolute top-4 right-4 bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
              
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-muted-foreground mb-6">For growing CA firms and teams.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">₹999</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 100 Clients', 'Daily Automated Sync', 'Priority Reminders', 'Team Access (3 Users)', 'Bulk Excel Upload'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold shadow-lg shadow-primary/25">
                Start 7-Day Trial
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 lg:px-14 bg-black/50 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">NoticeSync Pro</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            A product by <span className="text-foreground font-medium">CA Pranay S. Jajodia</span> | P.S. Jajodia & Associates
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

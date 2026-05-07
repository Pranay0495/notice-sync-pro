"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Bell, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus,
  ArrowUpRight,
  Filter,
  Download
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    { label: "Total Clients", value: "0", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "New Notices", value: "0", icon: Bell, color: "text-primary", bg: "bg-primary/10" },
    { label: "Pending Response", value: "0", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Closed Notices", value: "0", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome, {session?.user?.name?.split(' ')[0] || "CA"}!</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your clients today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/clients/add" className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Add New Client
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Notices Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Recent Notices
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
            </h2>
            <Link href="/dashboard/notices" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground">No notices found</h3>
              <p className="text-sm text-muted-foreground/60 mt-1 max-w-xs">Add your first client and sync portals to start tracking notices automatically.</p>
              <Link href="/dashboard/clients/add" className="mt-6 text-sm font-bold text-primary border border-primary/20 px-6 py-2.5 rounded-full hover:bg-primary/5 transition-colors">
                Setup First Client
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold px-2">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: "Sync Income Tax Portal", icon: Download, color: "text-blue-400" },
              { label: "Sync GST Portal", icon: Download, color: "text-green-400" },
              { label: "Export Monthly Report", icon: Download, color: "text-primary" },
            ].map((action, i) => (
              <button key={i} className="w-full glass p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all flex items-center gap-4 group">
                <div className={`w-10 h-10 bg-white/5 ${action.color} rounded-lg flex items-center justify-center group-hover:bg-white/10`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">{action.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="glass p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-primary">
                <AlertCircle className="w-4 h-4" />
                System Status
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All systems operational. Scheduled syncs are running according to your firm settings.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-10">
              <ShieldCheck className="w-24 h-24 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

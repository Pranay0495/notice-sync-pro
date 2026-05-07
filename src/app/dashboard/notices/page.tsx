"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Calendar,
  ChevronRight,
  FileText
} from "lucide-react";

const mockNotices = [
  { id: 1, client: "Pranay Jajodia", portal: "INCOME_TAX", ref: "IT-2024-9912", section: "143(1)", date: "May 01, 2026", due: "May 30, 2026", status: "NEW" },
  { id: 2, client: "PS Jajodia & Associates", portal: "GST", ref: "GST-2024-882", section: "ASMT-10", date: "Apr 25, 2026", due: "May 15, 2026", status: "OVERDUE" },
  { id: 3, client: "Client XYZ", portal: "INCOME_TAX", ref: "IT-2024-110", section: "148", date: "Apr 10, 2026", due: "Closed", status: "CLOSED" },
];

export default function NoticesPage() {
  const [filter, setFilter] = useState('ALL');

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-primary/10 text-primary border-primary/20';
      case 'OVERDUE': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'CLOSED': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-white/5 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Central Notice Hub</h1>
          <p className="text-muted-foreground mt-1">All your client notices from IT & GST portals in one place.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Bulk Download
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">New Notices</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Action Overdue</p>
            <h3 className="text-2xl font-bold">3</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Responses Filed</p>
            <h3 className="text-2xl font-bold">45</h3>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['ALL', 'INCOME_TAX', 'GST'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filter === f ? 'bg-primary text-primary-foreground border-primary' : 'glass border-white/10 text-muted-foreground hover:bg-white/5'}`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search Reference No..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {mockNotices.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${notice.portal === 'GST' ? 'bg-green-500/10 border-green-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                <FileText className={`w-6 h-6 ${notice.portal === 'GST' ? 'text-green-500' : 'text-blue-500'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{notice.ref}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${getStatusStyle(notice.status)}`}>
                    {notice.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-tight">{notice.client}</h3>
                <p className="text-xs text-muted-foreground mt-1">Section {notice.section} • Issued on {notice.date}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 px-4 md:px-0">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Portal</span>
                <span className="text-xs font-bold flex items-center gap-1">
                  <Globe className="w-3 h-3 text-primary" />
                  {notice.portal.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Due Date</span>
                <span className={`text-xs font-bold flex items-center gap-1 ${notice.status === 'OVERDUE' ? 'text-destructive' : ''}`}>
                  <Calendar className="w-3 h-3" />
                  {notice.due}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-3 rounded-xl glass border-white/10 hover:bg-white/10 text-primary transition-all" title="Download Notice">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl glass border-white/10 hover:bg-white/10 transition-all" title="View Details">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  )
}

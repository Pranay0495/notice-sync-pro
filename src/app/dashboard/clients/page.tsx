"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  RefreshCcw, 
  ExternalLink,
  MoreVertical,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Mock data for initial view (We will connect to actual API next)
const mockClients = [
  { id: 1, name: "Pranay Jajodia", identifier: "ABCDE1234F", type: "Income Tax", lastSync: "2 hours ago", status: "Active" },
  { id: 2, name: "PS Jajodia & Associates", identifier: "27ABCDE1234F1Z5", type: "GST", lastSync: "1 day ago", status: "Active" },
];

export default function ClientsPage() {
  const [loading, setLoading] = useState(false);
  const [syncingId, setSyncingId] = useState<number | null>(null);

  const handleSync = (id: number) => {
    setSyncingId(id);
    // Trigger /api/sync
    setTimeout(() => setSyncingId(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Assessee Management</h1>
          <p className="text-muted-foreground mt-1">Manage and sync notices for all your registered clients.</p>
        </div>
        <Link href="/dashboard/clients/add" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Client
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by PAN, GSTIN or Name..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Assessee Details</th>
                <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Type</th>
                <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Last Sync</th>
                <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
                <th className="px-6 py-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockClients.map((client) => (
                <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{client.name}</span>
                      <span className="text-xs text-muted-foreground font-mono uppercase">{client.identifier}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${client.type === 'GST' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium italic">
                    {client.lastSync}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="font-semibold text-xs">{client.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleSync(client.id)}
                        disabled={syncingId === client.id}
                        className={`p-2 rounded-lg hover:bg-primary/10 transition-all ${syncingId === client.id ? 'animate-spin text-primary' : 'text-muted-foreground hover:text-primary'}`}
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-muted-foreground hover:bg-white/5 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Mock */}
        {mockClients.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-muted-foreground/20" />
            </div>
            <h3 className="text-lg font-bold">No clients added yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Start by adding your first assessee to track notices.</p>
          </div>
        )}
      </div>

      {/* Sync Warning */}
      <div className="flex items-start gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-bold mb-1">Encrypted Auto-Sync Active</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your clients' portal credentials are encrypted with AES-256. Automated syncs run every midnight according to your global settings.
          </p>
        </div>
      </div>
    </div>
  );
}

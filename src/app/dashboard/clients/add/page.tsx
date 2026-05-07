"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  ShieldCheck, 
  Info,
  ChevronRight,
  Globe,
  Lock,
  User as UserIcon,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'it' | 'gst'>('it');

  const [formData, setFormData] = useState({
    panNumber: "",
    clientName: "",
    itUsername: "",
    itPassword: "",
    itSyncFrequency: "Manual",
    gstin: "",
    gstUsername: "",
    gstPassword: "",
    gstSyncFrequency: "Manual",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // API call will go here
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/clients");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/clients" className="p-2 rounded-xl glass hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Client</h1>
            <p className="text-sm text-muted-foreground">Setup automated notice tracking for a new assessee.</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Client
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Basic Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Basic Details
            </h2>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">PAN Number</label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                value={formData.panNumber}
                onChange={(e) => setFormData({...formData, panNumber: e.target.value.toUpperCase()})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Client / Trade Name</label>
              <input
                type="text"
                placeholder="Enter client name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              />
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-primary/20 bg-primary/5">
            <h3 className="text-xs font-bold mb-2 flex items-center gap-2 text-primary uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Security First
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              We use AES-256 encryption to secure your client portal credentials. Your data is only used by our automation bots to fetch notices.
            </p>
          </div>
        </div>

        {/* Portal Credentials */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab('it')}
                className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'it' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Income Tax Portal
              </button>
              <button 
                onClick={() => setActiveTab('gst')}
                className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'gst' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                GST Portal
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'it' ? (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">IT Portal Username</label>
                      <input
                        type="text"
                        placeholder="Usually same as PAN"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                        value={formData.itUsername}
                        onChange={(e) => setFormData({...formData, itUsername: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">IT Portal Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                        value={formData.itPassword}
                        onChange={(e) => setFormData({...formData, itPassword: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Sync Frequency</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Manual', 'Weekly', 'Bi-Weekly', 'Daily'].map((freq) => (
                        <button
                          key={freq}
                          onClick={() => setFormData({...formData, itSyncFrequency: freq})}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-all ${formData.itSyncFrequency === freq ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">GSTIN</label>
                    <input
                      type="text"
                      placeholder="27ABCDE1234F1Z5"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                      value={formData.gstin}
                      onChange={(e) => setFormData({...formData, gstin: e.target.value.toUpperCase()})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">GST Portal Username</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                        value={formData.gstUsername}
                        onChange={(e) => setFormData({...formData, gstUsername: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">GST Portal Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                        value={formData.gstPassword}
                        onChange={(e) => setFormData({...formData, gstPassword: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Sync Frequency</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Manual', 'Weekly', 'Bi-Weekly', 'Daily'].map((freq) => (
                        <button
                          key={freq}
                          onClick={() => setFormData({...formData, gstSyncFrequency: freq})}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-all ${formData.gstSyncFrequency === freq ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'}`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 px-4 py-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-500">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold uppercase tracking-wider">Please Note</p>
              <p className="leading-relaxed opacity-80 font-medium">For the first sync, you might need to provide an OTP if the portal requires multi-factor authentication. We will notify you when a manual action is needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

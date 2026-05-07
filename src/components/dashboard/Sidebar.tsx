"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  Layers,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Clients", href: "/dashboard/clients" },
  { icon: Bell, label: "Notices", href: "/dashboard/notices" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="w-64 h-screen glass border-r border-white/10 flex flex-col sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">NoticeSync <span className="text-primary">Pro</span></span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        {/* Credits Card */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Sync Credits</span>
            <div className="bg-primary/20 p-1 rounded-md">
              <ShieldCheck className="w-3 h-3 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-xl font-bold">10</span>
            <span className="text-[10px] text-muted-foreground">left</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[10%]" />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate leading-tight">{session?.user?.name || "User"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{session?.user?.email || "email@firm.com"}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

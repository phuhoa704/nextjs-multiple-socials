"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Share2,
  Settings,
  PlusCircle,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const pathname = usePathname();
  const isAdmin = false;

  const adminLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/users", icon: Users, label: "Users" },
    { to: "/posts", icon: FileText, label: "All Posts" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
  ];

  const userLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/posts", icon: FileText, label: "My Posts" },
    { to: "/social-accounts", icon: Share2, label: "Social Accounts" },
    { to: "/create-post", icon: PlusCircle, label: "Create Post" },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="h-full bg-white/80 backdrop-blur-xl border-r border-black/5 flex flex-col shadow-2xl">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <Share2 className="w-8 h-8 text-emerald-500" />
          SocialSync
        </h1>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link, index) => {
          const isActive = link.to === pathname;
          return (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={link.to}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group",
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600",
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                    "text-current",
                  )}
                />
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-black/5">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
        >
          <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

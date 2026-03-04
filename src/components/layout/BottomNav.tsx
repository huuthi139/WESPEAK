"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MessageCircle, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/learn", icon: BookOpen, label: "Học" },
  { href: "/chat", icon: MessageCircle, label: "Chat AI" },
  { href: "/leaderboard", icon: Trophy, label: "Xếp hạng" },
  { href: "/profile", icon: User, label: "Hồ sơ" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="glass-3d-heavy mb-2 flex items-center justify-around rounded-2xl px-2 py-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                  isActive
                    ? "text-primary"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-primary/[0.15] shadow-[inset_0_1px_0_rgba(108,99,255,0.3),0_0_12px_rgba(108,99,255,0.15)]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <motion.div
                  whileTap={{ scale: 0.85, y: 1 }}
                  transition={{ duration: 0.1 }}
                  className="relative z-10 flex flex-col items-center gap-0.5"
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={cn(
                      "transition-all",
                      isActive && "drop-shadow-[0_0_6px_rgba(108,99,255,0.5)]"
                    )}
                  />
                  <span className="text-[10px] font-medium">
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

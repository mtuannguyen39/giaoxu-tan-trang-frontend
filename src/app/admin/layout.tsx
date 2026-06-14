"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useTheme } from "@/hooks/useTheme";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 ml-60 flex-col min-h-screen admin-main">
        {/* Toolbar */}
        <div className="sticky top-0 z-50 flex items-center justify-between h-16 min-h16 bg-[var(--card)] backdrop-blur-xl backdrop-filter border border-b-[var(--card-b, rgba(255,255,255,0.09))] gap-3">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="admin-burger hidden flex-col gap-[4.5px] w-10 h-10 bg-none border-none cursor-pointer rounded-xl"
          >
            <span className=" w-full h-1 bg-[var(--text2)] rounded-sm block" />
            <span className=" w-full h-1 bg-[var(--text2)] rounded-sm block" />
            <span className=" w-full h-1 bg-[var(--text2)] rounded-sm block" />
          </button>
        </div>
      </div>
    </div>
  );
}

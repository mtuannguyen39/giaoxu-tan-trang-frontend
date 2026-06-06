"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    section: "Tổng Quan",
    items: [
      { href: "/admin", icon: "", label: "Dashboard" },
      {
        href: "/admin/notifications",
        icon: "",
        label: "Thông Báo",
        badge: "3",
      },
    ],
  },
  {
    section: "Nội Dung",
    items: [
      { href: "/admin/news", icon: "", label: "Tin Tức" },
      { href: "/admin/announcements", icon: "", label: "Thông Báo GX" },
    ],
  },
  {
    section: "Phụng Vụ",
    items: [
      { href: "/admin/schedule", icon: "", label: "Lịch Thánh Lễ" },
      { href: "/admin/calendar", icon: "", label: "Lịch Công Giáo" },
    ],
  },
  {
    section: "Cộng Đoàn",
    items: [{ href: "/admin/communities", icon: "", label: "Cộng Đoàn" }],
  },
  {
    section: "Hệ Thống",
    items: [
      { href: "/admin/users", icon: "", label: "Tài Khoản" },
      { href: "/admin/settings", icon: "", label: "Cài Đặt" },
    ],
  },
];

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const sidebar = (
    <aside className="w-[240px] flex flex-col bg-[var(--sb-bg,rgba(10,14,22,0.95))] [backdrop-filter:blur(32px)] border-r border-[var(--card-b,rgba(255,255,255,0.09))] h-full overflow-y-auto">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-[10px] px-[18px] py-5 pb-4 border-b border-[var(--card-b,rgba(255,255,255,0.09))] no-underline"
      >
        <div className="w-[34px] h-[34px] rounded-[10px] bg-[linear-gradient(145deg,#c8921a,#7a5218)] flex items-center justify-center shadow-[0_0_20px_rgba(200,146,26,0.3)] shrink-0">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            className="fill-white"
          >
            <path d="M11 2v7H4v4h7v9h2v-9h7v-4h-7V2z" />
          </svg>
        </div>
        <div>
          <div className="font-[var(--font-display)] text-[0.95rem] font-semibold text-[var(--text1)] leading-[1.2]">
            Tân Trang
          </div>
          <div className="text-[0.58rem] tracking-[0.12em] uppercase text-[var(--amber,#E5B84A)] font-bold">
            Admin Portal
          </div>
        </div>
      </Link>

      {/* User */}
      <div className="flex items-center gap-[10px] px-[18px] py-[14px] border-b border-[var(--card-b,rgba(255,255,255,0.09))]">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-[linear-gradient(145deg,#667eea,#764ba2)] flex items-center justify-center text-[0.85rem] font-bold text-white shrink-0">
          A
        </div>
        <div>
          <div className="text-[0.8rem] font-semibold text-[var(--text1)]">
            Admin Giáo Xứ
          </div>
          <div className="inline-flex mt-[2px] px-[7px] py-[1px] rounded-full bg-[rgba(232,169,68,0.12)] border border-[rgba(232,169,68,0.22)] text-[0.58rem] font-bold text-[var(--amber,#E5B84A)] uppercase tracking-[0.08em]">
            Super Admin
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-[18px] py-[14px]">
        {NAV.map((group) => (
          <div key={group.section} className="mb-6 last:mb-0">
            <div className="text-[0.65rem] font-bold text-[var(--text2)] uppercase tracking-[0.12em] mb-3">
              {group.section}
            </div>
            {group.items.map(({ href, icon, label, badge }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-[10px] px-3 py-[9px] rounded-[10px] no-underline text-[0.82rem] font-medium transition-colors duration-150
                  ${
                    active
                      ? "text-[var(--amber,#E5B84A)] bg-[rgba(232,169,68,0.12)] border border-[rgba(232,169,68,0.2)]"
                      : "text-[var(--text2)] bg-transparent border border-transparent"
                  }
                `}
                >
                  <span className="text-[1rem] w-5 text-center shrink-0">
                    {icon}
                  </span>
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="px-[7px] py-[2px] rounded-full bg-[rgba(248,113,113,0.15)] border border-[rgba(248,113,113,0.22)] text-[0.6rem] font-bold text-[#f87171]">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-[18px] py-[14px] border-t border-[var(--card-b,rgba(255,255,255,0.09))]">
        <Link
          href="/"
          className="flex items-center gap-[10px] px-3 py-[9px] rounded-[10px] text-[var(--blue,#60a5fa)] no-underline text-[0.8rem] font-medium mb-1"
        >
          <span>🌐</span> Xem Trang Chủ
        </Link>
        <button className="flex items-center gap-[10px] px-3 py-[9px] rounded-[10px] text-[var(--red,#f87171)] bg-transparent border-none cursor-pointer text-[0.8rem] font-medium w-full">
          <span>🚪</span> Đăng Xuất
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="admin-sidebar-desktop fixed top-0 left-0 bottom-0 w-[240px] z-[100]">
        {sidebar}
      </div>

      {/* Mobile: overlay drawer */}
      {open && (
        <div className="admin-sidebar-mobile fixed inset-0 z-[110]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative w-[240px] h-full bg-[var(--sb-bg,rgba(10,14,22,0.95))] [backdrop-filter:blur(32px)] border-r border-[var(--card-b,rgba(255,255,255,0.09))]">
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
}

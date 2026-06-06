"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", icon: "🏠", label: "Trang Chủ" },
  { href: "/tin-tuc", icon: "📰", label: "Tin Tức" },
  { href: "/lich-le", icon: "🕐", label: "Lịch Lễ", cta: true },
  { href: "/cong-doan", icon: "👥", label: "Cộng Đoàn" },
  { href: "/#lien-he", icon: "📞", label: "Liên Hệ" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="bottom-nav hidden fixed bottom-0 left-0 right-0 z-[400] bg-[var(--nav-bg)] [backdrop-filter:blur(28px)] border-t border-[var(--border)] shadow-[0_-4px_24px_var(--shadow)]"
      style={{
        height: "calc(62px + env(safe-area-inset-bottom, 0px))",
        paddingBottom: "env(save-area-inset-bottom,0px)",
      }}
    >
      <div className="flex items-stretch h-[62px]">
        {ITEMS.map(({ href, icon, label, cta }) => {
          const active = isActive(href);
          if (cta)
            return (
              <Link
                key={href}
                href={href}
                className="flex-none w-14 h-14 mx-2 my-[3px] rounded-2xl bg-[linear-gradient(145deg,var(--navy2),var(--navy))] text-white flex flex-col items-center justify-center gap-[2px] text-[0.58rem] font-bold no-underline"
              >
                <span className="text-[1.25rem]">{icon}</span>
                <span>{label}</span>
              </Link>
            );
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-[3px] no-underline text-[0.62rem] font-semibold relative
                ${active ? "text-[var(--navy2)]" : "text-[var(--text3)]"}
              `}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-[2.5px] bg-[linear-gradient(to_right,var(--gold2),var(--gold3))] rounded-b-[3px]" />
              )}
              <span className="text-[1.25rem]">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

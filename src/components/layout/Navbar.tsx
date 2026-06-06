"use client";

import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Giới Thiệu" },
  { href: "/lich-le", label: "Thánh lễ" },
  { href: "/tin-tuc", label: "Tin Tức" },
  { href: "/cong-doan", label: "Cộng Đoàn" },
  { href: "/#lien-he", label: "Liên Hệ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={`fixed z-[500] h-[58px] flex items-center justify-between px-[10px] pl-[18px] rounded-[32px] w-[min(1160px, calc(100%-40px))] top-[14px] left-1/2 -translate-x-1/2 bg-[var(--nav-bg)] [backdrop-filter:blur(32px)_saturate(1.8)] border border-[var(--border)] transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_0_rgba(255,255,255,0.06)_inset,0_14px_48px_var(--shadow)]" : "shadow-[0_2px_0_rgba(255,255,255,0.06)_inset,0_4px_24px_var(--shadow)]"}`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-[10px] no-underline shrink-0"
        >
          <div className="w-[34px] h-[34px] rounded-[10px] shrink-0 flex items-center justify-center bg-[linear-gradient(150deg,var(--navy2),var(--navy)]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              className="fill-[var(--gold3)]"
            >
              <path d="M11 2v7H4v4h7v9h2v-9h7v-4h-7V2z" />
            </svg>
          </div>
          <div>
            <span className="block text-[1rem] leading-[1.2] font-[var(--font-display)] text-[var(--gold)]">
              Giáo xứ Tân Trang
            </span>
            <span className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold text-[var(--gold)]">
              Giáo Phận Sài Gòn
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links-desktop flex items-center gap-[2px] list-none m-0 p-0">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center min-h-[44px] px-[13px] rounded-[16px] text-[0.83rem] no-underline whitespace-nowrap transition-[color,background] duration-200 ${isActive(href) ? "font-bold text-[var(--gold)] bg-[rgba(200,146 26,0.08)]" : "font-medium text-[var(--text2)] bg-transparent"}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/lich-le"
              className="flex items-center min-h-[44px] px-[18px] text-white rounded-[24px] font-bold text-[0.83rem] no-underline whitespace-nowrap bg-[linear-gradient(145deg, var(--navy2), var(--navy))] shadow-[0_2px_12px_rgba(17,29,53,0.22)]"
            >
              Xem lịch lễ
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            title="Đổi giao diện"
            className="w-9 h-9 rounded-full cursor-pointer flex items-center justify-center text-[1rem] transition-transform duration-[350ms] border border-[var(--border-gold)] bg-[var(--goldbg)] text-[var(--gold)]"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label="Mở menu"
            aria-expanded={drawerOpen}
            className="nav-burger hidden flex-col justify-center gap-[5px] w-11 h-11 p-[10px] bg-transparent border-none cursor-pointer rounded-[16px]"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-full h-[2px] rounded-[2px] bg-[var(--navy)] transition-[transform, opacity] duration-300"
                style={{
                  transform: drawerOpen
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "scaleX(0)"
                    : "none",
                  opacity: drawerOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[400]">
          <div
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-[rgba(17,29,53,0.4)] backdrop-blur-sm"
          />
          <div className="absolute top-0 right-0 bottom-0 w-[min(300px,85vw)] overflow-y-auto bg-[var(--nav-bg)] [backdrop-filter:blur(40px)] border-l border-[var(--border)] pt-[calc(80px+env(safe-area-inset-top,0px))] pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
            <ul className="list-none px-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`
                flex items-center min-h-[52px] px-4 rounded-[16px]
                text-[1rem] font-medium no-underline
                ${
                  isActive(href)
                    ? "text-[var(--gold)] bg-[var(--goldbg)]"
                    : "text-[var(--text2)] bg-transparent"
                }
              `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/lich-le"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center mt-4 h-[52px] text-white rounded-[24px] font-bold no-underline bg-[linear-gradient(145deg,var(--navy2),var(--navy))]"
                >
                  📅 Xem Lịch Thánh Lễ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import { useEffect, type ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  width?: number;
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 560,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(0,0,0,0.65)] backdrop-blur-[8px] p-5"
    >
      <div
        className="bg-[var(--bg2)] border border-[var(--card-b)] rounded-[20px] max-h-[90vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,0.45)] [animation:modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{ width: `min(${width}px, calc(100vw - 40px))` }}
      >
        <div className="px-7 pt-7 flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="font-[var(--font-display)] text-[1.3rem] font-medium text-[var(--text1)]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[0.75rem] text-[var(--text3)] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-[1.5px] border-[var(--card-b)] bg-[var(--card)] text-[var(--text2)] text-[1rem] cursor-pointer flex items-center justify-center shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="px-7 pb-7">{children}</div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}

"use client";
import { useMassSchedule } from "@/hooks/useMassSchedule";

export default function NextMassWidget() {
  const next = useMassSchedule();

  if (!next) return null;
  const soon = next.minutesLeft < 60;

  return (
    <div className="p-[14px_16px] rounded-[20px] bg-[rgba(255,255,255,0.055)] [backdrop-filter:blur(24px)] border border-[rgba(255,255,255,0.09)] shadow-[0_0_0_1px_rgba(200,146,26,0.15)_inset,0_8px_32px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-2 mb-[10px]">
        <span
          className={`w-2 h-2 rounded-full shrink-0 [animation:pulse2_2s_ease-in-out_infinite]
            ${
              soon
                ? "bg-[var(--gold2)] shadow-[0_0_8px_var(--gold2)]"
                : "bg-[#4ade80] shadow-[0_0_8px_#4ade80]"
            }
          `}
        />
        <span className="text-[0.63rem] tracking-[0.16em] uppercase text-[rgba(229,184,74,0.85)] font-bold">
          Lễ Tiếp Theo
        </span>
      </div>

      <div className="font-[var(--font-display)] text-[2.4rem] font-normal text-[rgba(229,184,74,0.95)] leading-none mb-1">
        {next.timeStr}
      </div>

      <div className="text-[0.9rem] text-[rgba(249,246,240,0.8)] font-medium mb-[10px]">
        {next.label}
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="px-3 py-[3px] w-full text-center rounded-full bg-[rgba(200,146,26,0.18)] border border-[rgba(200,146,26,0.35)] text-[0.72rem] font-bold text-[rgba(229,184,74,0.9)]">
          {next.dayName}
          {next.isToday ? " (Hôm nay)" : ""}
        </span>
        <span className="text-[0.78rem] text-[rgba(249,246,240,0.5)]">
          còn{" "}
          <strong className="text-[rgba(229,184,74,0.9)]">
            {next.countdown}
          </strong>
        </span>
      </div>
    </div>
  );
}

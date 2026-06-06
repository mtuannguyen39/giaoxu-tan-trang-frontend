"use client";

import { useEffect, useState } from "react";
import { fmtMassTime, formatCountdown } from "@/lib/utils";

interface MassEntry {
  day: number;
  hour: number;
  min: number;
  label: string;
}
interface NextMass {
  timeStr: string;
  label: string;
  dayName: string;
  countdown: string;
  isToday: boolean;
  minutesLeft: number;
}

const DEFAULT_SCHEDULE: MassEntry[] = [
  // Thứ 2
  { day: 1, hour: 5, min: 0, label: "Lễ Sáng Thứ Hai" },
  { day: 1, hour: 17, min: 45, label: "Lễ Chiều Thứ Hai" },
  // Thứ 3
  { day: 2, hour: 5, min: 0, label: "Lễ Sáng Thứ Ba" },
  { day: 2, hour: 17, min: 45, label: "Lễ Chiều Thứ Ba" },
  // Thứ 4
  { day: 3, hour: 5, min: 0, label: "Lễ Sáng Thứ Tư" },
  { day: 3, hour: 17, min: 45, label: "Lễ Chiều Thứ Tư" },
  // Thứ 5
  { day: 4, hour: 5, min: 0, label: "Lễ Sáng Thứ Năm" },
  { day: 4, hour: 17, min: 45, label: "Lễ Chiều Thứ Năm" },
  // Thứ 6
  { day: 5, hour: 5, min: 0, label: "Lễ Sáng Thứ Sáu" },
  { day: 5, hour: 17, min: 45, label: "Lễ Chiều Thứ Sáu" },
  // Thứ 7
  { day: 6, hour: 5, min: 0, label: "Lễ Sáng Thứ Bảy" },
  { day: 6, hour: 17, min: 45, label: "Lễ Chiều Thứ Bảy" },
  // Chủ Nhật
  { day: 0, hour: 5, min: 0, label: "Lễ 1 Sáng Chúa Nhật" },
  { day: 0, hour: 7, min: 30, label: "Lễ 2 Sáng Chúa Nhật" },
  { day: 0, hour: 16, min: 0, label: "Lễ 3 Chiều Chúa Nhật" },
  { day: 0, hour: 17, min: 30, label: "Lễ 4 Sáng Chúa Nhật" },
];
const DAY_FULL = [
  "Chúa Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

function loadSchedule(): MassEntry[] {
  if (typeof window === "undefined") return DEFAULT_SCHEDULE;
  try {
    const r = localStorage.getItem("gx-mass-schedule");
    return r ? JSON.parse(r) : DEFAULT_SCHEDULE;
  } catch {
    return DEFAULT_SCHEDULE;
  }
}

function computeNext(now: Date): NextMass | null {
  const sched = loadSchedule();
  const candidates: {
    entry: MassEntry;
    target: Date;
    diff: number;
    offset: number;
  }[] = [];
  for (let off = 0; off <= 7; off++) {
    const d = new Date(now);
    d.setDate(d.getDate() + off);
    const dow = d.getDay();
    sched
      .filter((m) => m.day === dow)
      .forEach((m) => {
        const t = new Date(d);
        t.setHours(m.hour, m.min, 0, 0);
        const diff = t.getTime() - now.getTime();
        if (diff > 0)
          candidates.push({ entry: m, target: t, diff, offset: off });
      });
  }
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.diff - b.diff);
  const { entry, target, diff, offset } = candidates[0];
  const mins = Math.floor(diff / 60000);
  return {
    timeStr: fmtMassTime(entry.hour, entry.min),
    label: entry.label,
    dayName: DAY_FULL[target.getDay()],
    countdown: formatCountdown(mins),
    isToday: offset === 0,
    minutesLeft: mins,
  };
}

export function useMassSchedule(): NextMass | null {
  const [next, setNext] = useState<NextMass | null>(null);

  useEffect(() => {
    const update = () => setNext(computeNext(new Date()));
    update();
    const id = setInterval(update, 30_000);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "gx-mass-schedule") update();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      clearInterval(id);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return next;
}

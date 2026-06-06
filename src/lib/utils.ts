export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join("");
}

// Format ngày Việt Nam: "15 tháng 3, 2026"
export function formatDateVN(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

// Format relative time: "5 phút trước"
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000); // seconds

  if (diff < 60) return "Vừa xong";
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return formatDateVN(dateStr);
}

// Format giờ lễ: 5, 00 -> "5:00 SA"
export function fmtMassTime(hour: number, min: number): string {
  const period = hour < 12 ? "SA" : "CN";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${h}:${String(min).padStart(2, "0")} ${period}`;
}

// Tính countdown đến giờ lễ tiếp theo
export function formatCountdown(minutes: number): string {
  if (minutes < 1) return "Bắt đầu ngay!";
  if (minutes < 60) return `${minutes} phút nữa`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} giờ nữa` : `${h}g ${m}p nữa`;
}

// Truncate text
export function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen).trimEnd() + "..." : str;
}

// Generate placeholder color từ string
export function placeholderGradient(seed: string): string {
  const palettes = [
    "linear-gradient(150deg,#1C2F52,#0c1828)",
    "linear-gradient(150deg,#2C4678,#1C2F52)",
    "linear-gradient(150deg,#A8720F,#7A5210)",
    "linear-gradient(150deg,#1a3a1a,#0d2010)",
    "linear-gradient(150deg,#2a1a3a,#1a0d2a)",
    "linear-gradient(150deg,#1a2a3a,#0d1a28)",
  ];
  let hash = 0;
  for (const c of seed) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return palettes[Math.abs(hash) % palettes.length];
}

import Link from "next/link";

const NAV_LINKS = ["Giới Thiệu", "Thánh Lễ", "Tin Tức", "Thông Báo"];
const COMMUNITY_LINKS = ["Hội Đoàn", "Xứ Đoàn", "Ca Đoàn", "Bác Ái"];
const CONTACT_LINKS = [
  "📍 TP. Hồ Chí Minh",
  "📞 Văn Phòng",
  "✉️ Email",
  "📘 Facebook",
];

export default function Footer() {
  return (
    <footer
      id="lien-he"
      className="relative z-[1] bg-[var(--footer-bg)] px-[72px] pt-14 pb-8 transition-[background] duration-300"
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(to_right,transparent_0%,rgba(200,146,26,0.35)_30%,rgba(200,146,26,0.35)_70%,transparent_100%)]" />
      {/* Grid */}
      <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr] gap-12 max-w-[1100px] mx-auto mb-12">
        {/* BRAND */}
        <div>
          <div className="font-[var(--font-display)] text-[1.35rem] text-[rgba(249,246,240,0.95)] mb-[6px]">
            Giáo xứ Tân Trang
          </div>
          <div className="w-9 h-[1.5px] bg-[linear-gradient(to_right,var(--gold2),transparent)] mb-3" />
          <p className="text-[0.84rem] text-[rgba(249,246,240,0.5)] leading-[1.75] max-w-[240px]">
            Cộng đoàn hiệp nhất trong tình thương của Chúa và tinh thần phục vụ.
            Thuộc Giáo phận Sài Gòn
          </p>
        </div>
        {/* Điều Hướng */}
        <div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-[var(--gold3)] font-bold mb-4">
            Điều Hướng
          </div>
          <ul className="list-none p-0 flex flex-col gap-[10px]">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <Link
                  href="#"
                  className="text-[0.85rem] text-[rgba(249,246,240,0.5)] no-underline"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cộng Đoàn */}
        <div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-[var(--gold3)] font-bold mb-4">
            Cộng Đoàn
          </div>
          <ul className="list-none p-0 flex flex-col gap-[10px]">
            {COMMUNITY_LINKS.map((l) => (
              <li key={l}>
                <Link
                  href="/cong-doan"
                  className="text-[0.85rem] text-[rgba(249,246,240,0.5)] no-underline"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Liên Hệ */}
        <div>
          <div className="text-[0.63rem] tracking-[0.2em] uppercase text-[var(--gold3)] font-bold mb-4">
            Liên Hệ
          </div>
          <ul className="list-none p-0 flex flex-col gap-[10px]">
            {CONTACT_LINKS.map((l) => (
              <li key={l}>
                <Link
                  href="#"
                  className="text-[0.85rem] text-[rgba(249,246,240,0.5)] no-underline"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1100px] mx-auto border-t border-[rgba(255,255,255,0.06)] pt-[22px] flex justify-between items-center text-[0.74rem] text-[rgba(249,246,240,0.28)] flex-wrap gap-2">
        <span>© 2026 Giáo Xứ Tân Trang · Thiết kế với ❤️</span>
        <span>Giáo Phận TP. Hồ Chí Minh</span>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import NewsCard from "@/components/news/NewsCard";
import NextMassWidget from "@/components/schedule/NextMassWidget";
import { announcementApi, massApi, newsApi } from "@/lib/api";
import { fmtMassTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trang Chủ",
  description:
    "Giáo xứ Tân Trang - Nơi Yêu Thương và Hiệp Nhất. Thuộc Giáo Phận Sài Gòn",
};

export default async function HomePage() {
  const [importantRes, newsRes, massRes, announceRes] = await Promise.all([
    newsApi.getImportant(),
    newsApi.getAll({ limit: 7 }),
    massApi.getWeekly(),
    announcementApi.getActive(),
  ]);

  const important = importantRes.data;
  const articles = (newsRes.data ?? [])
    .filter((a) => a.id !== important?.id)
    .slice(0, 6);
  const weeklyMass = massRes.data ?? [];
  const annoucements = announceRes.data ?? [];

  const sundayMasses = weeklyMass
    .filter((m) => m.day_of_week === 0)
    .sort((a, b) => a.hour * 60 + a.min - (b.hour * 60 + b.min));
  const weekdayMasses = weeklyMass
    .filter((m) => m.day_of_week === 1)
    .sort((a, b) => a.hour * 60 + a.min - (b.hour * 60 + b.min));

  return (
    <>
      {/* Hero */}
      <section className="relative z-[1] min-h-screen grid grid-cols-2 pt-[86px]">
        {/* Left */}
        <div className="flex flex-col justify-center px-[72px] py-[72px] pr-[64px] relative">
          <div className="flex items-center gap-[10px] mb-6">
            <div className="w-[26px] h-[1.5px] bg-[linear-gradient(to_right, var(--gold2), var(--gold3))] rounded-[1px]" />
            <span className="text-[0.68rem] tracking-[0.18em] uppercase font-bold text-[var(--gold)]">
              Chào mừng đến Giáo Xứ Tân Trang
            </span>
          </div>

          <h1 className="font-[var(--font-display)] text-[clamp(2.8rem, 5vw, 4.8rem)] font-normal leading-[1.1] text-[var(--navy)] mb-6">
            <em className="italic text-[var(--gold)]">Nơi Yêu</em>
            <br />
            <strong className="font-bold block">
              Thương &amp;
              <br />
              Hiệp Nhất
            </strong>
          </h1>

          <div className="w-[52px] h-[1.5px] bg-[linear-gradient(to_right,var(--gold3),transparent)] mb-[22px]" />

          <p className="text-[1.02rem] text-[var(--text2)] max-w-[390px] leading-[1.82] mb-10">
            Giáo xứ Tân Trang đồng hành cùng mọi gia đình trong hành trình đức
            tin, yêu thương và phục vụ — thuộc Giáo Phận Sài Gòn.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/lich-le"
              className="inline-flex items-center gap-2 min-h-[44px] px-[26px] bg-[linear-gradient(150deg,var(--navy2),var(--navy))] text-white no-underline font-[var(--font-body)] text-[0.85rem] font-bold tracking-[0.04em] rounded-[24px] shadow-[0_2px_16px_var(--shadow)]"
            >
              Xem Lịch Thánh Lễ →
            </Link>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 min-h-[44px] px-[26px] bg-[var(--card)] [backdrop-filter:blur(16px)] border-[1.5px] border-[var(--border-gold)] text-[var(--navy2)] no-underline font-[var(--font-body)] text-[0.85rem] font-semibold rounded-[24px]"
            >
              Tin Tức Mới Nhất
            </Link>
          </div>

          <div className="flex gap-7 mt-12 p-[20px_26px] rounded-[24px] bg-[var(--card)] [backdrop-filter:blur(20px)] border border-[var(--border)] shadow-[0_2px_0_rgba(255,255,255,0.5)_inset,0_6px_24px_var(--shadow)] w-fit">
            {[
              ["1k+", "Giáo Dân"],
              ["12", "Cộng Đoàn"],
              ["7", "Thánh Lễ/Tuần"],
            ].map(([num, lbl], i) => (
              <div key={lbl} className="flex items-center">
                {i > 0 && (
                  <div className="w-[1px] self-stretch mx-7 bg-[linear-gradient(to_bottom,transparent,var(--border-gold),transparent)]" />
                )}
                <div className="text-center">
                  <div className="font-[var(--font-display)] text-[2rem] font-semibold text-[var(--navy)] leading-none mb-[3px]">
                    {num.includes("+") ? (
                      <>
                        {num.replace("+", "")}
                        <span className="text-[var(--gold)]">+</span>
                      </>
                    ) : (
                      num
                    )}
                  </div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--text3)]">
                    {lbl}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — arch */}
        <div className="relative overflow-hidden flex items-center justify-center p-[60px_48px_60px_52px]">
          <div className="relative flex items-center justify-center w-full">
            {/* Arch */}
            <div className="w-[340px] h-[440px] rounded-[180px_180px_12px_12px] bg-[linear-gradient(175deg,#1C2F52_0%,#111D35_60%,#0a1525_100%)] relative overflow-hidden shadow-[0_0_0_10px_rgba(200,146,26,0.08),0_0_0_20px_rgba(200,146,26,0.04),0_24px_80px_var(--shadow)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(200,146,26,0.15)_0%,transparent_60%)]" />

              {/* Rose window SVG */}
              <svg
                className="absolute top-9 left-1/2 -translate-x-1/2 w-[160px] h-[160px] opacity-[0.18]"
                viewBox="0 0 180 180"
                fill="none"
              >
                <circle
                  cx="90"
                  cy="90"
                  r="85"
                  stroke="#D4A844"
                  strokeWidth="1.5"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="60"
                  stroke="#D4A844"
                  strokeWidth="1"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="35"
                  stroke="#D4A844"
                  strokeWidth="1"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="12"
                  stroke="#D4A844"
                  strokeWidth="1.5"
                  fill="rgba(212,168,68,0.15)"
                />
                <line
                  x1="90"
                  y1="5"
                  x2="90"
                  y2="175"
                  stroke="#D4A844"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="5"
                  y1="90"
                  x2="175"
                  y2="90"
                  stroke="#D4A844"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              </svg>

              {/* Cross */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]">
                <div className="w-[3px] h-[90px] bg-[linear-gradient(to_bottom,var(--gold3),rgba(200,146,26,0.3))] absolute left-1/2 -translate-x-1/2 rounded-[2px]" />
                <div className="w-[54px] h-[3px] bg-[linear-gradient(to_right,rgba(200,146,26,0.3),var(--gold3),rgba(200,146,26,0.3))] absolute top-6 left-1/2 -translate-x-1/2 rounded-[2px]" />
              </div>
            </div>

            {/* Next mass card */}
            <div className="absolute bottom-[70px] -left-6 w-[224px] p-[14px_16px] rounded-[24px] bg-[var(--card)] [backdrop-filter:blur(32px)] border border-[var(--border)] shadow-[0_2px_0_rgba(255,255,255,0.6)_inset,0_12px_40px_var(--shadow)]">
              <NextMassWidget />
            </div>

            {/* Year badge */}
            <div className="absolute top-14 -right-[14px] p-[9px_14px] rounded-[16px] bg-[var(--goldbg)] [backdrop-filter:blur(20px)] border border-[var(--border-gold)] shadow-[0_2px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_var(--shadow)] text-center">
              <div className="font-[var(--font-display)] text-[1.5rem] font-semibold text-[var(--gold)] leading-none">
                2xxx
              </div>
              <div className="text-[0.6rem] tracking-[0.12em] uppercase text-[var(--gold)] font-bold mt-[2px]">
                Thành Lập
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule bar */}
      <section className="relative z-[1] px-[72px] py-[88px] bg-[linear-gradient(175deg,#111D35_0%,#0c1828_100%)] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_400px_at_50%_50%,rgba(200,146,26,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-[1] text-center mb-10">
          <div className="flex items-center justify-center gap-[10px] mb-[14px]">
            <div className="w-[22px] h-[1px] bg-[linear-gradient(to_right,transparent,rgba(200,146,26,0.8))]" />
            <span className="text-[0.66rem] tracking-[0.22em] uppercase text-[rgba(229,184,74,0.85)] font-bold">
              Phụng Vụ
            </span>
            <div className="w-[22px] h-[1px] bg-[linear-gradient(to_left,transparent,rgba(200,146,26,0.8))]" />
          </div>
          <h2 className="font-[var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-[rgba(249,246,240,0.95)]">
            Giờ lễ hằng tuần
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-[1px] max-w-[960px] mx-auto bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] rounded-[24px] overflow-hidden">
          {[
            {
              day: "Thứ Hai - Sáu",
              masses: weekdayMasses.length
                ? weekdayMasses
                : [
                    { hour: 5, min: 0, label: "Lễ Sáng Thường Ngày" },
                    { hour: 17, min: 45, label: "Lễ Chiều Thường Ngày" },
                  ],
            },
            {
              day: "Thứ Bảy",
              masses: weekdayMasses
                .filter((m) => m.day_of_week === 6)
                .sort((a, b) => a.hour * 60 + a.min - (b.hour * 60 + b.min)),
            },
            {
              day: "Chúa Nhật",
              masses: [
                { hour: 5, min: 0, label: "Lễ 1 Sáng Chúa Nhật" },
                { hour: 7, min: 30, label: "Lễ 2 Sáng Chúa Nhật" },
                { hour: 16, min: 0, label: "Lễ 3 Chiều Chúa Nhật" },
                { hour: 17, min: 30, label: "Lễ 3 Chiều Chúa Nhật" },
              ],
            },
          ].map(({ day, masses }) => (
            <div
              key={day}
              className="p-[28px_22px] bg-[rgba(255,255,255,0.028)]"
            >
              <div className="text-[0.63rem] tracking-[0.18em] uppercase text-[rgba(229,184,74,0.85)] font-bold mb-3">
                {day}
              </div>
              {masses.map((m, i) => (
                <div
                  key={i}
                  className="font-[var(--font-display)] text-[1.2rem] font-normal text-[rgba(249,246,240,0.92)] mb-2"
                >
                  {fmtMassTime(m.hour, m.min)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="relative z-[1] px-[72px] py-[88px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-[var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium text-[var(--navy)]">
              Tin Tức &amp; Thông Báo
            </h2>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-[6px] text-[0.82rem] font-bold text-[var(--gold)] no-underline px-[18px] py-2 rounded-full border-[1.5px] border-[var(--border-gold)] bg-[var(--goldbg)]"
            >
              Xem Tất Cả →
            </Link>
          </div>

          {/* Featured */}
          {important && (
            <div className="grid grid-cols-[1.8fr_1fr] gap-4 mb-[14px]">
              <NewsCard article={important} variant="main" />
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-[1px] bg-[linear-gradient(to_right,transparent,var(--border-gold),transparent)]" />
            <span className="text-[0.66rem] tracking-[0.18em] uppercase text-[var(--gold)] font-bold">
              Tin Tức Mới
            </span>
            <div className="flex-1 h-[1px] bg-[linear-gradient(to_left,transparent,var(--border-gold),transparent)]" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-4">
            {articles.map((a, i) => (
              <NewsCard
                key={a.id}
                article={a}
                variant={i < 3 ? "default" : "small"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITIES ── */}
      {/* <section className="relative z-[1] px-[72px] pb-[88px]">
        <div className="max-w-[1100px] mx-auto p-[44px_52px] rounded-[32px] bg-[var(--card)] [backdrop-filter:blur(28px)] border border-[var(--border)] shadow-[0_2px_0_rgba(255,255,255,0.5)_inset,0_12px_48px_var(--shadow)] flex items-center justify-between gap-8 flex-wrap">
          <div>
            <div className="text-[0.66rem] tracking-[0.2em] uppercase text-[var(--gold)] font-bold mb-[7px]">
              Liên Hệ Với Chúng Tôi
            </div>
            <h3 className="font-[var(--font-display)] text-[1.75rem] font-medium text-[var(--navy)] leading-[1.25]">
              Chúng tôi luôn
              <br />
              sẵn sàng đón tiếp
            </h3>
          </div>

          <div className="flex gap-7 flex-wrap">
            {[
              { icon: "📍", title: "Địa Chỉ", sub: "TP. Hồ Chí Minh" },
              { icon: "📞", title: "Văn Phòng", sub: "T2 – T7 · 8h–16h" },
              { icon: "📘", title: "Facebook", sub: "Gx. Tân Trang" },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-[10px] text-[0.86rem] text-[var(--text2)]"
              >
                <div className="w-[38px] h-[38px] rounded-[8px] shrink-0 bg-[linear-gradient(150deg,var(--navy2),var(--navy))] flex items-center justify-center text-[0.95rem] shadow-[0_2px_8px_var(--shadow)]">
                  {icon}
                </div>
                <div>
                  <div className="font-bold text-[var(--navy)] text-[0.84rem]">
                    {title}
                  </div>
                  <div>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}

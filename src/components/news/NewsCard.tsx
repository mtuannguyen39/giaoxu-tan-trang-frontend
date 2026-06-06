import Link from "next/link";
import type { NewsArticle } from "@/types";
import { formatDateVN, truncate, placeholderGradient } from "@/lib/utils";

interface Props {
  article: NewsArticle;
  variant?: "main" | "default" | "small";
}

export default function NewsCard({ article, variant = "default" }: Props) {
  const isMain = variant === "main";
  const isSmall = variant === "small";

  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="news-card rounded-[24px] overflow-hidden flex flex-col no-underline text-inherit bg-[var(--card)] [backdrop-filter:blur(24px)_saturate(1.5)] border border-[var(--border)] shadow-[0_2px_0_rgba(255,255,255,0.5)_inset,0_6px_24px_var(--shadow)] transition-[transform,box-shadow] duration-300"
    >
      {/* Image / placeholder */}
      <div
        className={`w-full relative flex items-center justify-center bg-cover bg-center
          ${isMain ? "aspect-[16/7] text-[3rem]" : "aspect-[16/8] text-[2rem]"}
          ${!article.cover_image_url ? placeholderGradient(article.id) : ""}
        `}
        style={{
          backgroundImage: article.cover_image_url
            ? `url(${article.cover_image_url})`
            : undefined,
        }}
      >
        {!article.cover_image_url && "⛪"}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(17,29,53,0.35))]" />
      </div>

      {/* Body */}
      <div className="p-[18px_18px_14px] flex-1 flex flex-col">
        <div className="text-[0.62rem] tracking-[0.16em] uppercase text-[var(--gold)] font-bold mb-[6px]">
          {article.communities?.name ?? "Giáo xứ"}
        </div>

        <h3
          className={`font-[var(--font-display)] font-medium text-[var(--navy)] leading-[1.42] mb-[6px] transition-colors duration-300
          ${isMain ? "text-[1.38rem]" : isSmall ? "text-[0.9rem]" : "text-[1rem]"}
        `}
        >
          {article.title}
          {article.is_important && (
            <span className="inline-block px-2 py-[2px] rounded-full text-[0.6rem] font-extrabold tracking-[0.08em] uppercase ml-[6px] align-middle bg-[rgba(200,146,26,0.18)] text-[var(--gold)]">
              📌 Quan Trọng
            </span>
          )}
        </h3>

        {!isSmall && article.excerpt && (
          <p className="text-[0.82rem] text-[var(--text2)] leading-[1.7] flex-1">
            {truncate(article.excerpt, 120)}
          </p>
        )}

        <div className="mt-3 pt-[10px] border-t border-[var(--border-gold)] flex justify-between items-center text-[0.72rem] text-[var(--text3)]">
          <span>
            {article.published_at
              ? formatDateVN(article.published_at)
              : "Bản nháp"}
          </span>
          <span className="font-bold text-[var(--gold)] flex items-center gap-1">
            Đọc tiếp →
          </span>
        </div>
      </div>
    </Link>
  );
}

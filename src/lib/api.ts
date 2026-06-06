const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// Generic fetcher
async function apiFetch<T>(
  path: string,
  options?: RequestInit & { tags?: string[]; revalidate?: number | false },
): Promise<T> {
  const { tags, revalidate, ...fetchOptions } = options ?? {};

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    next: {
      ...(tags ? { tags } : {}),
      ...(revalidate !== undefined ? { revalidate } : { revalidate: 60 }),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error ${res.status}`);
  }

  return res.json();
}

// NEWS
import type {
  NewsArticle,
  NewsQueryParams,
  ApiResponse,
  PaginatedResponse,
  Community,
  MassSchedule,
  Announcement,
  CatholicCalendarDay,
} from "@/types";

export const newsApi = {
  // Danh sách tin tức (public, SSR)
  getAll: (params: NewsQueryParams = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", String(params.page));
    if (params.limit) q.set("limit", String(params.limit));
    if (params.community_id) q.set("community_id", params.community_id);
    if (params.q) q.set("q", params.q);
    if (params.sort) q.set("sort", params.sort);

    const qs = q.toString();
    return apiFetch<PaginatedResponse<NewsArticle>>(
      `/news${qs ? `?${qs}` : ""}`,
      { tags: ["news"], revalidate: 60 },
    );
  },

  // Tin quan trọng (is_important)
  getImportant: () =>
    apiFetch<ApiResponse<NewsArticle>>("/news/important", {
      tags: ["news-important"],
      revalidate: 120,
    }),

  // Chi tiết bài viết theo slug
  getBySlug: (slug: string) =>
    apiFetch<ApiResponse<NewsArticle>>(`/news/${slug}`, {
      tags: [`news-${slug}`],
      revalidate: 300,
    }),
};

// COMMUNITIES
export const communityApi = {
  getAll: () =>
    apiFetch<ApiResponse<Community[]>>("/communities", {
      tags: ["communities"],
      revalidate: 600,
    }),

  getBySlug: (slug: string) =>
    apiFetch<ApiResponse<Community>>(`/communities/${slug}`, {
      tags: [`community-${slug}`],
      revalidate: 600,
    }),
};

// MASS SCHEDULE
export const massApi = {
  getWeekly: () =>
    apiFetch<ApiResponse<MassSchedule[]>>("/mass-schedule/weekly", {
      tags: ["mass-schedule"],
      revalidate: 3600,
    }),

  getNext: () =>
    apiFetch<ApiResponse<MassSchedule & { countdown_minutes: number }>>(
      "/mass-schedule/next",
      { revalidate: 0 }, // luôn fresh - server component sẽ gọi lại
    ),

  getSpecial: () =>
    apiFetch<ApiResponse<MassSchedule[]>>("/mass-schedule/special", {
      tags: ["mass-schedule-special"],
      revalidate: 3600,
    }),
};

// ANNOUNCEMENTS
export const announcementApi = {
  getActive: () =>
    apiFetch<ApiResponse<Announcement[]>>("/announcements", {
      tags: ["announcements"],
      revalidate: 30, // thông báo refresh nhanh hơn
    }),
};

// CALENDAR
export const calendarApi = {
  getToday: () =>
    apiFetch<ApiResponse<CatholicCalendarDay>>("/calendar/today", {
      revalidate: 3600,
    }),

  getMonth: (year: number, month: number) =>
    apiFetch<ApiResponse<CatholicCalendarDay[]>>(
      `/calendar/month/${year}/${month}`,
      { tags: [`calendar-${year}-${month}`], revalidate: 86400 },
    ),
};

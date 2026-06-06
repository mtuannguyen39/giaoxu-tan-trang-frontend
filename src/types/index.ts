export type UserRole = "super_admin" | "admin" | "editor" | "viewer";
export type NewsStatus = "draft" | "published" | "archived";
export type CommunityType = "giao_khu" | "doan_the" | "khac";
export type AnnouncementType = "khan_cap" | "lich_su" | "thong_thuong";
export type LiturgicalSeason =
  | "mua_vong"
  | "giang_sinh"
  | "thuong_nien"
  | "mua_chay"
  | "phuc_sinh";
export type LiturgicalColor = "trang" | "do" | "xanh_la" | "tim" | "hong";
export type FeastLevel = "le_trong" | "le_kinh" | "le_nho" | "ngay_thuong";

// ─── Community ───────────────────────────────────────────────
export interface Community {
  id: string;
  name: string;
  slug: string;
  type: CommunityType;
  description: string | null;
  leader_name: string | null;
  contact_phone: string | null;
  meeting_schedule: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// ─── News ────────────────────────────────────────────────────
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  community_id: string | null;
  author_id: string | null;
  is_important: boolean;
  is_pinned: boolean;
  status: NewsStatus;
  published_at: string | null;
  view_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  // joined fields from backend
  communities?: Pick<Community, "name" | "slug"> | null;
}

// ─── Mass Schedule ───────────────────────────────────────────
export interface MassSchedule {
  id: string;
  day_of_week: number | null; // 0=CN, 1=T2 ... 6=T7 (null = lễ đặc biệt)
  specific_date: string | null; // YYYY-MM-DD
  hour: number;
  min: number;
  label: string;
  type: string;
  is_active: boolean;
}

// ─── Announcement ────────────────────────────────────────────
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  display_from: string | null;
  display_until: string | null;
  is_active: boolean;
  created_at: string;
}

// ─── Catholic Calendar ───────────────────────────────────────
export interface CatholicCalendarDay {
  id: string;
  date: string;
  year: number;
  liturgical_name: string | null;
  liturgical_season: LiturgicalSeason;
  liturgical_color: LiturgicalColor;
  feast_level: FeastLevel;
  saint_of_day: string | null;
  gospel_reference: string | null;
  notes: string | null;
}

// ─── API Response wrapper ────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

// ─── Query params ────────────────────────────────────────────
export interface NewsQueryParams {
  page?: number;
  limit?: number;
  community_id?: string;
  status?: NewsStatus;
  is_important?: boolean;
  tag?: string;
  q?: string;
  sort?: "newest" | "oldest" | "popular";
}

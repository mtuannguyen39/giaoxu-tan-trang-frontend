const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("gx-admin-token");
}

async function adminFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    adminFetch<{ success: boolean; token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => adminFetch<{ success: boolean; data: any }>("/users/me"),
};

// NEWS CRUD
export const adminNewsApi = {
  getAll: (params: { page?: number; limit?: number; status?: string } = {}) => {
    const q = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 20),
      ...(params.status ? { status: params.status } : {}),
    });
  },
  create: (data: any) =>
    adminFetch<any>("/news/admin", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/news/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/news/admin/${id}`, { method: "DELETE" }),
  publish: (id: string) =>
    adminFetch<any>(`/news/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "published",
        published_at: new Date().toISOString(),
      }),
    }),
};

// COMMUNITIES CRUD
export const adminCommunityApi = {
  getAll: () => adminFetch<any>("/communities"),
  create: (data: any) =>
    adminFetch<any>("/communities/admin", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/communities/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/communities/admin/${id}`, { method: "DELETE" }),
};

// ANNOUNCEMENTS CRUD
export const adminAnnouncementApi = {
  getAll: () => adminFetch<any>("/mass-schedule/weekly"),
  create: (data: any) =>
    adminFetch<any>("/mass-schedule/admin", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/mass-schedule/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/mass-schedule/admin/${id}`, { method: "DELETE" }),
};

// CALENDAR CRUD
export const adminCalendarApi = {
  getMonth: (year: number, month: number) =>
    adminFetch<any>(`/calendar/month/${year}/${month}`),
  create: (data: any) =>
    adminFetch<any>("/calendar/admin", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/calendar/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    adminFetch<any>(`/calendar/admin/${id}`, { method: "DELETE" }),
};

// USERS CRUD
export const adminUserApi = {
  getAll: () => adminFetch<any>("/users"),
  create: (data: any) =>
    adminFetch<any>("/users", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    adminFetch<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => adminFetch<any>(`/users/${id}`, { method: "DELETE" }),
};

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: string;
  color: string;
  trend: string;
}

export default function AdminDashboard() {
  // Phần stat này cần chỉnh lại theo dữ liệu thực tế được lấy từ backend
  const stats: Stat[] = [
    {
      label: "Tổng Bài Viết",
      value: "48",
      sub: "+6 bài tháng này",
      icon: "📰",
      color: "rgba(232,169,68,0.12)",
      trend: "↑ 12%",
    },
    {
      label: "Giáo Dân",
      value: "5k+",
      sub: "12 cộng đoàn",
      icon: "👥",
      color: "rgba(74,222,128,0.1)",
      trend: "↑ 8%",
    },
    {
      label: "Lượt Xem/Tuần",
      value: "2.4k",
      sub: "Tăng Chúa Nhật",
      icon: "👁",
      color: "rgba(96,165,250,0.1)",
      trend: "↑ 24%",
    },
    {
      label: "Thông Báo Chờ",
      value: "3",
      sub: "Cần phê duyệt",
      icon: "🔔",
      color: "rgba(167,139,250,0.1)",
      trend: "⚠️ Chờ",
    },
  ];

  // Các nút action nhanh
  const quickActions = [
    {
      href: "/admin/news?action=new",
      icon: "✏️",
      label: "Viết Tin Tức",
      sub: "Tạo bài viết mới",
    },
    {
      href: "/admin/schedule",
      icon: "🕐",
      label: "Cập Nhật Lịch",
      sub: "Sửa giờ Thánh Lễ",
    },
    {
      href: "/admin/announcements?action=new",
      icon: "📢",
      label: "Gửi Thông Báo",
      sub: "Thông báo GX",
    },
    {
      href: "/admin/calendar",
      icon: "📅",
      label: "Lịch CG",
      sub: "Thêm ngày lễ",
    },
    {
      href: "/admin/communities",
      icon: "👥",
      label: "Cộng Đoàn",
      sub: "Quản lý hội đoàn",
    },
    {
      href: "/admin/users",
      icon: "👤",
      label: "Tài Khoản",
      sub: "Quản lý admin",
    },
  ];

  // Phần hoạt động gần đây cần update lấy dữ liệu thực tế từ backend đổ lên
  const recentActivity = [
    {
      icon: "✏️",
      msg: 'Admin A đã đăng bài "Tuần Thánh 2026"',
      time: "5 phút trước",
      color: "rgba(232,169,68,0.1)",
    },
    {
      icon: "📢",
      msg: "Admin B đã tạo thông báo về văn phòng",
      time: "32 phút trước",
      color: "rgba(96,165,250,0.1)",
    },
    {
      icon: "🕐",
      msg: "Super Admin cập nhật lịch Lễ Trọng",
      time: "2 giờ trước",
      color: "rgba(74,222,128,0.1)",
    },
    {
      icon: "👥",
      msg: "Editor C đã sửa thông tin Giáo Khu 2",
      time: "Hôm qua",
      color: "rgba(167,139,250,0.1)",
    },
  ];

  // Dữ liệu biểu đồ lượt xem theo ngày trong 1 tuần cần update dữ liệu thực tế được lấy từ backend
  const chartData = [
    { day: "T2", views: 320, h: 55 },
    { day: "T3", views: 245, h: 42 },
    { day: "T4", views: 348, h: 60 },
    { day: "T5", views: 280, h: 48 },
    { day: "T6", views: 412, h: 70 },
    { day: "T7", views: 554, h: 95 },
    { day: "CN", views: 680, h: 100 },
  ];

  const cardCls =
    "bg-[var(--card)] [backdrop-filter:blur(20px)] border border-[var(--card-b,rgba(255,255,255,0.09))] rounded-[18px] shadow-[0_8px_24px_var(--shadow)]";

  return (
    <div>
      <h1 className="font-[var(--font-display)] text-[1.6rem] font-medium text-[var(--text1)] mb-6">
        Dashboard
      </h1>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-[14px] mb-5">
        {stats.map((s) => (
          <div key={s.label} className={`${cardCls} p-5`}>
            <div className="flex items-start justify-between mb-[14px]">
              <div
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[1.1rem]"
                style={{ background: s.color }}
              />
              <span className="text-[0.65rem] font-bold text-[var(--green, #4ade80)] bg-[rgba(74,222,128,0.1)] px-2 py-[3px] rounded-full">
                {s.trend}
              </span>
            </div>
            <div className="font-[var(--font-display)] text-[2.2rem] font-normal text-[var(--text1)] leading-none">
              {s.value}
            </div>
            <div className="text-[0.7rem] text-[var(--text-3)] uppercase tracking-[0.08rem] mt-[5px]">
              {s.label}
            </div>
            <div className="text-[0.72rem] text-[var(--text2)] mt-[3px]">
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-[1.2fr_1fr] gap-[14px] mb-5">
        <div className={cardCls}>
          <div className="px-5 pt-[18px] font-[var(--font-display)] text-[1.05rem] font-medium text-[var(--text1)] mb-1">
            Thao tác nhanh
          </div>
          <div className="px-5 pb-[10px] text-[0.75rem] text-[var(--text3)]">
            Tạo và quản lý nội dung
          </div>
          <div className="px-5 pb-[18px] grid grdi-cols-2 gap-2">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-3 p-[12px_14px] bg-[var(--card)] rounded-[10px] border border-[var(--card-b, rgba(255,255,255,0.09))] no-underline transition-transform duration-200"
              >
                <div className="w-8 h-8 rounded-[8px] bg-[rgba(232,169,68,0.12)] border border-[rgba(232,169,68,0.22)] flex items-center justify-center text-[0.9rem] shrink-0">
                  {a.icon}
                </div>
                <div>
                  <div className="text-[0.78rem] font-bold text-[var(--text-1)]">
                    {a.label}
                  </div>
                  <div className="text-[0.66rem] text-[var(--text-3)] mt-[1px]">
                    {a.sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity (TODO: update chức năng lấy dữ liệu từ server) */}
        <div className={cardCls}>
          <div className="px-5 pt-[18px] pb-[10px] font-[var(--font-display)] text-[1.05rem] font-medium text-[var(--text1)]">
            Hoạt động gần đây
          </div>
          <div className="px-5 pb-[18px] flex flex-col">
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 py-[11px] ${i < recentActivity.length - 1 ? "border-b border-[var(--card-b, rgba(255,255,255,0.09))]" : ""}`}
              >
                <div
                  className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center text-[0.08rem] shrink-0 mt-[1px]"
                  style={{ background: a.color }}
                >
                  {a.icon}
                </div>
                <div>
                  <div className="text-[0.78rem] text-[var(--text1)] leading-[1.45]">
                    {a.msg}
                  </div>
                  <div className="text-[0.66rem] text-[var(--text3)] mt-[2px]">
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      {/* TODO: update chức năng lấy dữ liệu thực từ server */}
      <div className={`${cardCls} mb-5`}>
        <div className="px-5 pt-[18px] flex items-center justify-between">
          <div className="font-[var(--font-display)] text-[1.05rem] font-medium text-[var(--text1)]">
            📈 Lượt Xem 7 Ngày Qua
          </div>
          <span className="px-2 py-[2px] rounded-full text-[0.6rem] font-bold bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.2)] text-[var(--blue,#60a5fa)]">
            +24% tuần trước
          </span>
        </div>
        <div className="flex items-end justify-around p-5 gap-2 h-[180px]">
          {chartData.map((d) => (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center gap-[6px]"
            >
              <div className="text-[0.62rem] text-[var(--text3)]">
                {d.views}
              </div>
              <div
                className={`w-full rounded-[5px_5px_2px_2px] transition-[height] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                  ${
                    d.day === "CN" ?
                      "bg-[linear-gradient(to_top,var(--amber,#E5B84A),var(--gold3,#FAE098))]"
                    : "bg-[linear-gradient(to_top,rgba(232,169,68,0.65),rgba(232,169,68,0.3))]"
                  }
                `}
                style={{ height: `${d.h}%` }}
              />
              <div
                className={`text-[0.62rem] ${d.day === "CN" ? "text-[var(--amber,#E5B84A)]" : "text-[var(--text3)]"}`}
              >
                {d.day}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

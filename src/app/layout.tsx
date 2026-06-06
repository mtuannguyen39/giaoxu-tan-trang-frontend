// app/layout.tsx — Root layout (Server Component)
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: { default: "Giáo Xứ Tân Trang", template: "%s | Giáo Xứ Tân Trang" },
  description:
    "Trang thông tin Giáo Xứ Tân Trang — Giáo Phận TP. Hồ Chí Minh. Tin tức, lịch thánh lễ, và các hoạt động cộng đoàn.",
  keywords: ["Giáo Xứ Tân Trang", "Công giáo", "TP Hồ Chí Minh", "Thánh lễ"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Giáo Xứ Tân Trang",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      data-theme="light"
      data-font="playfair"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Inject theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var t=localStorage.getItem('gx-theme');
            var prefersDark=window.matchMedia('(prefers-color-scheme:dark)').matches;
            document.documentElement.setAttribute('data-theme', t||(prefersDark?'dark':'light'));
            var f=localStorage.getItem('gx-font')||'playfair';
            document.documentElement.setAttribute('data-font', f);
          })()
        `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ôn Tập Toán Lớp 7 | Chân Trời Sáng Tạo",
  description: "Trang web học tập, ôn luyện kiến thức Toán lớp 7 trực quan với trắc nghiệm và tự luận.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main style={{ minHeight: "calc(100vh - 140px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

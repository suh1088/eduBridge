import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import MobileContainer from "@/components/MobileContainer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "에듀브릿지 (EduBridge)",
  description: "지방 학생/학부모를 위한 교육 정보 및 전문가 연결 서비스 (Educational Information and Expert Connection Service)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased bg-[#FDFDFF]`}>
        {/* MobileContainer: 모바일 앱 스타일 컨테이너 (Mobile App Style Container) */}
        <MobileContainer>{children}</MobileContainer>
        {/* Toaster: 알림 메시지 컴포넌트 (Toast Notification Component), 하단 중앙 배치 */}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}

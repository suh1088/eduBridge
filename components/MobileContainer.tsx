"use client";
// MobileContainer: 모바일 앱 스타일 컨테이너 (Mobile App Style Container)
// PC(데스크탑) 브라우저에서는 max-w-[430px]로 중앙 고정하여 모바일 앱처럼 보이게 함

import { usePathname } from "next/navigation";
import BottomNavBar from "./BottomNavBar";

export default function MobileContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // 로그인 페이지에서는 하단 내비게이션 바(Bottom Navigation Bar)를 숨김
  const showNav = pathname !== "/login";

  return (
    <div className="min-h-screen bg-[#C6C5B9]/30 flex justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#FDFDFF] shadow-lg">
        {/* 페이지 콘텐츠 영역 (Page Content Area) */}
        <main className={showNav ? "pb-16" : ""}>{children}</main>
        {/* 하단 내비게이션 (Bottom Navigation) - 로그인 페이지 제외 */}
        {showNav && <BottomNavBar />}
      </div>
    </div>
  );
}

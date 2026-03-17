"use client";
// BottomNavBar: 하단 탭 내비게이션 바 (Bottom Tab Navigation Bar)
// 5개 메뉴(홈, 학습상담, 학업관리, 상담, 메뉴)를 하단에 고정 표시

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, BookOpen, Users, Menu } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/community", icon: MessageSquare, label: "질문하기" },
  { href: "/management", icon: BookOpen, label: "학업관리" },
  { href: "/consulting", icon: Users, label: "상담" },
  { href: "/more", icon: Menu, label: "메뉴" },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#C6C5B9] z-50"
      aria-label="하단 탭 내비게이션 (Bottom Tab Navigation)"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          // 현재 경로 활성화 여부 확인 (Check if current path is active)
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] transition-colors ${
                isActive
                  ? "text-[#393D3F]"
                  : "text-[#C6C5B9] hover:text-[#62929E]"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-[#393D3F]" : "text-[#C6C5B9]"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

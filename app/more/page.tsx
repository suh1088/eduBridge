"use client";
// T5 메뉴 페이지 (More / Settings Page)
// 프로필 정보 + 메뉴 항목 목록

import { useRouter } from "next/navigation";
import {
  User,
  ChevronRight,
  Calendar,
  Bell,
  HelpCircle,
  Headphones,
  LogOut,
} from "lucide-react";

// 메뉴 항목 정의 (Menu Item Definitions)
const menuItems = [
  {
    icon: Calendar,
    label: "내 상담 내역",
    sublabel: "예약한 상담 이력 확인",
    disabled: true,
    badge: "준비 중",
  },
  {
    icon: Bell,
    label: "공지사항",
    sublabel: "에듀브릿지 새 소식",
    disabled: true,
    badge: "준비 중",
  },
  {
    icon: HelpCircle,
    label: "자주 묻는 질문",
    sublabel: "FAQ(자주 하는 질문)",
    disabled: false,
    badge: null,
  },
  {
    icon: Headphones,
    label: "고객센터",
    sublabel: "문의 및 불편 신고",
    disabled: true,
    badge: "준비 중",
  },
];

export default function MorePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Mock(모의) 로그아웃 - 로그인 페이지로 이동
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 (Header) */}
      <header className="bg-[#393D3F] px-4 pt-12 pb-6">
        <h1 className="text-[22px] font-bold text-white mb-4">메뉴</h1>

        {/* 프로필 섹션 (Profile Section) */}
        <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-4">
          <div className="w-14 h-14 rounded-full bg-[#62929E] flex items-center justify-center shrink-0">
            <User size={26} color="white" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-[18px] font-bold text-white">김민준</p>
            <p className="text-[13px] text-[#C6C5B9]">minjun@edubridge.kr</p>
            <span className="inline-block mt-1 text-[11px] px-2 py-0.5 bg-[#62929E] rounded-full text-white font-medium">
              고3 수험생
            </span>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* 메뉴 항목 리스트 (Menu Item List) */}
        <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <button
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                    item.disabled
                      ? "cursor-not-allowed opacity-60"
                      : "hover:bg-[#C6C5B9]/10 active:bg-[#C6C5B9]/20"
                  }`}
                >
                  {/* 아이콘 (Icon) */}
                  <div className="w-9 h-9 rounded-xl bg-[#C6C5B9]/30 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#393D3F]" />
                  </div>

                  {/* 메뉴 텍스트 (Menu Text) */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-[#393D3F]">
                      {item.label}
                    </p>
                    <p className="text-[12px] text-gray-400">{item.sublabel}</p>
                  </div>

                  {/* 오른쪽 배지 또는 화살표 (Right Badge or Arrow) */}
                  {item.badge ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#C6C5B9]/40 text-[#393D3F] font-medium shrink-0">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight size={16} className="text-[#C6C5B9] shrink-0" />
                  )}
                </button>

                {/* 구분선 (Divider) - 마지막 항목 제외 */}
                {index < menuItems.length - 1 && (
                  <div className="h-px bg-[#C6C5B9]/20 mx-4" />
                )}
              </div>
            );
          })}
        </div>

        {/* 로그아웃 버튼 (Logout Button) */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-white border border-[#C6C5B9]/50 rounded-2xl px-4 py-4 hover:bg-red-50 hover:border-red-200 transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <LogOut size={18} className="text-red-500" />
          </div>
          <span className="text-[15px] font-semibold text-red-500">
            로그아웃
          </span>
        </button>

        {/* 앱 버전 정보 (App Version Info) */}
        <div className="text-center py-4">
          <p className="text-[12px] text-gray-400">
            에듀브릿지(EduBridge) v0.1.0 · 프로토타입 버전
          </p>
          <p className="text-[11px] text-gray-300 mt-0.5">
            지방 교육 격차 해소 프로젝트
          </p>
        </div>
      </div>
    </div>
  );
}

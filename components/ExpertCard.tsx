// ExpertCard: 전문가 카드 컴포넌트 (Expert Card Component)
// T4 상담 페이지에서 전문가 목록을 카드 형태로 표시

import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import type { Expert } from "@/lib/mockData";

interface Props {
  expert: Expert;
}

export default function ExpertCard({ expert }: Props) {
  return (
    <Link href={`/consulting/${expert.id}`}>
      <div className="bg-white rounded-2xl border border-[#C6C5B9]/50 p-4 flex items-center gap-3 hover:border-[#62929E] transition-colors active:bg-gray-50">
        {/* 아바타 (Avatar) - 이름 첫 글자 */}
        <div className="w-12 h-12 rounded-full bg-[#393D3F] flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-[16px]">
            {expert.name[0]}
          </span>
        </div>

        {/* 전문가 정보 (Expert Information) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[16px] font-semibold text-[#393D3F] truncate">
              {expert.name}
            </span>
            {/* 역할 뱃지: 선생님 / 멘토 (Role Badge) */}
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                expert.role === "선생님"
                  ? "bg-[#393D3F]/10 text-[#393D3F]"
                  : "bg-[#62929E]/15 text-[#62929E]"
              }`}
            >
              {expert.role}
            </span>
          </div>

          {/* 소속 대학 또는 전공 (University or Major) */}
          <p className="text-[13px] text-gray-500 truncate mb-1">
            {expert.role === "멘토"
              ? `${expert.university} · ${expert.major}`
              : expert.major}
          </p>

          {/* 담당 과목 태그 (Subject Tags) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {expert.subjects.map((subject) => (
              <span
                key={subject}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[#C6C5B9]/40 text-[#393D3F]"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* 오른쪽 영역: 평점 + 화살표 (Right Side: Rating + Arrow) */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-0.5">
            <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
            <span className="text-[13px] font-semibold text-[#393D3F]">
              {expert.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            리뷰 {expert.reviewCount}
          </span>
          <ChevronRight size={16} className="text-[#C6C5B9]" />
        </div>
      </div>
    </Link>
  );
}

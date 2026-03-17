"use client";
// T4 상담 페이지 (Consulting Page)
// 전문가(선생님/멘토) 목록 + 상단 필터 탭

import { useState } from "react";
import ExpertCard from "@/components/ExpertCard";
import { mockExperts } from "@/lib/mockData";

type FilterType = "전체" | "선생님" | "멘토";

export default function ConsultingPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");

  // 필터에 따라 전문가 목록 필터링 (Filter experts by selected type)
  const filteredExperts =
    activeFilter === "전체"
      ? mockExperts
      : mockExperts.filter((e) => e.role === activeFilter);

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 (Header) */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4">
        <h1 className="text-[22px] font-bold text-white">상담</h1>
        <p className="text-[13px] text-[#C6C5B9] mt-0.5">
          선생님 · 대학생 멘토와 1:1 상담
        </p>
      </header>

      {/* 필터 탭: 전체 / 선생님 / 멘토 (Filter Tabs) */}
      <div className="sticky top-[88px] z-30 bg-[#FDFDFF] px-4 py-3 border-b border-[#C6C5B9]/30">
        <div className="flex gap-2">
          {(["전체", "선생님", "멘토"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-[14px] font-semibold transition-colors ${
                activeFilter === filter
                  ? "bg-[#393D3F] text-white"
                  : "bg-[#C6C5B9]/30 text-[#393D3F] hover:bg-[#C6C5B9]/50"
              }`}
            >
              {filter}
              <span className="ml-1.5 text-[12px] opacity-70">
                {filter === "전체"
                  ? mockExperts.length
                  : mockExperts.filter((e) => e.role === filter).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 전문가 목록 (Expert List) */}
      <div className="px-4 py-4 space-y-3">
        {filteredExperts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-[14px]">
            해당 유형의 전문가가 없습니다.
          </div>
        ) : (
          filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))
        )}
      </div>
    </div>
  );
}

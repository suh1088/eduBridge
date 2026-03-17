"use client";
// 학원 찾기 페이지 (Academy Search Page)
// 주변 학원 정보 목록 + 과목별 필터

import { useState } from "react";
import { ArrowLeft, MapPin, Star, Phone, Clock } from "lucide-react";
import Link from "next/link";

// 학원 Mock Data (Academy Mock Data)
const mockAcademies = [
  {
    id: 1,
    name: "한빛 수학학원",
    subjects: ["수학"],
    address: "경북 구미시 형곡동 123-4",
    phone: "054-123-4567",
    hours: "평일 14:00~22:00 / 주말 10:00~18:00",
    rating: 4.8,
    reviewCount: 42,
    description: "수능·내신 수학 전문 학원. 소수 정예 수업으로 개인별 맞춤 지도.",
    tags: ["소수정예", "수능대비", "내신관리"],
    distance: "0.8km",
  },
  {
    id: 2,
    name: "에이스 어학원",
    subjects: ["영어"],
    address: "경북 구미시 원평동 45-2",
    phone: "054-234-5678",
    hours: "평일 15:00~21:00 / 토 10:00~16:00",
    rating: 4.6,
    reviewCount: 38,
    description: "수능 영어 1등급 전문 학원. 독해·듣기·문법을 체계적으로 학습.",
    tags: ["수능영어", "독해특강", "소수정예"],
    distance: "1.2km",
  },
  {
    id: 3,
    name: "탑클래스 학원",
    subjects: ["수학", "영어", "국어"],
    address: "경북 구미시 선산읍 56-7",
    phone: "054-345-6789",
    hours: "평일 13:00~22:00 / 주말 10:00~20:00",
    rating: 4.7,
    reviewCount: 65,
    description: "지역 대표 종합 입시 학원. 수능 전 과목 체계적 커리큘럼 운영.",
    tags: ["종합학원", "입시전문", "재수반운영"],
    distance: "1.5km",
  },
  {
    id: 4,
    name: "이화 국어논술학원",
    subjects: ["국어"],
    address: "경북 구미시 신평동 89-1",
    phone: "054-456-7890",
    hours: "평일 14:00~21:00 / 토 09:00~15:00",
    rating: 4.5,
    reviewCount: 29,
    description: "국어·논술 전문 학원. 수능 국어와 대입 논술을 동시에 대비.",
    tags: ["국어전문", "논술대비", "비문학특강"],
    distance: "2.0km",
  },
  {
    id: 5,
    name: "과학탐구 전문 학원",
    subjects: ["물리", "화학", "생명과학"],
    address: "경북 구미시 임수동 12-3",
    phone: "054-567-8901",
    hours: "평일 15:00~22:00 / 토 10:00~17:00",
    rating: 4.9,
    reviewCount: 31,
    description: "이과 탐구 과목 전문 학원. 물리·화학·생명과학 전 단원 커버.",
    tags: ["이과전문", "탐구올킬", "실험수업"],
    distance: "2.3km",
  },
  {
    id: 6,
    name: "한국사·사회탐구 학원",
    subjects: ["한국사", "사회탐구"],
    address: "경북 구미시 공단동 34-5",
    phone: "054-678-9012",
    hours: "평일 16:00~21:00 / 토 10:00~15:00",
    rating: 4.4,
    reviewCount: 18,
    description: "수능 필수 과목인 한국사와 사회탐구 집중 학습. 단기간 등급 상승 프로그램.",
    tags: ["한국사필수", "사탐전문", "단기완성"],
    distance: "2.8km",
  },
];

const allSubjects = ["전체", "수학", "영어", "국어", "물리", "화학", "생명과학", "한국사", "사회탐구"];

export default function AcademiesPage() {
  const [selectedSubject, setSelectedSubject] = useState("전체");

  const filtered =
    selectedSubject === "전체"
      ? mockAcademies
      : mockAcademies.filter((a) => a.subjects.includes(selectedSubject));

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 (Header) */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4 flex items-center gap-3">
        <Link
          href="/"
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft size={18} color="white" />
        </Link>
        <div>
          <h1 className="text-[20px] font-bold text-white">학원 찾기</h1>
          <p className="text-[12px] text-[#C6C5B9]">주변 학원 정보</p>
        </div>
      </header>

      {/* 과목 필터 (Subject Filter) */}
      <div className="sticky top-[88px] z-30 bg-[#FDFDFF] border-b border-[#C6C5B9]/30 py-3">
        <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide">
          {allSubjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-colors ${
                selectedSubject === subject
                  ? "bg-[#393D3F] text-white"
                  : "bg-[#C6C5B9]/30 text-[#393D3F]"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* 안내 문구 (Notice) */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
          <MapPin size={12} />
          <span>경북 구미시 기준 · {filtered.length}개 학원</span>
        </div>
      </div>

      {/* 학원 목록 (Academy List) */}
      <div className="px-4 py-3 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-[14px]">
            해당 과목의 학원이 없습니다.
          </div>
        ) : (
          filtered.map((academy) => (
            <div
              key={academy.id}
              className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4"
            >
              {/* 학원명 + 거리 */}
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-[16px] font-semibold text-[#393D3F]">
                  {academy.name}
                </h3>
                <span className="text-[12px] text-[#62929E] font-medium shrink-0 ml-2">
                  {academy.distance}
                </span>
              </div>

              {/* 설명 */}
              <p className="text-[13px] text-gray-600 leading-relaxed mb-2">
                {academy.description}
              </p>

              {/* 태그 */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {academy.subjects.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-[#393D3F] text-white font-medium"
                  >
                    {s}
                  </span>
                ))}
                {academy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-[#C6C5B9]/40 text-[#393D3F]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 평점 + 리뷰 수 */}
              <div className="flex items-center gap-1 mb-2">
                <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
                <span className="text-[13px] font-semibold text-[#393D3F]">
                  {academy.rating.toFixed(1)}
                </span>
                <span className="text-[12px] text-gray-400">
                  ({academy.reviewCount}개 리뷰)
                </span>
              </div>

              {/* 상세 정보 */}
              <div className="space-y-1 pt-2 border-t border-[#C6C5B9]/30">
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <MapPin size={13} className="text-[#C6C5B9] shrink-0" />
                  <span>{academy.address}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <Phone size={13} className="text-[#C6C5B9] shrink-0" />
                  <span>{academy.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-[13px] text-gray-500">
                  <Clock size={13} className="text-[#C6C5B9] shrink-0 mt-0.5" />
                  <span>{academy.hours}</span>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}

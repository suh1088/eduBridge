"use client";
// 전문가 상세 페이지 (Expert Detail Page)
// 약력, 담당 과목, 리뷰, 상담 예약하기 버튼 (Toast(토스트) 알림 포함)

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star, ArrowLeft, MapPin } from "lucide-react";
import { mockExperts } from "@/lib/mockData";

export default function ExpertDetailClient() {
  const params = useParams();
  const router = useRouter();
  const expertId = Number(params.id);
  const expert = mockExperts.find((e) => e.id === expertId);

  // 전문가를 찾을 수 없는 경우 (Expert not found)
  if (!expert) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center px-4">
        <p className="text-[16px] text-gray-500 mb-4">전문가를 찾을 수 없습니다.</p>
        <button
          onClick={() => router.back()}
          className="text-[#62929E] font-medium"
        >
          돌아가기
        </button>
      </div>
    );
  }

  // 상담 예약 처리 (Consultation Booking Handler)
  // Toast(토스트) 메시지로 예약 완료 알림
  const handleBooking = () => {
    toast.success("예약이 완료되었습니다!", {
      description: `${expert.name} ${expert.role}이(가) 곧 연락드릴 예정입니다.`,
      duration: 3000,
    });
  };

  // 별점 렌더링 유틸 (Star Rating Render Utility)
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < Math.round(rating) ? "#F59E0B" : "none"}
        stroke={i < Math.round(rating) ? "#F59E0B" : "#D1D5DB"}
      />
    ));

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24">
      {/* 헤더 (Header) */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <h1 className="text-[20px] font-bold text-white">전문가 상세</h1>
      </header>

      <div className="px-4 py-5 space-y-5">
        {/* 프로필 카드 (Profile Card) */}
        <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            {/* 아바타 (Avatar) */}
            <div className="w-16 h-16 rounded-2xl bg-[#393D3F] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-[24px]">
                {expert.name[0]}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[20px] font-bold text-[#393D3F]">
                  {expert.name}
                </h2>
                <span
                  className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                    expert.role === "선생님"
                      ? "bg-[#393D3F]/10 text-[#393D3F]"
                      : "bg-[#62929E]/15 text-[#62929E]"
                  }`}
                >
                  {expert.role}
                </span>
              </div>

              {/* 소속 정보 (Affiliation) */}
              {expert.role === "멘토" && (
                <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-1">
                  <MapPin size={13} />
                  <span>
                    {expert.university} · {expert.major}
                  </span>
                </div>
              )}
              {expert.role === "선생님" && (
                <p className="text-[13px] text-gray-500 mb-1">
                  전공: {expert.major}
                </p>
              )}

              {/* 평점 (Rating) */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {renderStars(expert.rating)}
                </div>
                <span className="text-[14px] font-semibold text-[#393D3F]">
                  {expert.rating.toFixed(1)}
                </span>
                <span className="text-[13px] text-gray-400">
                  ({expert.reviewCount}개 리뷰)
                </span>
              </div>
            </div>
          </div>

          {/* 소개 글 (Bio) */}
          <div className="mt-4 pt-4 border-t border-[#C6C5B9]/30">
            <h3 className="text-[14px] font-semibold text-[#393D3F] mb-2">
              소개
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {expert.bio}
            </p>
          </div>
        </div>

        {/* 담당 과목 (Subjects) */}
        <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4">
          <h3 className="text-[16px] font-semibold text-[#393D3F] mb-3">
            담당 과목
          </h3>
          <div className="flex flex-wrap gap-2">
            {expert.subjects.map((subject) => (
              <span
                key={subject}
                className="px-3 py-1.5 bg-[#393D3F] text-white text-[14px] font-medium rounded-xl"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* 상담 가격 (Consultation Price) */}
        <div className="bg-[#62929E]/10 border border-[#62929E]/30 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[#62929E] font-medium">시간당 상담 가격</p>
            <p className="text-[22px] font-bold text-[#393D3F]">
              {expert.pricePerHour.toLocaleString()}원
            </p>
          </div>
          <p className="text-[12px] text-gray-400 text-right leading-tight">
            50분 기준
            <br />
            화상/채팅 선택
          </p>
        </div>

        {/* 리뷰 목록 (Review List) */}
        <div>
          <h3 className="text-[16px] font-semibold text-[#393D3F] mb-3">
            수강생 리뷰
          </h3>
          <div className="space-y-3">
            {expert.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#393D3F]">
                      {review.author}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-[12px] text-gray-400">{review.date}</span>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 예약 버튼 (Fixed Bottom Booking Button) */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-3 bg-gradient-to-t from-[#FDFDFF] via-[#FDFDFF] to-transparent pt-4">
        <button
          onClick={handleBooking}
          className="w-full py-4 bg-[#393D3F] text-white rounded-2xl text-[16px] font-bold hover:bg-[#62929E] transition-colors shadow-lg"
        >
          상담 예약하기 · 시간당 {expert.pricePerHour.toLocaleString()}원
        </button>
      </div>
    </div>
  );
}

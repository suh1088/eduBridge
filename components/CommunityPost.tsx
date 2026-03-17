"use client";
// CommunityPost: 커뮤니티 게시글 목록 카드 컴포넌트 (클릭 시 상세 페이지 이동)

import { ThumbsUp, ChevronRight } from "lucide-react";
import type { CommunityPost as CommunityPostType } from "@/lib/mockData";

interface Props {
  post: CommunityPostType;
  onClick?: () => void;
}

export default function CommunityPost({ post, onClick }: Props) {
  const hasTeacherAnswer = post.answers.some((a) => a.type === "선생님");

  return (
    <div
      className="bg-white rounded-2xl border border-[#C6C5B9]/50 overflow-hidden cursor-pointer active:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      {/* 게시글 헤더 (Post Header) */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* 과목 태그(Badge) */}
            <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-[#62929E]/15 text-[#62929E]">
              {post.subject}
            </span>
            <span className="text-[13px] text-gray-400">{post.author}</span>
          </div>
          <span className="text-[12px] text-gray-400">{post.createdAt}</span>
        </div>

        {/* 질문 본문 (Question Content) - 2줄 제한 */}
        <p className="text-[15px] text-[#393D3F] leading-relaxed line-clamp-2">
          {post.content}
        </p>
      </div>

      {/* 답변 뱃지 및 하단 정보 (Answer Badges & Footer) */}
      <div className="px-4 py-2.5 border-t border-[#C6C5B9]/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* AI(인공지능) 답변 뱃지 - 항상 표시 */}
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
            ✦ AI 답변
          </span>
          {/* 선생님 답변 뱃지 - 선생님 답변이 있는 경우만 표시 */}
          {hasTeacherAnswer && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              ✦ 선생님 답변
            </span>
          )}
          <div className="flex items-center gap-1 text-[12px] text-gray-400 ml-1">
            <ThumbsUp size={12} />
            <span>{post.likeCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[12px] text-[#62929E] font-medium">
          <span>답변 {post.answers.length}개</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}

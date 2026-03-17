"use client";
// T2 실시간 학습상담 페이지 (Real-time Learning Consultation Community Page)
// 피드(Feed) 스타일의 게시판 + 우하단 FAB(Floating Action Button) 버튼
// 질문 카드 클릭 시 상세 페이지로 이동

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import CommunityPost from "@/components/CommunityPost";
import { getPosts, addPost } from "@/lib/postsStore";
import type { CommunityPost as CommunityPostType } from "@/lib/mockData";

export default function CommunityPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<CommunityPostType[]>(() => getPosts());
  // 질문 작성 모달 열림 상태 (Question Write Modal Open State)
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim() || !newSubject.trim()) return;

    // 새 게시글 추가 (Add new post with mock AI answer)
    addPost({
      author: "나",
      content: newQuestion.trim(),
      subject: newSubject.trim(),
      answers: [
        {
          type: "AI",
          content:
            "AI(인공지능)가 답변을 분석 중입니다. 잠시 후 답변이 등록될 예정입니다. 에듀브릿지의 선생님이 추가 답변을 달아드릴 수 있습니다.",
        },
      ],
      createdAt: new Date().toISOString().slice(0, 10),
      likeCount: 0,
    });

    setPosts(getPosts());
    setNewQuestion("");
    setNewSubject("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 (Header) */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4">
        <h1 className="text-[22px] font-bold text-white">실시간 학습상담</h1>
        <p className="text-[13px] text-[#C6C5B9] mt-0.5">
          AI(인공지능) · 선생님이 바로 답해드려요
        </p>
      </header>

      {/* 게시글 피드(Feed) 목록 */}
      <div className="px-4 py-4 space-y-3 pb-28">
        {posts.map((post) => (
          <CommunityPost
            key={post.id}
            post={post}
            onClick={() => router.push(`/community/${post.id}`)}
          />
        ))}
      </div>

      {/* FAB(Floating Action Button, 플로팅 액션 버튼) - 우하단 고정 */}
      {/* BottomNavBar(하단 내비게이션 바) 위에 위치하도록 bottom-20 설정 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-[#393D3F] rounded-full flex items-center justify-center shadow-lg hover:bg-[#62929E] transition-colors z-40"
        aria-label="질문하기 (Ask a Question)"
        style={{ maxWidth: "calc(430px - 1rem)" }}
      >
        <Plus size={24} color="white" strokeWidth={2.5} />
      </button>

      {/* 질문 작성 모달 (Question Writing Modal) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* 배경 오버레이 (Background Overlay) */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-[430px] bg-white rounded-t-3xl p-6 pb-8">
            {/* 모달 헤더 (Modal Header) */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-semibold text-[#393D3F]">
                질문 작성
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-[#C6C5B9]/30 flex items-center justify-center"
              >
                <X size={16} className="text-[#393D3F]" />
              </button>
            </div>

            {/* 과목 입력 (Subject Input) */}
            <input
              type="text"
              placeholder="과목 (예: 수학, 영어)"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full border border-[#C6C5B9] rounded-xl px-4 py-3 text-[15px] text-[#393D3F] mb-3 focus:outline-none focus:border-[#62929E] transition-colors"
            />

            {/* 질문 내용 입력 (Question Content Input) */}
            <textarea
              placeholder="궁금한 내용을 자유롭게 적어주세요. AI(인공지능)와 선생님이 답변해 드립니다."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={4}
              className="w-full border border-[#C6C5B9] rounded-xl px-4 py-3 text-[15px] text-[#393D3F] resize-none focus:outline-none focus:border-[#62929E] transition-colors mb-4"
            />

            {/* 등록 버튼 (Submit Button) */}
            <button
              onClick={handleSubmitQuestion}
              disabled={!newQuestion.trim() || !newSubject.trim()}
              className="w-full py-3.5 bg-[#393D3F] text-white rounded-xl text-[16px] font-semibold hover:bg-[#62929E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              질문 등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
// 질문 상세 페이지 (Question Detail Page)
// 질문 본문 + 게시글 좋아요 / 답변 목록(좋아요·답글) + 하단 답변 입력창

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, Heart, CornerDownRight } from "lucide-react";
import {
  getPostById,
  addAnswer,
  likePost,
  unlikePost,
  likeAnswer,
  unlikeAnswer,
  addReply,
} from "@/lib/postsStore";

export default function PostDetailClient() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const [post, setPost] = useState(() => getPostById(postId));

  // 답변 입력
  const [answerText, setAnswerText] = useState("");

  // 게시글 좋아요 토글 상태
  const [postLiked, setPostLiked] = useState(false);

  // 답변별 좋아요 토글 상태 (index → boolean)
  const [answerLiked, setAnswerLiked] = useState<Record<number, boolean>>({});

  // 답글 작성 중인 답변 index (null이면 없음)
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  // 답변별 답글 입력 텍스트 (index → string)
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});

  const refresh = () => setPost(getPostById(postId)!);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center px-4">
        <p className="text-[16px] text-gray-500 mb-4">질문을 찾을 수 없습니다.</p>
        <button onClick={() => router.back()} className="text-[#62929E] font-medium">
          돌아가기
        </button>
      </div>
    );
  }

  // 게시글 좋아요
  const handlePostLike = () => {
    if (postLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
    setPostLiked((prev) => !prev);
    refresh();
  };

  // 답변 좋아요
  const handleAnswerLike = (index: number) => {
    const wasLiked = answerLiked[index] ?? false;
    if (wasLiked) {
      unlikeAnswer(postId, index);
    } else {
      likeAnswer(postId, index);
    }
    setAnswerLiked((prev) => ({ ...prev, [index]: !wasLiked }));
    refresh();
  };

  // 답변 등록
  const handleSubmitAnswer = () => {
    if (!answerText.trim()) return;
    addAnswer(postId, { type: "선생님", content: answerText.trim() });
    setAnswerText("");
    refresh();
  };

  // 답글 등록
  const handleSubmitReply = (answerIndex: number) => {
    const text = replyTexts[answerIndex]?.trim();
    if (!text) return;
    addReply(postId, answerIndex, {
      author: "나",
      content: text,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setReplyTexts((prev) => ({ ...prev, [answerIndex]: "" }));
    setReplyingTo(null);
    refresh();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-36">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <h1 className="text-[20px] font-bold text-white">질문 상세</h1>
      </header>

      <div className="px-4 py-5 space-y-4">
        {/* 질문 카드 */}
        <div className="bg-white rounded-2xl border border-[#C6C5B9]/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-[#62929E]/15 text-[#62929E]">
              {post.subject}
            </span>
            <span className="text-[13px] text-gray-400">{post.author}</span>
            <span className="text-[12px] text-gray-400 ml-auto">{post.createdAt}</span>
          </div>
          <p className="text-[16px] text-[#393D3F] leading-relaxed mb-4">{post.content}</p>

          {/* 게시글 좋아요 버튼 */}
          <div className="pt-3 border-t border-[#C6C5B9]/30">
            <button
              onClick={handlePostLike}
              className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${
                postLiked ? "text-rose-500" : "text-gray-400"
              }`}
            >
              <Heart
                size={16}
                fill={postLiked ? "#f43f5e" : "none"}
                stroke={postLiked ? "#f43f5e" : "#9ca3af"}
              />
              <span>{post.likeCount}</span>
            </button>
          </div>
        </div>

        {/* 답변 목록 */}
        <div>
          <h2 className="text-[15px] font-semibold text-[#393D3F] mb-3">
            답변 {post.answers.length}개
          </h2>
          <div className="space-y-3">
            {post.answers.map((answer, index) => {
              const isLiked = answerLiked[index] ?? false;
              const isReplying = replyingTo === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border overflow-hidden ${
                    answer.type === "AI"
                      ? "bg-green-50 border-green-100"
                      : "bg-blue-50 border-blue-100"
                  }`}
                >
                  {/* 답변 본문 */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className={`text-[12px] font-bold ${
                          answer.type === "AI" ? "text-green-700" : "text-blue-700"
                        }`}
                      >
                        {answer.type === "AI" ? "🤖 AI(인공지능) 답변" : "👨‍🏫 선생님 답변"}
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-700 leading-relaxed mb-3">
                      {answer.content}
                    </p>

                    {/* 답변 액션 버튼 (좋아요 · 답글 달기) */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleAnswerLike(index)}
                        className={`flex items-center gap-1 text-[13px] font-medium transition-colors ${
                          isLiked ? "text-rose-500" : "text-gray-400"
                        }`}
                      >
                        <Heart
                          size={14}
                          fill={isLiked ? "#f43f5e" : "none"}
                          stroke={isLiked ? "#f43f5e" : "#9ca3af"}
                        />
                        <span>{answer.likeCount}</span>
                      </button>
                      <button
                        onClick={() => setReplyingTo(isReplying ? null : index)}
                        className="flex items-center gap-1 text-[13px] text-gray-400 font-medium transition-colors hover:text-[#62929E]"
                      >
                        <CornerDownRight size={14} />
                        <span>답글 {answer.replies.length > 0 ? answer.replies.length : "달기"}</span>
                      </button>
                    </div>
                  </div>

                  {/* 답글 목록 */}
                  {answer.replies.length > 0 && (
                    <div
                      className={`border-t px-4 py-3 space-y-3 ${
                        answer.type === "AI" ? "border-green-100 bg-green-50/70" : "border-blue-100 bg-blue-50/70"
                      }`}
                    >
                      {answer.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <CornerDownRight size={14} className="text-gray-300 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[12px] font-semibold text-[#393D3F]">
                                {reply.author}
                              </span>
                              <span className="text-[11px] text-gray-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-[13px] text-gray-600 leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 답글 입력창 (답글 달기 클릭 시 표시) */}
                  {isReplying && (
                    <div
                      className={`border-t px-4 py-3 flex gap-2 items-center ${
                        answer.type === "AI" ? "border-green-100" : "border-blue-100"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="답글을 입력하세요..."
                        value={replyTexts[index] ?? ""}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({ ...prev, [index]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmitReply(index);
                          }
                        }}
                        autoFocus
                        className="flex-1 bg-white border border-[#C6C5B9] rounded-xl px-3 py-2 text-[14px] text-[#393D3F] focus:outline-none focus:border-[#62929E] transition-colors"
                      />
                      <button
                        onClick={() => handleSubmitReply(index)}
                        disabled={!(replyTexts[index] ?? "").trim()}
                        className="w-9 h-9 bg-[#393D3F] rounded-xl flex items-center justify-center hover:bg-[#62929E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                      >
                        <Send size={14} color="white" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 고정 답변 입력창 */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-3 bg-gradient-to-t from-[#FDFDFF] via-[#FDFDFF] to-transparent pt-4">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="답변을 입력하세요..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmitAnswer();
              }
            }}
            className="flex-1 border border-[#C6C5B9] rounded-xl px-4 py-3 text-[15px] text-[#393D3F] focus:outline-none focus:border-[#62929E] transition-colors bg-white"
          />
          <button
            onClick={handleSubmitAnswer}
            disabled={!answerText.trim()}
            className="w-12 h-12 bg-[#393D3F] rounded-xl flex items-center justify-center hover:bg-[#62929E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            aria-label="답변 등록"
          >
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 교육 매거진 전체 목록 페이지 (Education Magazine Full List)
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { mockMagazineArticles, type MagazineArticle } from "@/lib/mockData";

const categoryColors: Record<MagazineArticle["category"], string> = {
  "입시 트렌드": "bg-rose-100 text-rose-600",
  "용어 설명":   "bg-purple-100 text-purple-600",
  "학습 가이드": "bg-[#62929E]/15 text-[#62929E]",
  "교육과정":    "bg-amber-100 text-amber-600",
};

export default function MagazinePage() {
  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4 flex items-center gap-3">
        <Link
          href="/"
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft size={18} color="white" />
        </Link>
        <div>
          <h1 className="text-[20px] font-bold text-white">교육 매거진</h1>
          <p className="text-[12px] text-[#C6C5B9] mt-0.5">입시 트렌드 · 학습 가이드 · 교육과정 안내</p>
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        {mockMagazineArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4 hover:border-[#62929E] transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  categoryColors[article.category]
                }`}
              >
                {article.category}
              </span>
              <span className="text-[11px] text-gray-400 flex items-center gap-0.5 ml-auto">
                <Clock size={11} />
                {article.readMin}분
              </span>
            </div>
            <h2 className="text-[15px] font-semibold text-[#393D3F] leading-snug mb-1.5">
              {article.title}
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
              {article.summary}
            </p>
            <p className="text-[11px] text-gray-300 mt-2">{article.date}</p>
          </div>
        ))}
      </div>

      <div className="h-6" />
    </div>
  );
}

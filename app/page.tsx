// T1 홈 (Home Page)
// 에듀브릿지 메인 홈 화면 - 홍보 배너 + 퀵 메뉴(Quick Menu) 4개

import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Search,
  Users,
  MessageCircle,
  ChevronRight,
  Star,
  Clock,
} from "lucide-react";
import { mockExperts, mockCommunityPosts, mockMagazineArticles, type MagazineArticle } from "@/lib/mockData";

const categoryColors: Record<MagazineArticle["category"], string> = {
  "입시 트렌드": "bg-rose-100 text-rose-600",
  "용어 설명":   "bg-purple-100 text-purple-600",
  "학습 가이드": "bg-[#62929E]/15 text-[#62929E]",
  "교육과정":    "bg-amber-100 text-amber-600",
};

// 퀵 메뉴(Quick Menu) 항목 정의
const quickMenuItems = [
  {
    icon: BookOpen,
    label: "학습 서비스 안내",
    sublabel: "Guide",
    href: "/guide",
    color: "bg-[#393D3F]",
  },
  {
    icon: Search,
    label: "학원 찾기",
    sublabel: "Search Academies",
    href: "/academies",
    color: "bg-[#62929E]",
  },
  {
    icon: Users,
    label: "멘토 찾기",
    sublabel: "Search Mentors",
    href: "/consulting",
    color: "bg-[#393D3F]",
  },
  {
    icon: MessageCircle,
    label: "질문하기",
    sublabel: "Quick Question",
    href: "/community",
    color: "bg-[#62929E]",
  },
];

export default function HomePage() {
  // 상위 멘토 2명 미리보기 (Preview top 2 experts)
  const topExperts = mockExperts.slice(0, 2);
  // 최신 커뮤니티 게시글 2개 미리보기 (Preview latest 2 posts)
  const recentPosts = mockCommunityPosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 (Header) */}
      <header className="bg-[#393D3F] px-4 pt-12 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap size={22} color="white" strokeWidth={1.8} />
          <span className="text-white text-[18px] font-bold">에듀브릿지</span>
        </div>
        <p className="text-[#C6C5B9] text-[13px]">
          지방 교육 격차 해소 프로젝트
        </p>
      </header>

      {/* 홍보 배너 (Promotional Banner) */}
      <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-br from-[#393D3F] to-[#62929E] p-5 text-white">
        <p className="text-[13px] font-medium text-white/70 mb-1">
          지금 바로 시작하기
        </p>
        <h2 className="text-[20px] font-bold leading-snug mb-3">
          지방에서도 명문대
          <br />
          선배를 만나보세요! 🎓
        </h2>
        <p className="text-[13px] text-white/80 mb-4">
          전국 어디서든 명문대 선배와
          <br />
          1:1 맞춤 학습 상담이 가능합니다.
        </p>
        <Link
          href="/consulting"
          className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 text-[14px] font-semibold transition-colors"
        >
          상담 전문가 보기 <ChevronRight size={15} />
        </Link>
      </div>

      {/* 퀵 메뉴 2×2 그리드 (Quick Menu 2×2 Grid) */}
      <div className="px-4 mt-6">
        <h3 className="text-[18px] font-semibold text-[#393D3F] mb-3">
          서비스 메뉴
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {quickMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}>
                <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4 hover:border-[#62929E] transition-colors active:bg-gray-50">
                  <div
                    className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}
                  >
                    <Icon size={20} color="white" strokeWidth={1.8} />
                  </div>
                  <p className="text-[15px] font-semibold text-[#393D3F] leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[12px] text-gray-400 mt-0.5">
                    {item.sublabel}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 교육 매거진 미리보기 (Education Magazine Preview) */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[18px] font-semibold text-[#393D3F]">교육 매거진</h3>
          <Link
            href="/magazine"
            className="text-[13px] text-[#62929E] flex items-center gap-0.5"
          >
            전체보기 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {mockMagazineArticles.slice(0, 2).map((article) => (
            <Link key={article.id} href="/magazine">
              <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4 hover:border-[#62929E] transition-colors">
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
                <h4 className="text-[14px] font-semibold text-[#393D3F] leading-snug mb-1">
                  {article.title}
                </h4>
                <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 추천 전문가 미리보기 (Recommended Expert Preview) */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[18px] font-semibold text-[#393D3F]">
            추천 전문가
          </h3>
          <Link
            href="/consulting"
            className="text-[13px] text-[#62929E] flex items-center gap-0.5"
          >
            전체 보기 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {topExperts.map((expert) => (
            <Link key={expert.id} href={`/consulting/${expert.id}`}>
              <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4 flex items-center gap-3 hover:border-[#62929E] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#393D3F] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-[15px]">
                    {expert.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#393D3F]">
                      {expert.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#C6C5B9]/40 text-[#393D3F]">
                      {expert.role}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 truncate">
                    {expert.bio}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
                  <span className="text-[13px] font-semibold text-[#393D3F]">
                    {expert.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 최근 학습 질문 미리보기 (Recent Community Questions Preview) */}
      <div className="px-4 mt-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[18px] font-semibold text-[#393D3F]">
            최근 학습 질문
          </h3>
          <Link
            href="/community"
            className="text-[13px] text-[#62929E] flex items-center gap-0.5"
          >
            전체 보기 <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Link key={post.id} href="/community">
              <div className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4 hover:border-[#62929E] transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#62929E]/15 text-[#62929E]">
                    {post.subject}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {post.author}
                  </span>
                </div>
                <p className="text-[14px] text-[#393D3F] line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex gap-1.5 mt-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    ✦ AI 답변
                  </span>
                  {post.answers.some((a) => a.type === "선생님") && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      ✦ 선생님 답변
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

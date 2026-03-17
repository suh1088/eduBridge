// 학습 서비스 안내 페이지 (Learning Service Guide Page)
// 인터넷 강의(Online Lecture) 사이트 및 학습 지원 서비스 정보 안내

import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

// 인터넷 강의 플랫폼 Mock Data (Online Lecture Platform Data)
const onlinePlatforms = [
  {
    name: "EBS(한국교육방송공사)",
    url: "www.ebs.co.kr",
    description: "수능 연계 교재 및 강의 무료 제공. 수능 최저 연계율 50% 이상으로 필수 학습 플랫폼.",
    features: ["수능 연계 강의 무료", "인터넷 강의(인강) 전 과목 제공", "EBS 교재 PDF 제공"],
    badge: "무료",
    badgeColor: "bg-green-100 text-green-700",
    subjects: ["국어", "수학", "영어", "탐구", "한국사"],
  },
  {
    name: "메가스터디(Megastudy)",
    url: "www.megastudy.net",
    description: "국내 최대 규모 수능 인터넷 강의 플랫폼. 스타 강사진의 체계적인 커리큘럼 제공.",
    features: ["스타 강사 강의 제공", "단과/종합반 선택 가능", "모의고사 분석 서비스"],
    badge: "유료",
    badgeColor: "bg-blue-100 text-blue-700",
    subjects: ["국어", "수학", "영어", "과학탐구", "사회탐구"],
  },
  {
    name: "대성마이맥(Daesung Mymac)",
    url: "www.daesung.com",
    description: "대성학원 오프라인 강사진의 강의를 온라인으로 수강 가능. 체계적인 학습 관리 제공.",
    features: ["오프라인 강사 온라인 강의", "학습 플래너 제공", "질문 게시판 운영"],
    badge: "유료",
    badgeColor: "bg-blue-100 text-blue-700",
    subjects: ["수학", "국어", "영어", "탐구"],
  },
  {
    name: "이투스(Etoos)",
    url: "www.etoos.com",
    description: "수능·내신·논술을 아우르는 종합 학습 플랫폼. 지방 학생을 위한 지역 밀착 서비스 제공.",
    features: ["수능 + 내신 동시 대비", "지역별 학습 통계 제공", "AI(인공지능) 맞춤 추천"],
    badge: "유료",
    badgeColor: "bg-blue-100 text-blue-700",
    subjects: ["전 과목"],
  },
  {
    name: "스카이에듀(SkyEdu)",
    url: "www.skyedu.com",
    description: "SKY(서울·고려·연세대) 합격생 튜터링 서비스. 실제 합격 선배에게 직접 배우는 방식.",
    features: ["합격생 튜터링 연결", "입시 전략 상담 제공", "자기소개서 첨삭"],
    badge: "유료",
    badgeColor: "bg-blue-100 text-blue-700",
    subjects: ["전 과목", "입시 전략"],
  },
];

// 학습 지원 서비스 Mock Data (Learning Support Service Data)
const supportServices = [
  {
    name: "국가장학금(Korea Scholarship)",
    description: "소득 분위에 따라 연간 최대 700만 원 지원. 지방 학생 우대 장학 프로그램 포함.",
    category: "장학금",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "지역인재 장학금",
    description: "지방 소재 고교 졸업생이 지방 대학 진학 시 등록금 전액 지원.",
    category: "장학금",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "교육급여(Education Benefit)",
    description: "기초생활수급자 가정 학생에게 교육 활동 지원금 연간 최대 65만 4천 원 지원.",
    category: "복지",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "농어촌 학생 특별전형",
    description: "읍·면 지역 학생을 위한 대입 특별전형. 주요 대학 별도 모집 인원 운영.",
    category: "입시",
    color: "bg-[#62929E]/15 text-[#62929E]",
  },
  {
    name: "지역 교육청 멘토링",
    description: "각 시도교육청에서 운영하는 무료 대학생 멘토링 프로그램. 지역별로 신청 가능.",
    category: "멘토링",
    color: "bg-green-100 text-green-700",
  },
];

export default function GuidePage() {
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
          <h1 className="text-[20px] font-bold text-white">학습 서비스 안내</h1>
          <p className="text-[12px] text-[#C6C5B9]">인터넷 강의 · 학습 지원 서비스</p>
        </div>
      </header>

      <div className="px-4 py-5 space-y-6">

        {/* 인터넷 강의 플랫폼 섹션 */}
        <section>
          <h2 className="text-[18px] font-semibold text-[#393D3F] mb-3">
            🖥️ 인터넷 강의(Online Lecture) 플랫폼
          </h2>
          <div className="space-y-3">
            {onlinePlatforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4"
              >
                {/* 플랫폼 이름 + 뱃지 */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[16px] font-semibold text-[#393D3F]">
                    {platform.name}
                  </h3>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${platform.badgeColor}`}>
                    {platform.badge}
                  </span>
                </div>

                {/* 설명 */}
                <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
                  {platform.description}
                </p>

                {/* 과목 태그 */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {platform.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-[#C6C5B9]/40 text-[#393D3F]"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {/* 주요 기능 */}
                <ul className="space-y-1 mb-3">
                  {platform.features.map((feature) => (
                    <li key={feature} className="text-[13px] text-gray-500 flex items-start gap-1.5">
                      <span className="text-[#62929E] mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* URL 표시 */}
                <div className="flex items-center gap-1.5 text-[#62929E]">
                  <ExternalLink size={13} />
                  <span className="text-[13px]">{platform.url}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 구분선 */}
        <div className="h-px bg-[#C6C5B9]/40" />

        {/* 학습 지원 서비스 섹션 */}
        <section>
          <h2 className="text-[18px] font-semibold text-[#393D3F] mb-3">
            🎓 학습 지원 서비스
          </h2>
          <p className="text-[13px] text-gray-500 mb-3">
            지방 학생을 위한 장학금 및 지원 프로그램 안내
          </p>
          <div className="space-y-2">
            {supportServices.map((service) => (
              <div
                key={service.name}
                className="bg-white border border-[#C6C5B9]/50 rounded-2xl p-4 flex items-start gap-3"
              >
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${service.color}`}>
                  {service.category}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-[#393D3F] mb-0.5">
                    {service.name}
                  </p>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 에듀브릿지 상담 안내 */}
        <div className="bg-gradient-to-br from-[#393D3F] to-[#62929E] rounded-2xl p-5 text-white">
          <p className="text-[14px] font-semibold mb-1">더 자세한 상담이 필요하신가요?</p>
          <p className="text-[13px] text-white/80 mb-3">
            에듀브릿지 전문가가 나에게 맞는 학습 서비스를 직접 추천해드립니다.
          </p>
          <Link
            href="/consulting"
            className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-xl px-4 py-2 text-[14px] font-semibold transition-colors"
          >
            전문가 상담 받기 →
          </Link>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}

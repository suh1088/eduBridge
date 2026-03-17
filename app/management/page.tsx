"use client";
// T3 학업 관리 페이지 (Academic Management Page)
// 고정 과목 아코디언 + 슬라이드 성적 추이 그래프 + 비교과 활동 관리

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, Camera, ChevronDown, Trash2, Sparkles } from "lucide-react";
import GradeInputForm from "@/components/GradeInputForm";
import {
  mockGradeRecords,
  mockExtraActivities,
  type GradeRecord,
  type ExtraActivity,
} from "@/lib/mockData";

const SUBJECTS = ["국어", "수학", "영어", "한국사", "지구과학1", "물리학1"] as const;
type Subject = (typeof SUBJECTS)[number];

const activityColors: Record<ExtraActivity["type"], string> = {
  봉사: "bg-orange-100 text-orange-700",
  독서: "bg-purple-100 text-purple-700",
  기타: "bg-gray-100 text-gray-700",
};

// 과목별 등급대 맞춤 추천 (인강·자습서)
interface StudyItem { name: string; detail: string }
interface GradeRec { lectures: StudyItem[]; books: StudyItem[] }
const STUDY_TIPS: Record<Subject, { icon: string; mid: GradeRec; low: GradeRec }> = {
  국어: {
    icon: "📖",
    mid: { // 3-4등급
      lectures: [
        { name: "강민철의 국어 독해 실전", detail: "메가스터디" },
        { name: "이감 국어 — 김동욱 독서·문학", detail: "이감" },
      ],
      books: [
        { name: "수능특강 국어독서", detail: "EBS" },
        { name: "마더텅 국어 기출 N제", detail: "마더텅" },
      ],
    },
    low: { // 5-6등급
      lectures: [
        { name: "윤혜정의 개념의 나비효과", detail: "EBSi (무료)" },
        { name: "이해원 기초 국어", detail: "대성마이맥" },
      ],
      books: [
        { name: "국어의 기술 1 (기본편)", detail: "이해원 저, 좋은책신사고" },
        { name: "EBS 수능 기초 국어독서", detail: "EBS" },
      ],
    },
  },
  수학: {
    icon: "✏️",
    mid: {
      lectures: [
        { name: "정승제 수학의 원리", detail: "EBSi" },
        { name: "현우진 수학 — 뉴런", detail: "메가스터디" },
      ],
      books: [
        { name: "RPM 수학 (유형편)", detail: "교학사" },
        { name: "수학의 정석 (실력편)", detail: "성문출판사" },
      ],
    },
    low: {
      lectures: [
        { name: "개념원리 수학 강의", detail: "EBSi (무료)" },
        { name: "이지수학 기초 개념 강의", detail: "유튜브 무료" },
      ],
      books: [
        { name: "개념원리 수학", detail: "개념원리" },
        { name: "쎈수학 B단계", detail: "좋은책신사고" },
      ],
    },
  },
  영어: {
    icon: "🔤",
    mid: {
      lectures: [
        { name: "이명학 영어 독해", detail: "메가스터디" },
        { name: "조정식 영어 구문·독해", detail: "대성마이맥" },
      ],
      books: [
        { name: "수능특강 영어독해연습", detail: "EBS" },
        { name: "영어 구문 독해 기출 실전편", detail: "마더텅" },
      ],
    },
    low: {
      lectures: [
        { name: "수능 기초영어 — 시작은 EBS", detail: "EBSi (무료)" },
        { name: "박정 기초 영어 독해", detail: "이투스" },
      ],
      books: [
        { name: "능률 보카 어원편", detail: "NE능률" },
        { name: "EBS 기초 영어독해", detail: "EBS" },
      ],
    },
  },
  한국사: {
    icon: "🏛️",
    mid: {
      lectures: [
        { name: "최태성 수능 한국사 실전", detail: "EBSi" },
        { name: "전한길 한국사 심화", detail: "메가스터디" },
      ],
      books: [
        { name: "큰별쌤 최태성 한국사 (심화편)", detail: "메가스터디" },
        { name: "한국사 기출의 바이블", detail: "이투스북" },
      ],
    },
    low: {
      lectures: [
        { name: "최태성 기초 한국사", detail: "EBSi (무료)" },
        { name: "설민석 한국사 기본서 강의", detail: "대성마이맥" },
      ],
      books: [
        { name: "큰별쌤 최태성 한국사 (기본편)", detail: "메가스터디" },
        { name: "개념 한국사", detail: "미래엔" },
      ],
    },
  },
  지구과학1: {
    icon: "🌍",
    mid: {
      lectures: [
        { name: "오지훈 지구과학1 실전", detail: "대성마이맥" },
        { name: "이지효 지구과학1 개념+유형", detail: "메가스터디" },
      ],
      books: [
        { name: "수능특강 지구과학Ⅰ", detail: "EBS" },
        { name: "마더텅 지구과학1 기출 N제", detail: "마더텅" },
      ],
    },
    low: {
      lectures: [
        { name: "개념완성 지구과학1", detail: "EBSi (무료)" },
        { name: "허민 기초 지구과학 강의", detail: "이투스" },
      ],
      books: [
        { name: "개념완성 지구과학Ⅰ", detail: "EBS" },
        { name: "하이탑 지구과학Ⅰ", detail: "동아출판" },
      ],
    },
  },
  물리학1: {
    icon: "⚡",
    mid: {
      lectures: [
        { name: "강민웅 물리학1 실전 개념", detail: "메가스터디" },
        { name: "김성재 물리학1 유형 완성", detail: "대성마이맥" },
      ],
      books: [
        { name: "수능특강 물리학Ⅰ", detail: "EBS" },
        { name: "마더텅 물리학1 기출 N제", detail: "마더텅" },
      ],
    },
    low: {
      lectures: [
        { name: "개념완성 물리학1", detail: "EBSi (무료)" },
        { name: "이광조 기초 물리학 강의", detail: "이투스" },
      ],
      books: [
        { name: "개념완성 물리학Ⅰ", detail: "EBS" },
        { name: "하이탑 물리학Ⅰ", detail: "동아출판" },
      ],
    },
  },
};

export default function ManagementPage() {
  const [gradeRecords, setGradeRecords] = useState<GradeRecord[]>(mockGradeRecords);
  const [activities, setActivities] = useState<ExtraActivity[]>(mockExtraActivities);

  const [activeTab, setActiveTab] = useState<"내신" | "모의고사">("내신");
  // 현재 펼쳐진 과목 (null이면 모두 닫힘)
  const [expandedSubject, setExpandedSubject] = useState<Subject | null>(null);
  const [showGradeForm, setShowGradeForm] = useState(false);
  const [showAIRecommend, setShowAIRecommend] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityType, setActivityType] = useState<ExtraActivity["type"]>("봉사");
  const [activityContent, setActivityContent] = useState("");
  const [activityDate, setActivityDate] = useState("");

  const filteredGrades = gradeRecords.filter((r) => r.examType === activeTab);

  // 특정 과목의 해당 탭 성적 (날짜 오름차순)
  const getSubjectRecords = (subject: Subject) =>
    filteredGrades
      .filter((r) => r.subject === subject)
      .sort((a, b) => a.date.localeCompare(b.date));

  // 약점 과목 분석 (grade >= 4 또는 score < 70, 복합 약점 점수 내림차순)
  const weakSubjects = SUBJECTS
    .map((subject) => {
      const records = getSubjectRecords(subject);
      const latest = records.length > 0 ? records[records.length - 1] : null;
      return { subject, latest };
    })
    .filter(({ latest }) => latest !== null && (latest.grade >= 4 || latest.score < 70))
    .sort(
      (a, b) =>
        (b.latest!.grade * 10 + (100 - b.latest!.score)) -
        (a.latest!.grade * 10 + (100 - a.latest!.score))
    );

  const handleAddGrade = (record: Omit<GradeRecord, "id">) => {
    setGradeRecords([...gradeRecords, { ...record, id: gradeRecords.length + 1 }]);
    setShowGradeForm(false);
    setActiveTab(record.examType);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityContent.trim() || !activityDate) return;
    setActivities([
      { id: activities.length + 1, type: activityType, content: activityContent.trim(), date: activityDate },
      ...activities,
    ]);
    setActivityContent("");
    setActivityDate("");
    setShowActivityForm(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      {/* 헤더 (Header) */}
      <header className="sticky top-0 z-40 bg-[#393D3F] px-4 pt-12 pb-4">
        <h1 className="text-[22px] font-bold text-white">학업 관리</h1>
        <p className="text-[13px] text-[#C6C5B9] mt-0.5">성적 기록 · 비교과 활동 관리</p>
      </header>

      <div className="px-4 py-4 space-y-5">
        {/* ── 성적 섹션 ───────────────────────────────────────── */}
        <section>
          {/* 내신 / 모의고사 탭 */}
          <div className="flex gap-2 mb-4">
            {(["내신", "모의고사"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setExpandedSubject(null); }}
                className={`flex-1 py-2.5 rounded-xl text-[15px] font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-[#393D3F] text-white"
                    : "bg-[#C6C5B9]/30 text-[#393D3F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* AI 추천 학습 방법 */}
          <div className="mb-4">
            {/* 트리거 버튼 */}
            <button
              onClick={() => setShowAIRecommend((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-4 rounded-2xl bg-gradient-to-r from-[#62929E] to-[#393D3F] shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-yellow-300" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-white">AI 추천 학습 방법</p>
                  <p className="text-[12px] text-white/70 mt-0.5">
                    {activeTab} 약점 과목 분석 · 맞춤 학습 전략
                  </p>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 text-white/80 ${
                  showAIRecommend ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* 슬라이드 패널 */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                showAIRecommend ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pt-3 space-y-3">
                  {weakSubjects.length === 0 ? (
                    <div className="bg-[#62929E]/10 border border-[#62929E]/20 rounded-2xl px-4 py-5 text-center">
                      <p className="text-[16px] font-semibold text-[#62929E] mb-1">
                        모든 과목 양호해요! 🎉
                      </p>
                      <p className="text-[13px] text-gray-400">
                        현재 {activeTab} 기준 약점 과목이 없습니다. 꾸준히 유지하세요.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* 약점 요약 배너 */}
                      <div className="bg-[#393D3F] rounded-2xl px-4 py-3 flex items-center gap-3">
                        <Sparkles size={15} className="text-yellow-300 shrink-0" />
                        <p className="text-[13px] text-white leading-snug">
                          <span className="font-semibold text-[#C6C5B9]">
                            {weakSubjects.map((w) => w.subject).join(", ")}
                          </span>{" "}
                          과목에서 집중 보완이 필요합니다.
                        </p>
                      </div>

                      {/* 과목별 추천 카드 */}
                      {weakSubjects.map(({ subject, latest }) => (
                        <div
                          key={subject}
                          className="bg-white border border-[#C6C5B9]/50 rounded-2xl overflow-hidden"
                        >
                          {/* 카드 헤더 */}
                          <div className="px-4 py-3 bg-[#62929E]/5 border-b border-[#C6C5B9]/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[16px]">{STUDY_TIPS[subject].icon}</span>
                              <span className="text-[15px] font-semibold text-[#393D3F]">
                                {subject}
                              </span>
                            </div>
                            <div className="flex gap-1.5">
                              {latest!.grade >= 4 && (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                                  {latest!.grade}등급
                                </span>
                              )}
                              {latest!.score < 70 && (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-500">
                                  {latest!.score}점
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 등급대별 추천 콘텐츠 */}
                          {(() => {
                            const rec =
                              latest!.grade <= 4
                                ? STUDY_TIPS[subject].mid
                                : STUDY_TIPS[subject].low;
                            const tierLabel =
                              latest!.grade <= 4 ? "3–4등급 맞춤" : "5–6등급 맞춤";
                            return (
                              <div className="px-4 py-3 space-y-3">
                                <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#62929E]/15 text-[#62929E]">
                                  {tierLabel} 추천
                                </span>
                                <div>
                                  <p className="text-[12px] font-semibold text-gray-400 mb-1.5">
                                    📺 추천 인강
                                  </p>
                                  <ul className="space-y-1.5">
                                    {rec.lectures.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#62929E] mt-1.5" />
                                        <span className="text-[13px] text-[#393D3F]">
                                          <span className="font-medium">{item.name}</span>
                                          <span className="text-gray-400"> · {item.detail}</span>
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="text-[12px] font-semibold text-gray-400 mb-1.5">
                                    📚 추천 자습서
                                  </p>
                                  <ul className="space-y-1.5">
                                    {rec.books.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#393D3F] mt-1.5" />
                                        <span className="text-[13px] text-[#393D3F]">
                                          <span className="font-medium">{item.name}</span>
                                          <span className="text-gray-400"> · {item.detail}</span>
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 과목 아코디언 목록 */}
          <div className="space-y-2 mb-3">
            {SUBJECTS.map((subject) => {
              const isExpanded = expandedSubject === subject;
              const records = getSubjectRecords(subject);
              const latest = records.length > 0 ? records[records.length - 1] : null;

              return (
                <div
                  key={subject}
                  className="bg-white border border-[#C6C5B9]/50 rounded-2xl overflow-hidden"
                >
                  {/* 과목 행 헤더 */}
                  <button
                    onClick={() => setExpandedSubject(isExpanded ? null : subject)}
                    className={`w-full px-4 py-3.5 flex items-center justify-between transition-colors ${
                      isExpanded ? "bg-[#62929E]/5" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[15px] font-semibold ${
                          isExpanded ? "text-[#62929E]" : "text-[#393D3F]"
                        }`}
                      >
                        {subject}
                      </span>
                      {latest ? (
                        <span className="text-[13px] text-gray-400">
                          {latest.score}점 · {latest.grade}등급
                        </span>
                      ) : (
                        <span className="text-[12px] text-gray-300">기록 없음</span>
                      )}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-[#62929E]" : "text-[#C6C5B9]"
                      }`}
                    />
                  </button>

                  {/* 슬라이드 차트 영역 (CSS grid trick) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pt-3 pb-4 border-t border-[#C6C5B9]/30">
                        {records.length === 0 ? (
                          <p className="text-center py-6 text-gray-400 text-[13px]">
                            아직 {activeTab} 성적 기록이 없습니다.
                          </p>
                        ) : (
                          <>
                            <p className="text-[12px] text-[#62929E] font-medium mb-3">
                              📈 성적 추이 ({activeTab})
                            </p>
                            <ResponsiveContainer width="100%" height={170}>
                              <LineChart
                                data={records.map((r) => ({
                                  date: r.date,
                                  score: r.score,
                                  grade: r.grade,
                                }))}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#C6C5B9"
                                  opacity={0.4}
                                />
                                <XAxis
                                  dataKey="date"
                                  tick={{ fontSize: 11, fill: "#888" }}
                                  tickLine={false}
                                />
                                <YAxis
                                  domain={[0, 100]}
                                  tick={{ fontSize: 11, fill: "#888" }}
                                  tickLine={false}
                                  tickCount={5}
                                  tickFormatter={(v) => `${v}`}
                                />
                                <Tooltip
                                  formatter={(value, name) =>
                                    name === "score" ? [`${value}점`, "점수"] : [value, "등급"]
                                  }
                                  contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #C6C5B9",
                                    fontSize: "13px",
                                  }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="score"
                                  stroke="#62929E"
                                  strokeWidth={2.5}
                                  dot={{ fill: "#393D3F", r: 4 }}
                                  activeDot={{ r: 6, fill: "#62929E" }}
                                />
                              </LineChart>
                            </ResponsiveContainer>

                            {/* 회차별 점수 목록 */}
                            <div className="mt-3 space-y-1.5 pt-3 border-t border-[#C6C5B9]/20">
                              {[...records].reverse().map((r) => (
                                <div
                                  key={r.id}
                                  className="flex items-center justify-between text-[13px]"
                                >
                                  <span className="text-gray-400">{r.date}</span>
                                  <span className="text-[#393D3F] font-medium">
                                    {r.score}점 · {r.grade}등급
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 성적 추가 버튼 / 폼 */}
          {showGradeForm ? (
            <GradeInputForm
              onAdd={handleAddGrade}
              onCancel={() => setShowGradeForm(false)}
            />
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => setShowGradeForm(true)}
                className="w-full py-3 border-2 border-dashed border-[#C6C5B9] rounded-xl text-[14px] text-[#62929E] font-medium flex items-center justify-center gap-2 hover:border-[#62929E] transition-colors"
              >
                <Plus size={16} /> 성적 직접 입력
              </button>
              <button
                disabled
                className="w-full py-3 border border-[#C6C5B9]/50 rounded-xl text-[14px] text-[#C6C5B9] font-medium flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Camera size={16} /> 성적표 사진 업로드 (준비 중)
              </button>
            </div>
          )}
        </section>

        {/* 구분선 */}
        <div className="h-px bg-[#C6C5B9]/40" />

        {/* ── 비교과 활동 섹션 ─────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[18px] font-semibold text-[#393D3F]">비교과 활동</h2>
          </div>

          <div className="space-y-2 mb-3">
            {activities.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-[14px]">
                아직 활동이 없습니다.
              </div>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white border border-[#C6C5B9]/50 rounded-xl px-4 py-3 flex items-start justify-between"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full mt-0.5 shrink-0 ${activityColors[activity.type]}`}
                    >
                      {activity.type}
                    </span>
                    <div>
                      <p className="text-[14px] text-[#393D3F]">{activity.content}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{activity.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivities(activities.filter((a) => a.id !== activity.id))}
                    className="text-[#C6C5B9] hover:text-red-400 transition-colors ml-2 mt-0.5 shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {showActivityForm ? (
            <form
              onSubmit={handleAddActivity}
              className="bg-[#FDFDFF] border border-[#C6C5B9] rounded-2xl p-4 space-y-3"
            >
              <h3 className="text-[16px] font-semibold text-[#393D3F]">활동 추가</h3>
              <div className="flex gap-2">
                {(["봉사", "독서", "기타"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActivityType(type)}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                      activityType === type
                        ? "bg-[#393D3F] text-white"
                        : "bg-[#C6C5B9]/30 text-[#393D3F]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="활동 내용을 입력하세요"
                value={activityContent}
                onChange={(e) => setActivityContent(e.target.value)}
                className="w-full border border-[#C6C5B9] rounded-xl px-3 py-2.5 text-[15px] text-[#393D3F] focus:outline-none focus:border-[#62929E]"
                required
              />
              <input
                type="date"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                className="w-full border border-[#C6C5B9] rounded-xl px-3 py-2.5 text-[15px] text-[#393D3F] focus:outline-none focus:border-[#62929E]"
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowActivityForm(false)}
                  className="flex-1 py-2.5 rounded-xl text-[14px] font-medium bg-[#C6C5B9]/30 text-[#393D3F]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-[14px] font-medium bg-[#393D3F] text-white hover:bg-[#62929E] transition-colors"
                >
                  추가
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowActivityForm(true)}
              className="w-full py-3 border-2 border-dashed border-[#C6C5B9] rounded-xl text-[14px] text-[#62929E] font-medium flex items-center justify-center gap-2 hover:border-[#62929E] transition-colors"
            >
              <Plus size={16} /> 활동 추가
            </button>
          )}
        </section>

        <div className="h-4" />
      </div>
    </div>
  );
}

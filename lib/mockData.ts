// lib/mockData.ts
// 에듀브릿지 Mock Data(모의 데이터) 중앙 관리 파일

// ─── 타입 정의 (Type Definitions) ───────────────────────────────────────────

export interface Review {
  id: number;
  author: string;
  rating: number; // 1~5
  content: string;
  date: string;
}

export interface Expert {
  id: number;
  name: string;
  role: "선생님" | "멘토";
  university: string; // 멘토인 경우 소속 대학 (University for mentors)
  major: string; // 전공 (Major field of study)
  subjects: string[]; // 담당 과목 목록 (List of subjects)
  rating: number; // 평점 1.0~5.0 (Rating)
  reviewCount: number; // 리뷰 수 (Number of reviews)
  bio: string; // 한줄 소개 (Short biography)
  pricePerHour: number; // 시간당 상담 가격(원) (Price per hour in KRW)
  reviews: Review[];
}

export interface Reply {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface PostAnswer {
  type: "AI" | "선생님"; // AI(인공지능) 답변 또는 선생님 답변
  content: string;
  likeCount: number;
  replies: Reply[];
}

export interface CommunityPost {
  id: number;
  author: string;
  content: string; // 질문 내용 (Question content)
  subject: string; // 과목 태그 (Subject tag)
  answers: PostAnswer[]; // 답변 목록 (List of answers, always includes at least one AI answer)
  createdAt: string;
  likeCount: number;
}

export interface GradeRecord {
  id: number;
  subject: string; // 과목 (Subject)
  score: number; // 점수 0~100 (Score)
  grade: number; // 등급 1~9 (Grade rank, 1 is best)
  examType: "내신" | "모의고사"; // 시험 유형 (Exam type)
  date: string; // YYYY-MM 형식 (YYYY-MM format)
}

export interface ExtraActivity {
  id: number;
  type: "봉사" | "독서" | "기타"; // 활동 유형 (Activity type)
  content: string; // 활동 내용 (Activity description)
  date: string; // YYYY-MM-DD 형식 (YYYY-MM-DD format)
}

export interface MagazineArticle {
  id: number;
  category: "입시 트렌드" | "용어 설명" | "학습 가이드" | "교육과정";
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
  readMin: number; // 예상 읽기 시간(분)
}

// ─── 전문가 목록 Mock Data (Expert List) ────────────────────────────────────

export const mockExperts: Expert[] = [
  {
    id: 1,
    name: "김수진",
    role: "선생님",
    university: "",
    major: "수학교육",
    subjects: ["수학", "통계"],
    rating: 4.9,
    reviewCount: 48,
    bio: "수능 수학 15년 경력, 현 목동 유명 학원 강사. 개념부터 킬러 문항까지 완벽 대비.",
    pricePerHour: 20000,
    reviews: [
      { id: 1, author: "고3 학부모", rating: 5, content: "우리 아이 수학 2등급에서 1등급으로 올랐어요. 정말 감사합니다!", date: "2025-02-10" },
      { id: 2, author: "재수생", rating: 5, content: "킬러 문항 접근법을 명쾌하게 설명해 주셔서 정말 도움이 됐습니다.", date: "2025-01-22" },
      { id: 3, author: "고2 학생", rating: 5, content: "개념 설명이 너무 좋아요. 어려운 내용도 쉽게 이해할 수 있어요.", date: "2025-03-01" },
    ],
  },
  {
    id: 2,
    name: "이민호",
    role: "선생님",
    university: "",
    major: "국어교육",
    subjects: ["국어", "문학"],
    rating: 4.7,
    reviewCount: 32,
    bio: "고교 국어 교사 10년 경력. 비문학 독해부터 문학 작품 분석까지 체계적 지도.",
    pricePerHour: 20000,
    reviews: [
      { id: 1, author: "고2 학생", rating: 5, content: "비문학 독해가 너무 어려웠는데 공략법을 알려주셔서 성적이 올랐습니다.", date: "2025-03-01" },
      { id: 2, author: "고3 학생", rating: 4, content: "꼼꼼하고 친절하게 설명해 주셔서 좋아요. 문학 파트가 특히 도움됐습니다.", date: "2025-02-15" },
    ],
  },
  {
    id: 3,
    name: "박지수",
    role: "멘토",
    university: "서울대학교",
    major: "수리과학부",
    subjects: ["수학", "물리"],
    rating: 4.8,
    reviewCount: 27,
    bio: "서울대 수리과학부 3학년. 수능 수학·물리 모두 만점. 지방 출신으로 직접 겪은 노하우 공유.",
    pricePerHour: 10000,
    reviews: [
      { id: 1, author: "고2 학생", rating: 5, content: "지방 출신 서울대 선배라 더 공감이 가요. 현실적인 조언을 많이 해줬어요.", date: "2025-02-20" },
      { id: 2, author: "고3 학생", rating: 5, content: "물리 개념을 이렇게 쉽게 설명해 줄 수 있다니 놀랍습니다. 강추!", date: "2025-01-30" },
    ],
  },
  {
    id: 4,
    name: "최현우",
    role: "멘토",
    university: "연세대학교",
    major: "영어영문학과",
    subjects: ["영어", "사회"],
    rating: 4.6,
    reviewCount: 19,
    bio: "연세대 영어영문학과 2학년. 수능 영어 1등급. 독해 속도 향상 비법 전수.",
    pricePerHour: 10000,
    reviews: [
      { id: 1, author: "고3 학생", rating: 4, content: "영어 독해 스킬을 체계적으로 알려줘서 시험에서 시간이 부족하지 않았어요.", date: "2025-03-05" },
      { id: 2, author: "고2 학부모", rating: 5, content: "아이가 영어를 재미있어 하기 시작했어요. 선배와 소통이 잘 됩니다.", date: "2025-02-10" },
    ],
  },
  {
    id: 5,
    name: "정예림",
    role: "선생님",
    university: "",
    major: "화학교육",
    subjects: ["화학", "생명과학"],
    rating: 4.8,
    reviewCount: 35,
    bio: "과학고 출신, 이화여대 화학교육 졸업. 탐구 과목 올킬 전략 보유.",
    pricePerHour: 20000,
    reviews: [
      { id: 1, author: "이과 고3 학생", rating: 5, content: "화학 반응식을 이렇게 체계적으로 외우는 방법이 있는지 몰랐어요!", date: "2025-02-28" },
      { id: 2, author: "고3 학부모", rating: 5, content: "생명과학 단원 정리를 도식화로 알려줘서 아이가 훨씬 이해를 잘 해요.", date: "2025-01-15" },
    ],
  },
  {
    id: 6,
    name: "한준혁",
    role: "멘토",
    university: "고려대학교",
    major: "한국어문학과",
    subjects: ["국어", "한국사"],
    rating: 4.7,
    reviewCount: 22,
    bio: "고려대 한국어문학과 4학년. 지방 고교 졸업 후 상경, 서울 상위권 대학 합격 전략 공유.",
    pricePerHour: 10000,
    reviews: [
      { id: 1, author: "고3 학생", rating: 5, content: "한국사 암기 방법을 스토리텔링으로 가르쳐줘서 오래 기억됩니다.", date: "2025-03-10" },
      { id: 2, author: "고2 학생", rating: 4, content: "국어 고전 문학 파트가 많이 도움됐어요. 지방 학생 고충도 잘 알아요.", date: "2025-02-05" },
    ],
  },
];

// ─── 커뮤니티 게시글 Mock Data (Community Post List) ────────────────────────

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 1,
    author: "익명의 고3",
    content: "수능 수학 킬러 문항이 너무 어려워요. 3점 문제는 잘 풀리는데 4점 킬러 문항만 나오면 시간이 부족합니다. 어떻게 연습해야 할까요?",
    subject: "수학",
    answers: [
      {
        type: "AI",
        content: "킬러 문항 대비에는 '역추적 풀이법'을 추천합니다. 답의 조건에서 거꾸로 조건을 추적하면 막힌 부분이 보입니다. 킬러 유형별(함수·확률·수열) 패턴을 분류해서 반복 연습하는 것이 효과적입니다.",
        likeCount: 8,
        replies: [
          { id: 1, author: "익명의 고3", content: "역추적 풀이법 구체적으로 어떻게 하는 건가요?", createdAt: "2025-03-14" },
        ],
      },
      {
        type: "선생님",
        content: "킬러 문항은 '정확한 개념 이해'가 전제되어야 합니다. N제 중 4점 문항만 골라서 하루 3문제씩 꾸준히 풀어보세요. 틀린 문제는 해설을 보지 말고 30분 더 고민하는 습관이 중요합니다.",
        likeCount: 15,
        replies: [],
      },
    ],
    createdAt: "2025-03-14",
    likeCount: 24,
  },
  {
    id: 2,
    author: "익명의 고2",
    content: "영어 독해 지문을 읽을 때 모르는 단어가 너무 많아서 해석이 안 됩니다. 단어를 다 외워야 할까요, 아니면 문맥으로 파악하는 게 나을까요?",
    subject: "영어",
    answers: [
      {
        type: "AI",
        content: "두 가지 방법을 병행하는 것이 좋습니다. 수능 빈출 어휘 약 2,000개는 반드시 암기하되, 그 이상은 문맥 파악 훈련이 더 효율적입니다. 모르는 단어가 있어도 전체 문단의 흐름을 먼저 파악하는 연습을 해보세요.",
        likeCount: 5,
        replies: [],
      },
    ],
    createdAt: "2025-03-13",
    likeCount: 18,
  },
  {
    id: 3,
    author: "익명의 고3",
    content: "국어 비문학(사회·과학) 지문이 너무 길고 어렵습니다. 문단별로 요약하면서 읽으면 시간이 부족하고, 그냥 읽으면 내용이 기억이 안 납니다. 좋은 독해법이 있을까요?",
    subject: "국어",
    answers: [
      {
        type: "AI",
        content: "비문학 독해에는 '핵심어 중심 독해법'이 효과적입니다. 각 문단에서 반복되는 핵심어를 찾고 그 관계(대조·인과·예시)를 파악하면 됩니다. 전체를 요약하려 하지 말고 핵심어와 논리 구조만 파악하면 속도가 빨라집니다.",
        likeCount: 11,
        replies: [],
      },
      {
        type: "선생님",
        content: "비문학은 '첫 문단'과 '마지막 문단'에 핵심이 담겨있는 경우가 많습니다. 먼저 첫·끝 문단을 읽고 주제를 파악한 뒤 본문을 읽으면 내용이 훨씬 잘 정리됩니다. 신문 사설을 3분 안에 요약하는 연습도 추천합니다.",
        likeCount: 20,
        replies: [
          { id: 1, author: "익명의 고3", content: "신문 사설 추천 좀 해주실 수 있나요?", createdAt: "2025-03-12" },
          { id: 2, author: "익명의 고2", content: "저도 이 방법 써봤는데 진짜 도움됐어요!", createdAt: "2025-03-13" },
        ],
      },
    ],
    createdAt: "2025-03-12",
    likeCount: 31,
  },
  {
    id: 4,
    author: "익명의 고2",
    content: "물리 전기·자기 단원이 너무 어렵습니다. 공식은 외웠는데 문제에 어떻게 적용해야 할지 모르겠어요. 회로 문제가 특히 막막합니다.",
    subject: "물리",
    answers: [
      {
        type: "AI",
        content: "전기·자기 문제는 '회로 분석 → 법칙 적용 → 계산' 3단계로 접근하세요. 먼저 회로를 직렬/병렬로 분류하고, 옴의 법칙과 키르히호프 법칙 중 어느 것을 쓸지 결정한 뒤 계산하면 됩니다.",
        likeCount: 6,
        replies: [],
      },
      {
        type: "선생님",
        content: "공식 암기보다 '왜 그 공식이 성립하는지'를 이해하는 것이 중요합니다. 전기·자기 단원은 쿨롱의 법칙 → 전기장 → 전위 → 전류 순으로 개념이 연결되어 있습니다. 개념서를 다시 한 번 꼼꼼하게 읽어보시길 권합니다.",
        likeCount: 9,
        replies: [],
      },
    ],
    createdAt: "2025-03-11",
    likeCount: 15,
  },
  {
    id: 5,
    author: "학부모",
    content: "지방에 살다 보니 내신 관리는 어느 정도 되는데, 수능 대비 학원이 부족합니다. 학원 없이 혼자 수능을 준비하는 효과적인 방법이 있을까요?",
    subject: "수능 전략",
    answers: [
      {
        type: "AI",
        content: "학원 없이 수능을 준비할 때 가장 중요한 것은 '자기주도 학습 루틴'입니다. ① EBS(한국교육방송공사) 연계 교재 완벽 마스터 ② 기출 문제 연도별 분석 ③ 약점 과목 인터넷 강의 활용 순으로 진행하세요. 주 1회 모의고사 실전 연습도 빠뜨리지 마세요.",
        likeCount: 18,
        replies: [],
      },
    ],
    createdAt: "2025-03-10",
    likeCount: 42,
  },
];

// ─── 성적 Mock Data (Grade Records) ─────────────────────────────────────────

export const mockGradeRecords: GradeRecord[] = [
  // 내신 (School Internal Assessment)
  { id: 1,  subject: "국어",      score: 72, grade: 4, examType: "내신", date: "2024-09" },
  { id: 2,  subject: "수학",      score: 65, grade: 5, examType: "내신", date: "2024-09" },
  { id: 3,  subject: "영어",      score: 78, grade: 3, examType: "내신", date: "2024-09" },
  { id: 4,  subject: "국어",      score: 68, grade: 5, examType: "내신", date: "2024-12" },
  { id: 5,  subject: "수학",      score: 70, grade: 4, examType: "내신", date: "2024-12" },
  { id: 6,  subject: "영어",      score: 75, grade: 4, examType: "내신", date: "2024-12" },
  { id: 7,  subject: "국어",      score: 74, grade: 4, examType: "내신", date: "2025-03" },
  { id: 8,  subject: "수학",      score: 77, grade: 3, examType: "내신", date: "2025-03" },
  { id: 9,  subject: "영어",      score: 80, grade: 3, examType: "내신", date: "2025-03" },
  { id: 17, subject: "한국사",    score: 58, grade: 6, examType: "내신", date: "2024-09" },
  { id: 18, subject: "한국사",    score: 63, grade: 5, examType: "내신", date: "2024-12" },
  { id: 19, subject: "한국사",    score: 69, grade: 5, examType: "내신", date: "2025-03" },
  { id: 20, subject: "지구과학1", score: 55, grade: 6, examType: "내신", date: "2024-09" },
  { id: 21, subject: "지구과학1", score: 61, grade: 6, examType: "내신", date: "2024-12" },
  { id: 22, subject: "지구과학1", score: 67, grade: 5, examType: "내신", date: "2025-03" },
  { id: 23, subject: "물리학1",   score: 52, grade: 6, examType: "내신", date: "2024-09" },
  { id: 24, subject: "물리학1",   score: 60, grade: 6, examType: "내신", date: "2024-12" },
  { id: 25, subject: "물리학1",   score: 66, grade: 5, examType: "내신", date: "2025-03" },
  // 모의고사 (Mock College Scholastic Ability Test)
  { id: 10, subject: "국어",      score: 69, grade: 5, examType: "모의고사", date: "2024-09" },
  { id: 11, subject: "수학",      score: 62, grade: 6, examType: "모의고사", date: "2024-09" },
  { id: 12, subject: "영어",      score: 74, grade: 4, examType: "모의고사", date: "2024-09" },
  { id: 13, subject: "국어",      score: 72, grade: 4, examType: "모의고사", date: "2024-11" },
  { id: 14, subject: "수학",      score: 67, grade: 5, examType: "모의고사", date: "2024-11" },
  { id: 15, subject: "국어",      score: 75, grade: 4, examType: "모의고사", date: "2025-03" },
  { id: 16, subject: "수학",      score: 71, grade: 4, examType: "모의고사", date: "2025-03" },
  { id: 26, subject: "한국사",    score: 55, grade: 6, examType: "모의고사", date: "2024-09" },
  { id: 27, subject: "한국사",    score: 61, grade: 6, examType: "모의고사", date: "2024-11" },
  { id: 28, subject: "한국사",    score: 65, grade: 5, examType: "모의고사", date: "2025-03" },
  { id: 29, subject: "지구과학1", score: 50, grade: 6, examType: "모의고사", date: "2024-09" },
  { id: 30, subject: "지구과학1", score: 58, grade: 6, examType: "모의고사", date: "2025-03" },
  { id: 31, subject: "물리학1",   score: 48, grade: 6, examType: "모의고사", date: "2024-09" },
  { id: 32, subject: "물리학1",   score: 56, grade: 6, examType: "모의고사", date: "2025-03" },
];

// ─── 교육 매거진 Mock Data (Education Magazine) ──────────────────────────────

export const mockMagazineArticles: MagazineArticle[] = [
  {
    id: 1,
    category: "입시 트렌드",
    title: "2026 수능, 달라지는 것들 총정리",
    summary: "선택과목 구조 변화부터 EBS 연계율 조정까지, 수험생이 꼭 알아야 할 2026 수능 핵심 변경 사항을 한눈에 정리했습니다.",
    date: "2026-03-10",
    readMin: 5,
  },
  {
    id: 2,
    category: "학습 가이드",
    title: "고2 겨울방학, 수학 선행 vs 취약 과목 보완?",
    summary: "고2 겨울방학 전략을 잘못 세우면 1년을 통째로 날릴 수 있습니다. 성적대별 최적 공부 방향을 전문가가 분석합니다.",
    date: "2026-02-25",
    readMin: 4,
  },
  {
    id: 3,
    category: "용어 설명",
    title: "내신 등급제 vs 성취평가제, 뭐가 다른가요?",
    summary: "학부모와 학생이 가장 많이 헷갈려 하는 두 평가 방식의 차이와 대입 반영 방식을 쉽게 풀어드립니다.",
    date: "2026-02-18",
    readMin: 3,
  },
  {
    id: 4,
    category: "교육과정",
    title: "2028 대입 개편안, 지금 중학생은 어떻게 준비해야 하나",
    summary: "2028년부터 적용될 대입 제도의 주요 변화와 현재 중학교 1~3학년 학생들이 미리 준비해야 할 포인트를 정리합니다.",
    date: "2026-02-10",
    readMin: 6,
  },
  {
    id: 5,
    category: "학습 가이드",
    title: "국어 비문학, 3등급 → 1등급 로드맵",
    summary: "비문학 독해의 핵심은 '속도'가 아니라 '구조 파악'입니다. 현직 국어 선생님이 알려주는 단계별 독해 훈련법을 소개합니다.",
    date: "2026-01-30",
    readMin: 5,
  },
  {
    id: 6,
    category: "입시 트렌드",
    title: "지방 학생의 서울대 합격 전략 — 지역균형 선발 완전 분석",
    summary: "지역균형 선발 전형의 지원 자격, 최저 등급 기준, 면접 준비 전략까지. 지방 학생에게 유리한 전형을 적극 활용하세요.",
    date: "2026-01-15",
    readMin: 7,
  },
  {
    id: 7,
    category: "용어 설명",
    title: "수시 6장, 어떻게 배분해야 할까? — 전형별 용어 완전 정복",
    summary: "학생부교과, 학생부종합, 논술, 실기 전형의 차이와 지원 전략을 처음 접하는 학부모도 이해할 수 있게 설명합니다.",
    date: "2026-01-05",
    readMin: 6,
  },
  {
    id: 8,
    category: "교육과정",
    title: "고교학점제 전면 시행, 우리 아이 수업 선택 어떻게 도와줄까",
    summary: "2025년 전면 시행된 고교학점제에서 진로에 맞는 과목을 선택하는 방법과 학점 이수 기준을 학부모 관점에서 설명합니다.",
    date: "2025-12-20",
    readMin: 5,
  },
];

// ─── 비교과 활동 Mock Data (Extracurricular Activities) ──────────────────────

export const mockExtraActivities: ExtraActivity[] = [
  { id: 1, type: "봉사", content: "지역 어린이 도서관 독서 지도 봉사 (2시간)", date: "2025-02-15" },
  { id: 2, type: "독서", content: "「페르마의 마지막 정리」 – 수학적 사고력 향상", date: "2025-01-30" },
  { id: 3, type: "기타", content: "교내 수학 경시대회 은상 수상", date: "2025-03-05" },
  { id: 4, type: "봉사", content: "지역 복지관 어르신 컴퓨터 교육 봉사 (3시간)", date: "2025-03-10" },
];

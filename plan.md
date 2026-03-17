# Project: 지방 교육 격차 해소 프로젝트 '에듀브릿지(EduBridge)' 프로토타입

## 1. 개요 및 목적
- 목적: 지방 학생/학부모를 위한 교육 정보 및 전문가 연결 서비스
- 타겟: 모바일 브라우저 사용자 (Mobile-First Responsive Web)
- 특징: 프로토타입 단계이므로 사용자 구분(학생/학부모) 없이 통합 로그인/UI(User Interface, 사용자 인터페이스)를 제공함

## 2. 기술 스택 (Tech Stack)
- Framework: Next.js (App Router 기반)
- Styling: Tailwind CSS (Tailwind Cascading Style Sheets)
- Icons: Lucide React
- UI Components: Shadcn UI (깔끔하고 신뢰감 있는 디자인)

## 3. 구조 및 내비게이션 (Navigation)
하단 탭 바(Bottom Navigation Bar)에 5개 메뉴 고정:

### T1. 홈 (Home)
- 상단: "바로 시작하기"와 같은 홍보 배너
- 중앙 4개 퀵 메뉴 (그리드 배치):
  1) 학습 서비스 안내 (Guide)
  2) 학원 찾기 (Search Academies)
  3) 멘토 찾기 (Search Mentors)
  4) 질문하기 (Quick Question)

### T2. 실시간 학습상담 (Community)
- 피드(Feed) 스타일의 게시판
- 질문 글에 'AI 답변', '선생님 답변' 뱃지가 달린 더미 데이터(Dummy Data) 포함
- 각 질문마다 적어도 하나의 'AI 답변' 더미데이터 포함

### T3. 학업 관리 (Management)
- 내신/모의고사 성적 입력 섹션
  - [직접 입력]: 과목, 점수, 등급 입력 폼
  - [성적표 사진 업로드]: "성적표 사진 업로드(준비 중)" 버튼 UI만 구현
  - 항목을 누르면 나의 성적 변화 추이를 그래프로 볼 수 있게 구현
  - 내신과 모의고사 성적을 분리해서 볼 수 있어야 함
- 비교과 활동(봉사, 독서 등)을 기록할 수 있는 간단한 리스트 폼

### T4. 상담 (Consulting)
- 전문가(선생님, 대학생 멘토) 리스트업 및 상세 페이지 이동
- 상단 탭에 선생님과 대학생 멘토 둘 중 하나를 선택할 수 있게 구현
- 전문가 항목을 누르면 그 전문가의 약력과 간단한 소개글을 볼 수 있어야 함.
- '상담 예약하기' 버튼이 포함된 카드 레이아웃

### T5. 메뉴 (More)
- 프로필 정보, 공지사항, 고객센터 등 기타 링크 모음

## 4. 상세 구현 지시 사항
1. [Layout]: Mobile-First(모바일 우선) 디자인을 적용하고, 화면 하단에 항상 고정되는 내비게이션 바를 구현해줘. PC(데스크탑) 브라우저에서는 전체 콘텐츠를 `max-w-[430px]` 컨테이너로 화면 중앙에 고정하여 모바일 앱처럼 보이도록 해줘.
2. [Data]: 모든 데이터는 실제 데이터가 없으므로, 현실적인 이름과 내용으로 구성된 Mock Data(모의 데이터)를 사용해줘.
3. [Design]: 가독성을 위해 폰트는 크게 설정하고, 메인 컬러는 Charcoal(차콜, #393D3F)과 Off-White(오프화이트, #FDFDFF)를 기본으로, Warm Gray(웜 그레이, #C6C5B9)와 Steel Blue(스틸 블루, #62929E)를 보조 색상으로 사용해줘.
4. [Abbreviation]: 코드 내 주석이나 설명에서 모든 약어는 풀네임을 병기해줘. (예: UI -> User Interface)

### 4-1. 색상 시스템 (Color System)
| 역할 | 색상명 | HEX 코드 | 사용처 |
|------|--------|----------|--------|
| Primary | Charcoal(차콜) | #393D3F | 헤더, 주요 버튼, 탭 활성 아이콘 |
| Background | Off-White(오프화이트) | #FDFDFF | 페이지 배경 |
| Neutral | Warm Gray(웜 그레이) | #C6C5B9 | 카드 배경, 섹션 배경, 테두리 |
| Accent | Steel Blue(스틸 블루) | #62929E | 버튼 Hover(마우스 오버), 링크, 강조 요소 |

### 4-2. 타이포그래피(Typography, 글자 스타일) 기준
- 페이지 제목: 22px, font-bold
- 섹션 소제목: 18px, font-semibold
- 본문: 16px, font-normal
- 보조 텍스트 (날짜, 태그 등): 14px, font-normal, text-gray-500

---

## 5. 프로젝트 초기 설정 (Project Setup)
아래 명령어를 순서대로 실행하여 프로젝트를 생성한다.

```bash
# 1. Next.js 프로젝트 생성 (TypeScript(타입스크립트), Tailwind CSS(테일윈드 CSS), App Router 포함)
npx create-next-app@latest edubridge --typescript --tailwind --app --src-dir=false --import-alias="@/*"

# 2. 프로젝트 폴더로 이동
cd edubridge

# 3. Shadcn UI(쉐드씨엔 유아이) 초기화
npx shadcn@latest init

# 4. 필요한 Shadcn 컴포넌트 설치
npx shadcn@latest add button card badge input textarea toast tabs

# 5. Lucide React(루시드 리액트) 아이콘 라이브러리 설치 (create-next-app에 포함되어 있지 않은 경우)
npm install lucide-react
```

---

## 6. 폴더/파일 구조 및 라우팅 (Directory Structure & Routing)

```
edubridge/
├── app/
│   ├── layout.tsx            ← 공통 레이아웃 (BottomNavBar(하단 내비게이션 바) 포함)
│   ├── page.tsx              ← T1 홈 (URL: /)
│   ├── community/
│   │   └── page.tsx          ← T2 실시간 학습상담 (URL: /community)
│   ├── management/
│   │   └── page.tsx          ← T3 학업 관리 (URL: /management)
│   ├── consulting/
│   │   ├── page.tsx          ← T4 상담 목록 (URL: /consulting)
│   │   └── [id]/
│   │       └── page.tsx      ← 전문가 상세 페이지 (URL: /consulting/1)
│   ├── more/
│   │   └── page.tsx          ← T5 메뉴 (URL: /more)
│   └── login/
│       └── page.tsx          ← 로그인 페이지 (URL: /login)
├── components/
│   ├── BottomNavBar.tsx      ← 하단 탭 내비게이션 바 (Bottom Tab Navigation Bar)
│   ├── ExpertCard.tsx        ← 전문가 카드 컴포넌트 (T4 상담에서 사용)
│   ├── CommunityPost.tsx     ← 커뮤니티 게시글 카드 컴포넌트 (T2에서 사용)
│   └── GradeInputForm.tsx    ← 성적 입력 폼 컴포넌트 (T3에서 사용)
└── lib/
    └── mockData.ts           ← 모든 Mock Data(모의 데이터) 중앙 관리
```

---

## 7. Mock Data(모의 데이터) 스펙

`lib/mockData.ts` 파일에 아래 구조로 데이터를 정의한다.

### 전문가 목록 (T4 상담용)
```typescript
interface Expert {
  id: number;
  name: string;           // 예: "김지수 선생님"
  role: "선생님" | "멘토";
  university: string;     // 멘토인 경우만 해당 (예: "서울대학교")
  major: string;          // 전공 (예: "수학교육과")
  subjects: string[];     // 담당 과목 (예: ["수학", "물리"])
  rating: number;         // 평점 1.0~5.0 (예: 4.8)
  reviewCount: number;    // 리뷰 수 (예: 32)
  bio: string;            // 한줄 소개 (예: "수능 수학 만점 출신, 현 대치동 강사")
  pricePerHour: number;   // 시간당 가격(원) (예: 50000)
}
```

### 커뮤니티 게시글 (T2 실시간 학습상담용)
```typescript
interface CommunityPost {
  id: number;
  author: string;          // 예: "익명의 고3"
  content: string;         // 질문 내용
  subject: string;         // 과목 태그 (예: "수학")
  answerType: "AI" | "선생님";
  answer: string;          // 답변 내용
  createdAt: string;       // 예: "2025-03-15"
  likeCount: number;
}
```

### 성적 데이터 예시 (T3 학업 관리용)
```typescript
interface GradeRecord {
  id: number;
  subject: string;         // 예: "국어"
  score: number;           // 점수 (예: 85)
  grade: number;           // 등급 1~9
  examType: "내신" | "모의고사";
  date: string;            // 예: "2025-11"
}
```

### 비교과 활동 (T3 학업 관리용)
```typescript
interface ExtraActivity {
  id: number;
  type: "봉사" | "독서" | "기타";
  content: string;         // 예: "지역 도서관 독서 봉사 2시간"
  date: string;            // 예: "2025-03-10"
}
```

---

## 8. 로그인 페이지 상세 (Login Page Detail)

**URL**: `/login`
**설명**: 프로토타입 단계이므로 실제 인증 없이 UI(사용자 인터페이스)만 구현.

**레이아웃**:
1. 상단 중앙: 에듀브릿지 로고 이미지 또는 아이콘 + "에듀브릿지" 텍스트 (Primary Charcoal(#393D3F))
2. 부제목: "지방에서도 명문대 선배를 만나보세요" (gray 텍스트)
3. 입력 폼:
   - 아이디 입력 필드 (placeholder: "아이디를 입력하세요")
   - 비밀번호 입력 필드 (type="password", placeholder: "비밀번호를 입력하세요")
4. 로그인 버튼: Primary Charcoal(#393D3F) 배경, 클릭 시 어떤 값이든 `/`(홈)으로 이동 (Mock 처리)
5. 하단 링크: "회원가입" 버튼 — 비활성화(disabled) 처리 + "(준비 중)" 텍스트 표시

---

## 9. 각 탭 상세 UI 보완

### T2 실시간 학습상담 추가 스펙
- 우하단 FAB(Floating Action Button, 플로팅 액션 버튼): "질문하기" 버튼 고정 배치 (Primary Charcoal(#393D3F) 원형)
- 게시글 카드 구성:
  - 상단: 과목 태그(Badge) + 작성자 + 날짜
  - 중앙: 질문 본문
  - 하단: 답변 뱃지 — "AI(인공지능) 답변"(초록색), "선생님 답변"(파란색)
  - 좋아요(👍) 수 표시

### T3 학업 관리 추가 스펙
- 성적 입력 후 상단에 요약 카드 표시: 최근 평균 등급, 가장 최근 시험 날짜
- 비교과 활동 입력 항목: 유형(봉사/독서/기타) 드롭다운, 내용 텍스트 입력, 날짜 입력

### T4 상담 추가 스펙
- 상단 필터 탭: "전체" / "선생님" / "멘토" (Tabs(탭) 컴포넌트 사용)
- 전문가 상세 페이지(`/consulting/[id]`) 구성:
  - 프로필 영역: 이름, 역할, 대학/전공, 평점, 리뷰 수
  - 소개 섹션: bio 텍스트
  - 담당 과목 뱃지 목록
  - 더미 리뷰 2~3개 (리뷰어 이름, 별점, 내용)
  - 하단 고정: "상담 예약하기(시간당 OO원)" 버튼
- '상담 예약하기' 클릭 시: Toast(토스트) 메시지 "예약이 완료되었습니다!" 표시

### T5 메뉴 추가 스펙
- 상단 프로필 섹션: Mock 이름(예: "김민준"), Mock 이메일(예: "minjun@edubridge.kr")
- 메뉴 항목 목록 (리스트 + 오른쪽 화살표 아이콘):
  1. 내 상담 내역 (비활성화 + "준비 중")
  2. 공지사항 (비활성화 + "준비 중")
  3. 자주 묻는 질문(FAQ, Frequently Asked Questions)
  4. 고객센터 (비활성화 + "준비 중")
  5. 로그아웃 — 클릭 시 `/login` 페이지로 이동
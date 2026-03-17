"use client";
// GradeInputForm: 성적 입력 폼 컴포넌트 (Grade Input Form Component)
// 과목, 점수, 등급, 날짜, 시험 유형을 입력받아 부모 컴포넌트로 전달

import { useState } from "react";
import type { GradeRecord } from "@/lib/mockData";

const SUBJECTS = ["국어", "수학", "영어", "한국사", "지구과학1", "물리학1"] as const;

interface Props {
  onAdd: (record: Omit<GradeRecord, "id">) => void;
  onCancel: () => void;
}

export default function GradeInputForm({ onAdd, onCancel }: Props) {
  const [subject, setSubject] = useState<typeof SUBJECTS[number]>(SUBJECTS[0]);
  const [score, setScore] = useState("");
  const [grade, setGrade] = useState("");
  const [examType, setExamType] = useState<"내신" | "모의고사">("내신");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !score || !grade || !date) return;

    onAdd({
      subject: subject.trim(),
      score: Number(score),
      grade: Number(grade),
      examType,
      date: date.slice(0, 7), // YYYY-MM 형식으로 변환 (Convert to YYYY-MM format)
    });

    // 폼 초기화 (Reset form)
    setSubject(SUBJECTS[0]);
    setScore("");
    setGrade("");
    setDate("");
  };

  const inputClass =
    "w-full border border-[#C6C5B9] rounded-xl px-3 py-2.5 text-[15px] text-[#393D3F] bg-white focus:outline-none focus:border-[#62929E] transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FDFDFF] border border-[#C6C5B9] rounded-2xl p-4 space-y-3"
    >
      <h3 className="text-[16px] font-semibold text-[#393D3F]">성적 추가</h3>

      {/* 시험 유형 선택 (Exam Type Selection) */}
      <div className="flex gap-2">
        {(["내신", "모의고사"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setExamType(type)}
            className={`flex-1 py-2 rounded-xl text-[14px] font-medium transition-colors ${
              examType === type
                ? "bg-[#393D3F] text-white"
                : "bg-[#C6C5B9]/30 text-[#393D3F]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 과목 선택 (Subject Select) */}
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value as typeof SUBJECTS[number])}
        className={inputClass}
      >
        {SUBJECTS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* 점수 / 등급 입력 (Score / Grade Input) */}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="number"
            placeholder="점수 (0~100)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            min={0}
            max={100}
            className={inputClass}
            required
          />
        </div>
        <div className="flex-1">
          <input
            type="number"
            placeholder="등급 (1~9)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            min={1}
            max={9}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* 날짜 입력 (Date Input) - 월 단위(YYYY-MM) */}
      <input
        type="month"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={inputClass}
        required
      />

      {/* 버튼 영역 (Action Buttons) */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-[14px] font-medium bg-[#C6C5B9]/30 text-[#393D3F] hover:bg-[#C6C5B9]/50 transition-colors"
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
  );
}

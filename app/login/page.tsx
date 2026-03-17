"use client";
// 로그인 페이지 (Login Page)
// 프로토타입 단계 - 실제 인증 없이 UI(사용자 인터페이스)만 구현
// 어떤 값이든 입력하면 홈(/)으로 이동하는 Mock(모의) 로그인

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, User, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 입력값 유효성 검사 (Input Validation)
    if (!userId.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // Mock(모의) 로그인 처리 - 실제 인증 없이 홈으로 이동
    setLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center px-6 py-12">
      {/* 로고 및 타이틀 영역 (Logo and Title Section) */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#393D3F] flex items-center justify-center mb-4">
          <GraduationCap size={32} color="white" strokeWidth={1.8} />
        </div>
        <h1 className="text-[26px] font-bold text-[#393D3F] tracking-tight">
          에듀브릿지
        </h1>
        <p className="text-[15px] text-gray-500 mt-1.5 text-center leading-snug">
          지방에서도 명문대 선배를 만나보세요
        </p>
      </div>

      {/* 로그인 폼 (Login Form) */}
      <form onSubmit={handleLogin} className="w-full max-w-[380px] space-y-4">
        {/* 아이디 입력 (User ID Input) */}
        <div className="relative">
          <User
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C6C5B9]"
          />
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 border border-[#C6C5B9] rounded-xl text-[16px] text-[#393D3F] bg-white focus:outline-none focus:border-[#62929E] transition-colors"
          />
        </div>

        {/* 비밀번호 입력 (Password Input) */}
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C6C5B9]"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 border border-[#C6C5B9] rounded-xl text-[16px] text-[#393D3F] bg-white focus:outline-none focus:border-[#62929E] transition-colors"
          />
        </div>

        {/* 에러 메시지 (Error Message) */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-[14px]">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* 로그인 버튼 (Login Button) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#393D3F] text-white rounded-xl text-[16px] font-semibold hover:bg-[#62929E] transition-colors disabled:opacity-70"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        {/* 구분선 (Divider) */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[#C6C5B9]/50" />
          <span className="text-[13px] text-gray-400">또는</span>
          <div className="flex-1 h-px bg-[#C6C5B9]/50" />
        </div>

        {/* 회원가입 버튼 - 준비 중(disabled 처리) */}
        <button
          type="button"
          disabled
          className="w-full py-3.5 border border-[#C6C5B9] text-[#C6C5B9] rounded-xl text-[16px] font-semibold cursor-not-allowed"
        >
          회원가입 (준비 중)
        </button>
      </form>

      {/* 하단 안내 문구 (Footer Notice) */}
      <p className="mt-8 text-[12px] text-gray-400 text-center">
        프로토타입 버전 · 어떤 아이디/비밀번호로도 로그인 가능합니다
      </p>
    </div>
  );
}

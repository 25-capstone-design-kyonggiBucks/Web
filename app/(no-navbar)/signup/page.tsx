"use client";

import Image from "next/image";
import Link from "next/link";
import MainButton from "../../../components/MainButton";
import { signupUser } from "@/api/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSingup = async () => {
    if (!id || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(id);
    if (hasKorean) {
      setError("아이디에는 한글을 포함할 수 없습니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signupUser(id, password, confirmPassword);
      router.push("/home");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="font-nanum flex flex-col items-center justify-center min-h-screen w-full leading-normal text-text-brown bg-sub-color">
      <div className="bg-main-color text-[39.3px] font-extrabold px-[120px] py-[54px]">
        프로젝트 제목
      </div>
      <p className="text-[26px] font-normal tracking-[-0.78px] pt-[26px] pb-[129px]">
        동화 속 이야기의 주인공이 되어보세요!
      </p>

      <form
        className="flex flex-col items-center text-[20px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSingup();
        }}
      >
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-tl-[30px] rounded-tr-[30px]"
        />
        <div className="w-[608px] h-[1.5px] bg-[rgba(108,52,1,0.25)]" />

        <div className="relative w-[608px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[24px] text-text-brown"
          >
            <Image
              src={
                showPassword ? "/icons/eye-close.svg" : "/icons/eye-open.svg"
              }
              alt="비밀번호 보기 토글"
              width={24}
              height={24}
              className="w-[26px] h-[26px]"
            />
          </button>
        </div>

        <div className="w-[608px] h-[1.5px] bg-[rgba(108,52,1,0.25)]" />

        <div className="relative w-[608px]">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-bl-[30px] rounded-br-[30px]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[24px] text-text-brown"
          >
            <Image
              src={
                showConfirmPassword
                  ? "/icons/eye-close.svg"
                  : "/icons/eye-open.svg"
              }
              alt="비밀번호 보기 토글"
              width={24}
              height={24}
              className="w-[26px] h-[26px]"
            />
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-4 pl-[34.3px] flex w-full justify-start">
            {error}
          </p>
        )}
        <MainButton type="submit" className="mt-[162px]">
          회원가입
        </MainButton>
      </form>

      <div className="flex mt-[36.37px] text-[32px] leading-normal tracking-[-0.96px] gap-[28px]">
        <p className="font-normal">이미 회원이신가요?</p>
        <Link href="/login" className="font-bold">
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
}

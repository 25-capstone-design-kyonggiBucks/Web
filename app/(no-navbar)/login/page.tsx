"use client";

import Image from "next/image";
import Link from "next/link";
import MainButton from "../../../components/MainButton";
import { loginUser } from "@/api/authService";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserRole } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!id || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(id);
    if (hasKorean) {
      setError("아이디에는 한글을 포함할 수 없습니다.");
      return;
    }

    try {
      const { loginId: returnedId, accessToken } = await loginUser(
        id,
        password
      );
      sessionStorage.setItem("accessToken", accessToken);
      const role = returnedId === "admin" ? "admin" : "user";
      setUserRole(role);
      router.push(role === "admin" ? "/admin/home" : "/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류");
      }
    }
  };

  return (
    <div className="font-nanum flex flex-col items-center justify-center min-h-screen w-full leading-normal text-text-brown bg-sub-color">
      <Image src="/images/logo.png" alt="close" width={536} height={224} />
      <p className="text-[26px] font-normal tracking-[-0.78px] pt-[26px] pb-[129px]">
        동화 속 이야기의 주인공이 되어보세요!
      </p>

      <form
        className="flex flex-col items-center text-[20px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
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
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-bl-[30px] rounded-br-[30px]"
        />
        {error && (
          <p className="text-red-500 mt-4 pl-[34.3px] flex w-full justify-start">
            {error}
          </p>
        )}

        <MainButton type="submit" className="mt-[162px]">
          로그인
        </MainButton>
      </form>
      <div className="flex mt-[36.37px] text-[32px] leading-normal tracking-[-0.96px] gap-[28px]">
        <p className="font-normal">회원이 아니신가요?</p>
        <Link href="/signup" className="font-bold">
          회원가입 하러가기
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import MainButton from "../../components/MainButton";
import { useState } from "react";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("아이디:", id);
    console.log("비밀번호:", password);
  };

  return (
    <div className="font-nanum flex flex-col items-center justify-center min-h-screen w-full leading-normal text-text-brown">
      <div className="bg-main-color text-[39.3px] font-extrabold px-[120px] py-[54px]">
        프로젝트 제목
      </div>
      <p className="text-[26px] font-normal tracking-[-0.78px] pt-[26px] pb-[129px]">
        동화 속 이야기의 주인공이 되어보세요!
      </p>

      <form
        className="flex flex-col items-center mb-[162px]"
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
          className="w-[608px] h-[77px] pl-[34.3px] pt-[25.86px] pr-[473.7px] pb-[19.14px] bg-sub-color text-[20px] outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-tl-[30px] rounded-tr-[30px]"
        />
        <div className="w-[608px] h-[1.5px] bg-[rgba(108,52,1,0.25)]" />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[608px] h-[77px] pl-[34.3px] pt-[25.86px] pr-[473.7px] pb-[19.14px] bg-sub-color  text-[20px] outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-bl-[30px] rounded-br-[30px]"
        />
        <div className="mt-[162px]">
          <MainButton type="submit">로그인</MainButton>
        </div>
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

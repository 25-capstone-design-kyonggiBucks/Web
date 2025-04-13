"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("검색어:", search);
  };

  return (
    <nav className="w-full h-[140px] px-[40px] flex items-center justify-between bg-[rgba(255,241,189,1)] font-nanum text-text-brown">
      {/*왼쪽 */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Image
          src={"/icons/navSearchIcon.svg"}
          alt="로고"
          width={64}
          height={64}
          className="w-[64px] h-[64px]"
        />
        <span className="text-[40px] font-extrabold leading-normal tracking-[-0.075em]">
          LOGO
        </span>
      </div>

      {/* 검색바 */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex w-[750px] relative items-center"
      >
        <Image
          src={"/icons/navSearchIcon.svg"}
          alt="검색바 아이콘"
          width={38}
          height={38}
          className="absolute left-[27px] w-[38px] h-[38px]"
        />
        <input
          type="text"
          placeholder="읽고 싶은 동화책 검색하기"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-[80px] pr-4 py-[17.5px] rounded-[30px] bg-[rgba(255,255,255,0.75)] shadow-[inset_0px_4px_7px_rgba(108,52,1,0.25),_0px_4px_7px_rgba(108,52,1,0.25)] text-[26px] font-bold placeholder:opacity-[0.6] placeholder:text-[rgba(108,52,1,0.45)] placeholder:text-[26px] placeholder:font-normal placeholder:tracking-[-0.048em] outline-none"
        />
      </form>

      {/*오른쪽 */}
      <div className="flex items-center gap-[40px]" ref={dropdownRef}>
        <button
          type="button"
          className="cursor-pointern"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            src={"/icons/navMypageIcon.svg"}
            alt="마이페이지"
            width={64}
            height={64}
            className="w-[64px] h-[64px]"
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-[120px] mt-[200px] w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <Link
              href="/mypage"
              className="block px-4 py-3 text-text-brown hover:bg-yellow-100 font-semibold"
            >
              마이페이지
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-text-brown hover:bg-yellow-100 font-semibold"
            >
              소개페이지
            </Link>
          </div>
        )}
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => console.log("로그아웃")}
        >
          <Image
            src={"/icons/navLogoutIcon.svg"}
            alt="로그아웃"
            width={64}
            height={64}
            className="w-[64px] h-[64px]"
          />
        </button>
      </div>
    </nav>
  );
}

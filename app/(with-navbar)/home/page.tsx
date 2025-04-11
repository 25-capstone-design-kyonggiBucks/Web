"use client";

import Image from "next/image";
import booksData from "../mocks/bookList.json";
import { useState } from "react";
const MOCK_BOOKS = booksData.data;

export default function Home() {
  const [currentType, setCurrentType] = useState<"FOLKTALE" | "CLASSIC">(
    "FOLKTALE"
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const filteredBooks = MOCK_BOOKS.filter(
    (book) => book.bookType === currentType
  );
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleTabChange = (type: "FOLKTALE" | "CLASSIC") => {
    setCurrentType(type);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start text-text-brown font-nanum bg-sub-color tracking-[-0.071em] px-[110px]">
      <h1 className="text-[38px] font-extrabold mt-[87px] mb-[66px]">
        동화 찾아보기
      </h1>

      {/* 탭 버튼 */}
      <div className="flex w-full justify-center font-extrabold text-[38px] mb-[127px]">
        <button
          onClick={() => handleTabChange("FOLKTALE")}
          className={`w-full pb-[30px] ${
            currentType === "FOLKTALE"
              ? "border-b-[10px] border-b-text-brown opacity-[1]"
              : "border-b-[3px] border-b-[rgba(108,52,1,0.45)] opacity-[0.45]"
          }`}
        >
          전래동화
        </button>
        <button
          onClick={() => handleTabChange("CLASSIC")}
          className={`w-full pb-[30px] ${
            currentType === "CLASSIC"
              ? "border-b-[10px] border-b-text-brown opacity-[1]"
              : "border-b-[3px] border-b-[rgba(108,52,1,0.45)] opacity-[0.45]"
          }`}
        >
          세계명작
        </button>
      </div>

      {/* 동화 카드 그리드 */}
      <div className="grid grid-cols-3 gap-[61px] w-full ">
        {displayedBooks.map((book) => (
          <div
            key={book.bookId}
            className="rounded-[30px] bg-[#FFFEF6] shadow-[0px_4px_4px_rgba(108,52,1,0.25),_inset_0px_4px_10px_rgba(108,52,1,0.15)] text-center flex flex-col"
          >
            <div className="relative w-full aspect-[526/256] mb-[21px]">
              <Image src={book.imageURL} alt={book.title} fill />
            </div>
            <div className="flex flex-col px-[32px] pb-[33px] text-start">
              <h3 className="text-[38px] font-extrabold leading-normal tracking-[-0.071em]">
                {book.title}
              </h3>
              <p className="text-[26px] font-normal tracking-[-0.048em] mt-[21px]">
                {book.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 - 임시 */}
      <div className="flex gap-[40px] my-[60px]">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`text-[38px] font-extrabold leading-normal pl-[27px] pt-[15px] pr-[29px] pb-[9px] rounded-full ${
              page === num ? "bg-main-color" : "bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

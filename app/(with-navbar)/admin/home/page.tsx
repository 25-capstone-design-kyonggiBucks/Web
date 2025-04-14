"use client";

import Image from "next/image";
import booksData from "../../../../mocks/bookList.json";
import { useRouter } from "next/navigation";
import { useState } from "react";
const MOCK_BOOKS = booksData.data;

// 간단 드롭다운(또는 모달) 예시 컴포넌트
function MoreOptions({ onEdit }: { onEdit: () => void }) {
  // 수정/삭제/추가 버튼 클릭 시 로직 추가 가능
  return (
    <div className="gap-y-[30px] flex flex-col w-[180px] h-[288px] shrink-0 rounded-[30px] bg-[rgba(255,254,246,0.95)] shadow-[2px_7px_10px_3px_rgba(0,0,0,0.45),_0px_4px_10px_0px_rgba(108,52,1,0.15)_inset] text-text-brown font-nanum text-[40px] not-italic font-normal leading-[85%] tracking-[-1.2px]">
      <button className="px-[54px] mt-[30px]" onClick={onEdit}>
        수정
      </button>

      <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full" />
      <button className="px-[54px] ">삭제</button>

      <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full" />
      <button className="px-[54px] ">추가</button>
    </div>
  );
}

export default function AdminHomePage() {
  const router = useRouter();
  const [currentType, setCurrentType] = useState<"FOLKTALE" | "CLASSIC">(
    "FOLKTALE"
  );
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<number | null>(null);

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

  const handleMoreClick = (
    bookId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setOpenId(openId === bookId ? null : bookId);
  };

  const handleEdit = (bookId: number) => {
    router.push(`/admin/${bookId}`);
  };

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-start 
                    text-text-brown font-nanum bg-sub-color tracking-[-0.071em] px-[110px]"
    >
      <h1 className="text-[38px] font-extrabold mt-[87px] mb-[66px]">
        동화 관리하기
      </h1>

      {/* 탭 버튼 */}
      <div className="flex w-full justify-center font-extrabold text-[38px] mb-[127px]">
        <button
          onClick={() => handleTabChange("FOLKTALE")}
          className={`w-full pb-[30px] ${
            currentType === "FOLKTALE"
              ? "border-b-[10px] border-b-text-brown opacity-100"
              : "border-b-[3px] border-b-[rgba(108,52,1,0.45)] opacity-50"
          }`}
        >
          전래동화
        </button>
        <button
          onClick={() => handleTabChange("CLASSIC")}
          className={`w-full pb-[30px] ${
            currentType === "CLASSIC"
              ? "border-b-[10px] border-b-text-brown opacity-100"
              : "border-b-[3px] border-b-[rgba(108,52,1,0.45)] opacity-50"
          }`}
        >
          세계명작
        </button>
      </div>

      {/* 동화 카드 그리드 (관리자는 더보기 아이콘 포함) */}
      <div className="grid grid-cols-3 gap-[61px] w-full">
        {displayedBooks.map((book) => (
          <div
            key={book.bookId}
            className="rounded-[30px] bg-[#FFFEF6] 
                       shadow-[0px_4px_4px_rgba(108,52,1,0.25),_inset_0px_4px_10px_rgba(108,52,1,0.15)] 
                       text-center flex flex-col relative p-2"
          >
            <div className="relative w-full aspect-[526/256] mb-[21px] cursor-pointer">
              <Image src={book.imageURL} alt={book.title} fill />
            </div>
            {/* 도서 정보 + 더보기 아이콘 */}
            <div className="flex flex-row justify-between px-[32px] pb-[33px]">
              <div className="text-start">
                <h3 className="text-[38px] font-extrabold leading-normal tracking-[-0.071em]">
                  {book.title}
                </h3>
                <p className="text-[26px] font-normal tracking-[-0.048em] mt-[21px]">
                  {book.summary}
                </p>
              </div>
              {/* 더보기 아이콘 */}
              <div className="relative mt-[10px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreClick(book.bookId, e);
                  }}
                >
                  <Image
                    src="/icons/admin-home-more-options.svg"
                    alt="더보기 아이콘"
                    width={10}
                    height={56}
                  />
                </button>
                {/* 드롭다운(또는 모달) */}
                {openId === book.bookId && (
                  <div className="absolute mt-[150px] left-full -translate-y-1/2  z-10">
                    <MoreOptions onEdit={() => handleEdit(book.bookId)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex gap-[40px] my-[60px]">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`text-[38px] font-extrabold leading-normal 
                        px-[27px] py-[15px] rounded-full 
                        ${page === num ? "bg-main-color" : "bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

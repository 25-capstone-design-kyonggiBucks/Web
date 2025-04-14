"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import MainButton from "@/components/MainButton";
import booksData from "../../../../mocks/bookList.json";
import { useRouter } from "next/navigation";

const MOCK_BOOKS = booksData.data;

function MoreOptions({
  onEdit,
  onDeleteMode,
}: {
  onEdit: () => void;
  onDeleteMode: () => void;
}) {
  return (
    <div className="gap-y-[30px] flex flex-col w-[180px] h-[288px] shrink-0 rounded-[30px] bg-[rgba(255,254,246,0.95)] shadow-[2px_7px_10px_3px_rgba(0,0,0,0.45),_0px_4px_10px_0px_rgba(108,52,1,0.15)_inset] text-text-brown font-nanum text-[40px] not-italic font-normal leading-[85%] tracking-[-1.2px]">
      <button className="px-[54px] mt-[30px]" onClick={onEdit}>
        수정
      </button>

      <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full" />
      <button className="px-[54px]" onClick={onDeleteMode}>
        삭제
      </button>

      <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full" />
      <button className="px-[54px] ">추가</button>
    </div>
  );
}

function DeleteModal({
  bookTitle,
  bookImage,
  onConfirm,
  onClose,
}: {
  bookTitle: string;
  bookImage: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[898px] rounded-[30px] bg-[rgba(255,254,246,0.85)] shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset] px-[186px] py-[70px]">
        <button onClick={onClose} className="absolute top-[32px] right-[32px]">
          <Image
            src="/icons/admin-delete-close.svg"
            alt="close"
            width={38}
            height={38}
          />
        </button>
        <h2 className="text-center text-[38px] not-italic font-extrabold leading-normal tracking-[-1.14px] mb-[68px]">
          {bookTitle}
        </h2>
        <div className="relative w-full h-[262px]">
          <Image
            src={bookImage}
            alt={bookTitle}
            fill
            className="object-contain"
          />
        </div>
        <p className="text-center text-[26px] not-italic font-normal leading-normal tracking-[-0.78px] mt-[24px]">
          해당 동화를 정말 삭제하시겠습니까?
        </p>
        <MainButton onClick={onConfirm} className="w-full mt-[55px]">
          삭제하기
        </MainButton>
      </div>
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

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [books, setBooks] = useState(MOCK_BOOKS);

  const itemsPerPage = 6;
  const filteredBooks = books.filter((book) => book.bookType === currentType);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const moreOptionsRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 MoreOptions 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(e.target as Node)
      ) {
        setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
  };

  const handleDeleteIconClick = (
    bookId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setDeleteId(bookId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId == null) return;
    setBooks((prev) => prev.filter((b) => b.bookId !== deleteId));
    setDeleteId(null);
    setIsDeleteModalOpen(false);
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
                       text-center flex flex-col relative"
          >
            {/* 삭제 모드일 때, 모든 카드에 X 아이콘 표시 */}
            {isDeleteMode && (
              <button
                onClick={(e) => handleDeleteIconClick(book.bookId, e)}
                className="absolute top-[-20px] right-[-35px] z-10"
              >
                <Image
                  src="/icons/admin-home-delete.svg"
                  alt="삭제 아이콘"
                  width={75}
                  height={75}
                />
              </button>
            )}

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
                  <div
                    ref={moreOptionsRef}
                    className="absolute mt-[150px] left-full -translate-y-1/2  z-10"
                  >
                    <MoreOptions
                      onEdit={() => {
                        handleEdit(book.bookId);
                        setOpenId(null);
                      }}
                      onDeleteMode={() => {
                        handleDeleteMode();
                        setOpenId(null);
                      }}
                    />
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

      {isDeleteModalOpen && deleteId !== null && (
        <DeleteModal
          bookTitle={
            books.find((b) => b.bookId === deleteId)?.title || "제목 없음"
          }
          bookImage={
            books.find((b) => b.bookId === deleteId)?.imageURL ||
            "/placeholder.png"
          }
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setDeleteId(null);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

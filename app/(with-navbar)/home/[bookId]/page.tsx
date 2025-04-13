"use client";

import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import MainButton from "@/components/MainButton";
import booksData from "../../../../mocks/bookList.json";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = Number(params.bookId);
  const router = useRouter();
  const { data: BOOKS } = booksData;

  const book = BOOKS.find((b) => b.bookId === bookId);

  if (!book) {
    return <div className="p-8">존재하지 않는 동화입니다.</div>;
  }

  const typeLabel = book.bookType === "FOLKTALE" ? "전래동화" : "세계명작";

  return (
    <div className="flex flex-col px-[158px] py-[44px] bg-sub-color min-h-screen font-nanum text-text-brown">
      <p className="font-extrabold leading-normal">
        <span className="text-[48px] tracking-[-0.09em]"> {typeLabel} </span>
        <span className="text-[38px] tracking-[-0.071em]">
          &gt; {book.title}
        </span>
      </p>
      <hr className="border-t-[3px] border-text-brown opacity-[0.45] w-full mb-[44px]" />
      <div className="flex flex-row gap-[81px]">
        {/* 왼쪽: 썸네일 이미지 */}
        <div className="relative w-[915px] h-[610px]  rounded-[20px] overflow-hidden">
          <Image
            src={book.imageURL}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 오른쪽: 텍스트 + 버튼 */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[49.856px] font-extrabold leading-normal">
            {book.title}
          </h1>
          <p className="text-[34.112px] font-normal">{book.summary}</p>

          <div className="flex flex-col gap-[30px] mt-[90px] items-center">
            <MainButton
              type="button"
              onClick={() => router.push(`/home/${bookId}/read`)}
            >
              동화 읽기
            </MainButton>
            <MainButton type="button">동화에 얼굴 넣기</MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}

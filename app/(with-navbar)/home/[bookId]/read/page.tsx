"use client";

import Image from "next/image";
import booksData from "../../../../../mocks/bookList.json";
import { useParams } from "next/navigation";

export default function BookReadPage() {
  const params = useParams();
  const bookId = Number(params.bookId);
  const { data: BOOKS } = booksData;
  const book = BOOKS.find((b) => b.bookId === bookId);

  if (!book) {
    return <div className="p-8">존재하지 않는 동화입니다.</div>;
  }

  return (
    <div className="flex flex-col items-center px-[180px] py-[63px] bg-sub-color min-h-screen font-nanum text-text-brown">
      <h1 className="text-[49.856px] font-extrabold leading-normal tracking-[-1.496px] mb-[21px]">
        {book.title}
      </h1>
      <div className="relative w-[1500px] h-[735px] rounded-[30px] overflow-hidden">
        <Image
          src={book.imageURL}
          alt="동화 이미지"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <button>
            <Image
              src="/icons/book-read-playIcon.svg"
              alt="재생 버튼"
              width={143}
              height={143}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

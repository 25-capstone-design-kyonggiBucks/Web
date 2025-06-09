"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CreateLoading from "app/(with-navbar)/createLoading/page";
import Image from "next/image";
import MainButton from "@/components/MainButton";
import { getBookById } from "@/api/bookApi";
import { postCustomVideo } from "@/api/video";

interface Book {
  bookId: number;
  title: string;
  summary: string;
  imageURL: string;
  bookType: "FOLKTALE" | "CLASSIC";
}

export default function BookDetailPage() {
  const params = useParams();
  const bookId = Number(params.bookId);
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCustomVideo = async () => {
    try {
      setIsCreating(true);
      const response = await postCustomVideo(bookId);

      if (response?.status === 200 || response?.status === 201) {
        router.push(`/home/${bookId}/readCustom`);
      } else {
        alert("영상 생성에 실패했습니다. 다시 시도해주세요.");
        setIsCreating(false);
      }
    } catch (e: unknown) {
      console.error(e);
      alert("영상 생성 중 오류가 발생했습니다.");
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);
      } catch (error) {
        console.error("도서 조회 실패:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  if (!book) {
    return <div className="p-8">존재하지 않는 동화입니다.</div>;
  }
  const typeLabel = book.bookType === "FOLKTALE" ? "전래동화" : "세계명작";

  return (
    <div className="flex flex-col px-[158px] py-[44px] bg-sub-color min-h-screen font-nanum text-text-brown">
      {isCreating && <CreateLoading />}
      <p className="font-extrabold leading-normal">
        <span className="text-[48px] tracking-[-0.09em]"> {typeLabel} </span>
        <span className="text-[38px] tracking-[-0.071em]">
          &gt; {book.title}
        </span>
      </p>
      <hr className="border-t-[3px] border-text-brown opacity-[0.45] w-full mb-[44px]" />
      <div className="flex flex-row gap-[81px]">
        {/* 왼쪽: 썸네일 이미지 */}
        <div className="relative w-[915px] h-[610px]  rounded-[30px] overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${book.imageURL}`}
            alt={book.title}
            fill
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
            <MainButton type="button" onClick={() => handleCustomVideo()}>
              동화에 얼굴 넣기
            </MainButton>
            {/* onCLick 에다가 api 호출 넣고 거기다가 조건 넣고서 푸시 넣기 */}
          </div>
        </div>
      </div>
    </div>
  );
}

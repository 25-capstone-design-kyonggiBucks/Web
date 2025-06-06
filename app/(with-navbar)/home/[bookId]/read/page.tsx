"use client";

import { getBasicVedio, getCustomVedio } from "@/api/video";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { getBookById } from "@/api/bookApi";

interface Book {
  bookId: number;
  title: string;
  summary: string;
  imageURL: string;
  bookType: "FOLKTALE" | "CLASSIC";
}

export default function BookReadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookId = Number(params.bookId);
  const [book, setBook] = useState<Book | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const isCustom = searchParams.get("custom") === "true";
  console.log("isCustom 참거짓 유무:", isCustom); //이거 false면 1번 주석 제거. true면 2번 주석 제거
  console.log("searchParams.get('custom'):", searchParams.get("custom"));

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);

        //1번 주석 사용시 , 2번을 주석 처리 해주세여
        // const customParam = searchParams.get("custom");
        // const isCustomVideo = customParam === "true";
        // const videoData = isCustomVideo
        //   ? await getCustomVedio(bookId)
        //   : await getBasicVedio(bookId);

        //2번
        const videoData = isCustom
          ? await getCustomVedio(bookId)
          : await getBasicVedio(bookId);

        setVideoUrl(videoData);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isNaN(bookId)) {
      fetchBook();
    }
  }, [bookId, searchParams]);

  if (!book) {
    return <div className="p-8">존재하지 않는 동화입니다.</div>;
  }

  return (
    <div className="flex flex-col items-center px-[180px] py-[63px] bg-sub-color min-h-screen font-nanum text-text-brown">
      <h1 className="text-[49.856px] font-extrabold leading-normal tracking-[-1.496px] mb-[21px]">
        {book.title}
      </h1>
      <div className="relative w-[1500px] h-[735px] rounded-[30px] overflow-hidden">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white">
            영상을 불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
}

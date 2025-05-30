"use client";

import { useEffect, useState } from "react";

import { getBasicVedio } from "@/api/video";
import { getBookById } from "@/api/bookApi";
import { useParams } from "next/navigation";

interface Book {
  bookId: number;
  title: string;
  summary: string;
  imageURL: string;
  bookType: "FOLKTALE" | "CLASSIC";
}

export default function BookReadPage() {
  const params = useParams();
  const bookId = Number(params.bookId);
  const [book, setBook] = useState<Book | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);

        const videoData = await getBasicVedio(bookId);
        setVideoUrl(videoData);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isNaN(bookId)) {
      fetchBook();
    }
  }, [bookId]);

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
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <button>
            <Image
              src="/icons/book-read-playIcon.svg"
              alt="재생 버튼"
              width={143}
              height={143}
            />
          </button>
        </div> */}
      </div>
    </div>
  );
}

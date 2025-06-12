"use client";

import { useEffect, useRef, useState } from "react";

import { getBookById } from "@/api/bookApi";
import { getCustomVideo } from "@/api/video";
import { useParams } from "next/navigation";

interface Book {
  bookId: number;
  title: string;
  summary: string;
  imageURL: string;
  bookType: "FOLKTALE" | "CLASSIC";
}

export default function CustomReadPage() {
  const params = useParams();
  const bookId = Number(params.bookId);
  const [book, setBook] = useState<Book | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);
        const bookData = data.data;
        setBook(bookData);

        if (bookData.title === "금도끼은도끼") {
          setAudioSrc("/audio/Axe.mp3");
        } else if (bookData.title === "아낌없이주는나무") {
          setAudioSrc("/audio/Axe.mp3");
        } else {
          setAudioSrc(null);
        }

        const videoData = await getCustomVideo(bookId);
        setVideoUrl(videoData);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isNaN(bookId)) {
      fetchBook();
    }
  }, [bookId]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = videoRef.current?.currentTime || 0;
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

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
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
            />
            {audioSrc && <audio ref={audioRef} src={audioSrc} preload="auto" />}
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white">
            영상을 불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
}

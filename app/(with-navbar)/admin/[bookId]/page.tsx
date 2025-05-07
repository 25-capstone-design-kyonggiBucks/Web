"use client";

import { getBooksByType, updateBook } from "@/api/bookApi";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import MainButton from "@/components/MainButton";

interface Book {
  bookId: number;
  title: string;
  summary: string;
  imageURL: string;
  bookType: "FOLKTALE" | "CLASSIC";
}

export default function AdminBookDetailPage() {
  const params = useParams();
  const bookId = Number(params.bookId);
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(book?.title || "");
  const [summary, setSummary] = useState(book?.summary || "");
  const [imageURL, setImageURL] = useState(book?.imageURL || "");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const books = await getBooksByType("FOLKTALE");
        const found = books.find((b: Book) => b.bookId === bookId);
        if (found) {
          setBook(found);
          setTitle(found.title);
          setSummary(found.summary);
          setImageURL(found.imageURL);
        }
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

  const handleEditMode = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      await updateBook({
        bookId,
        title,
        summary,
      });
      alert("도서가 성공적으로 수정되었습니다.");
      setIsEditing(false);
      router.push("/admin/home");
    } catch (error) {
      alert("수정에 실패했습니다.");
      console.error("수정 오류:", error);
    }
  };

  return (
    <div className="flex flex-col px-[158px] py-[44px] bg-sub-color min-h-screen font-nanum text-text-brown">
      {/* 상단 라벨 */}
      <p className="font-extrabold leading-normal">
        <span className="text-[48px] tracking-[-0.09em]">{typeLabel}</span>
        <span className="text-[38px] tracking-[-0.071em]"> &gt; {title}</span>
      </p>
      <hr className="border-t-[3px] border-text-brown opacity-[0.45] w-full mb-[44px]" />

      <div className="flex flex-row gap-[81px]">
        {/* 왼쪽: 썸네일 (수정 모드에서 이미지 URL 변경 가능) */}
        <div className="relative w-[915px] h-[610px] rounded-[20px] overflow-hidden">
          {isEditing ? (
            // 미리보기: 수정 중에는 imageURL 필드가 바뀔 수 있음
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${book.imageURL}`}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${book.imageURL}`}
              alt={book.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* 오른쪽: 텍스트 + 버튼 */}
        <div className="flex-1 flex flex-col justify-center">
          {isEditing ? (
            // 편집 모드
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-[49.856px] font-extrabold leading-normal rounded-[30px] bg-[rgba(255,254,246,0.85)] shadow-[0px_4px_4px_0px_rgba(108,52,1,0.25),_0px_4px_10px_0px_rgba(108,52,1,0.15)_inset] mb-[20px] pl-[28px] py-[20px]"
              />
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="h-[200px] rounded-[30px] bg-[rgba(255,254,246,0.85)] shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset] text-[34.112px] not-italic font-normal px-[28px] py-[42px] mb-[20px]"
              />
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="rounded-[30px] bg-[rgba(255,254,246,0.85)] shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset] text-[34.112px] not-italic font-normal px-[28px] py-[20px]"
                placeholder="이미지 URL 수정"
              />

              <MainButton
                type="button"
                onClick={handleSaveChanges}
                className="mt-[20px] w-full"
              >
                변경사항 저장
              </MainButton>
            </>
          ) : (
            // 일반 모드
            <>
              <h1 className="text-[49.856px] font-extrabold leading-normal">
                {book.title}
              </h1>
              <p className="text-[34.112px] font-normal">{book.summary}</p>

              <div className="flex flex-col gap-[30px] mt-[90px] items-center">
                <MainButton type="button" onClick={handleEditMode}>
                  수정하기
                </MainButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

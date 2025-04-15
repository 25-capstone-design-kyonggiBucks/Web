"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import MainButton from "@/components/MainButton";
import { useRouter } from "next/navigation";

export default function AddFairyTalePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

  const [bookType, setBookType] = useState<"FOLKTALE" | "CLASSIC" | "">("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //미리보기
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookType) {
      alert("카테고리를 선택하세요.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!summary.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    const newBook = {
      bookId: Date.now(),
      title,
      summary,
      file: uploadFile, // 실제 업로드 시 서버 API 필요
      bookType,
    };
    console.log("새 동화 등록:", newBook);

    router.push("/admin/home");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelectCategory = (type: "FOLKTALE" | "CLASSIC") => {
    setBookType(type);
    setIsDropdownOpen(false);
  };

  const renderCategoryLabel = () => {
    if (!bookType) return "동화 카테고리 선택";
    return bookType === "FOLKTALE" ? "전래동화" : "세계명작";
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-sub-color text-text-brown font-nanum px-[158px] py-[50px]">
      {/* 상단 제목 */}
      <h1 className="w-full text-[38px] font-extrabold mb-[44px]">
        동화 추가하기
      </h1>
      <hr className="border-t-[3px] border-text-brown opacity-[0.45] w-full mb-[44px]" />

      <form onSubmit={handleSubmit} className="flex w-full gap-[20px]">
        {/* 왼쪽 영역: 카테고리(상단), 이미지 업로드(하단) */}
        <div className="flex flex-col justify-between w-1/2 gap-[20px]">
          {/* (1) 카테고리 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className={`flex w-full bg-[rgba(255,254,246,0.85)] shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset]
                px-[28px] py-[45px] justify-between text-[34.112px] not-italic font-normal leading-[85%] tracking-[-1.023px]
                ${isDropdownOpen ? "rounded-t-[30px]" : "rounded-[30px]"}
              `}
            >
              <span className={`${!bookType ? "opacity-[0.45]" : ""}`}>
                {renderCategoryLabel()}
              </span>
              <Image
                src="/icons/admin-add-arrow.svg"
                alt="Arrow"
                width={19}
                height={32}
              />
            </button>

            {/* 드롭다운 목록 */}
            {isDropdownOpen && (
              <div
                className="absolute w-full z-20 rounded-b-[30px] px-[28px] bg-[rgba(255,254,246,0.85)] text-[25px] not-italic font-normal leading-[85%] tracking-[-1.023px]
              shadow-[0_4px_4px_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset]"
              >
                <div
                  className="py-[45px] cursor-pointer"
                  onClick={() => handleSelectCategory("FOLKTALE")}
                >
                  전래동화
                </div>
                <div
                  className="pb-[45px] cursor-pointer"
                  onClick={() => handleSelectCategory("CLASSIC")}
                >
                  세계명작
                </div>
              </div>
            )}
          </div>

          {/* (2) "파일 업로드 + 미리보기"가 합쳐진 영역 */}
          <div className="flex flex-col">
            <div
              className="relative w-full aspect-[5/3] bg-[rgba(255,254,246,0.85)] 
                            shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset]
                            rounded-[30px] overflow-hidden text-center cursor-pointer"
            >
              {previewURL ? (
                <Image
                  src={previewURL}
                  alt="이미지 미리보기"
                  fill
                  className="object-contain"
                />
              ) : (
                <p className="flex items-center justify-center w-full h-full opacity-[0.45] text-[34.112px] not-italic font-normal leading-[85%] tracking-[-1.023px]">
                  동화 썸네일 이미지를 업로드해주세요.
                </p>
              )}
              {/* 실제 파일 인풋 (투명/절대 위치) */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 영역: 제목, 내용, 등록 버튼 */}
        <div className="flex flex-col w-1/2 gap-[20px]">
          <input
            type="text"
            className="rounded-[30px] bg-[rgba(255,254,246,0.85)]
                       shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset] placeholder:text-text-brown placeholder:opacity-[0.45]
                       px-[28px] py-[40px] text-[34.112px] not-italic font-normal leading-[85%] tracking-[-1.023px] focus:outline-none"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="flex-1 rounded-[30px] bg-[rgba(255,254,246,0.85)] placeholder:text-text-brown placeholder:opacity-[0.45]
                       shadow-[0_4px_4px_0_rgba(108,52,1,0.25),_0_4px_10px_0_rgba(108,52,1,0.15)_inset]
                       px-[28px] py-[42px] text-[34.112px] not-italic font-normal leading-[85%] tracking-[-1.023px] focus:outline-none"
            placeholder="내용을 입력해주세요."
            rows={8}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          <div>
            <MainButton type="submit" className="w-full">
              동화 추가하기
            </MainButton>
          </div>
        </div>
      </form>
    </div>
  );
}

import Image from "next/image";

// src/app/guide/page.tsx
export default function GuidePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">프로젝트 제목</h1>
        <p className="text-center text-gray-600 mb-6">
          얼굴 촬영 가이드에 따라 사진을 업로드해주세요.
        </p>

        {/* 얼굴 촬영 가이드 이미지 */}
        <div className="flex justify-center mb-4">
          <Image
            src={"/icons/guide-loading.svg"}
            alt="얼굴 촬영 가이드"
            width={24}
            height={24}
            className="rounded-[12px]"
          />
        </div>

        {/* 얼굴 업로드 버튼 */}
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            얼굴 업로드
          </label>
        </div>
      </div>
    </div>
  );
}

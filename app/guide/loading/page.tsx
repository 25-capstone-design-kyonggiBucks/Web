export default function GuideLoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {/* 촬영 인식 애니메이션 (GIF 또는 SVG) */}
        <img
          src="/face-scanning.gif" // 실제 파일 경로 확인 필요
          alt="촬영 인식 중..."
          className="w-48 h-48 object-cover"
        />

        <p className="text-gray-700 text-lg font-semibold">
          얼굴을 인식하는 중...
        </p>
      </div>
    </div>
  );
}

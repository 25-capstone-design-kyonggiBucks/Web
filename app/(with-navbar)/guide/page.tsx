"use client";

import { ExpressionType, uploadExpressionImage } from "@/api/imageService";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import MainButton from "../../../components/MainButton";
import { useRouter } from "next/navigation";

const expressions: { label: string; value: ExpressionType }[] = [
  { label: "기본 표정", value: "NEUTRAL" },
  { label: "웃는 표정", value: "HAPPY" },
  { label: "슬픈 표정", value: "SAD" },
  { label: "놀란 표정", value: "SURPRISED" },
  { label: "화난 표정", value: "ANGRY" },
];

export default function GuidePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1) 마운트 시 웹캠 요청 (한 번만)
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((e) => console.error("카메라 권한이 필요합니다.", e));

    // 언마운트 시 스트림 정리
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  // 2) 촬영 함수
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    setPreviewSrc(canvas.toDataURL("image/png"));
  };

  const handleRetake = () => setPreviewSrc(null);

  const goNext = () => {
    if (step < expressions.length - 1) {
      setStep((s) => s + 1);
      setPreviewSrc(null);
    } else {
      router.push("/home");
    }
  };

  const handleSave = async () => {
    if (!previewSrc) return;
    setLoading(true);

    try {
      const blob = await (await fetch(previewSrc)).blob();
      await uploadExpressionImage(blob, expressions[step].value);
      goNext();
    } catch (err: unknown) {
      if (err instanceof Error) {
        const msg = err.message;

        if (msg.includes("이미 등록된 표정입니다")) {
          goNext();
          return;
        }
        if (msg.includes("유효하지 않은 토큰")) {
          alert(msg);
          router.push("/login");
          return;
        }
        if (msg.includes("이미지 파일을 선택해주세요")) {
          alert(msg);
          return;
        }
        alert(msg);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-sub-color px-8 pt-[103px]">
      <h1 className="mb-4 text-2xl font-bold text-text-brown text-[38px] font-extrabold leading-normal tracking-[-1.14px] ">
        {expressions[step].label} 촬영
      </h1>

      <div className="relative w-full max-w-screen-lg aspect-video  overflow-hidden bg-black rounded-[30px]">
        {/* 항상 마운트, 보이기/숨기기 */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${previewSrc ? "hidden" : ""}`}
          muted
        />

        {/* 미리보기 */}
        {previewSrc && (
          <Image
            fill
            src={previewSrc}
            alt="미리보기"
            className=" object-cover"
          />
        )}

        {/* 얼굴 가이드라인 */}

        {!previewSrc && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative w-[90%] h-[90%]">
              <Image
                src="/images/guide-line.svg"
                alt="가이드라인"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-[60px] flex gap-4">
        {!previewSrc ? (
          <MainButton onClick={handleCapture}>촬영</MainButton>
        ) : (
          <>
            <MainButton onClick={handleRetake} disabled={loading}>
              다시찍기
            </MainButton>
            <MainButton onClick={handleSave} disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </MainButton>
          </>
        )}
      </div>
    </div>
  );
}

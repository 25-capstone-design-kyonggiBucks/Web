"use client";

import React, { useEffect, useRef, useState } from "react";
import { getUserImages, updateImage, uploadImage } from "@/api/uploadImage";

import Image from "next/image";
import MainButton from "@/components/MainButton";
import dynamic from "next/dynamic";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });
const GuideLoading = dynamic(
  () => import("@/app/(with-navbar)/guideLoading/page")
);

type Expression = "HAPPY" | "SAD" | "SURPRISED" | "ANGRY";

interface WebcamHandle {
  getScreenshot: () => string | null;
}

const expressions: { type: Expression; label: string }[] = [
  { type: "HAPPY", label: "웃는 얼굴" },
  { type: "SAD", label: "슬픈 얼굴" },
  { type: "SURPRISED", label: "놀란 얼굴" },
  { type: "ANGRY", label: "화난 얼굴" },
];

const guideLineMap: Record<Expression, string> = {
  HAPPY: "/images/guide-happy.png",
  SAD: "/images/guide-sad.png",
  SURPRISED: "/images/guide-surprised.png",
  ANGRY: "/images/guide-angry.png",
};

export default function GuidePage() {
  const [photos, setPhotos] = useState<Record<Expression, string | null>>({
    HAPPY: null,
    SAD: null,
    SURPRISED: null,
    ANGRY: null,
  });

  const [currentExpr, setCurrentExpr] = useState<Expression | null>(null);
  const [loading, setLoading] = useState(false);

  const webcamRef = useRef<WebcamHandle | null>(null);
  const uploadedRef = useRef<Set<Expression>>(new Set());

  useEffect(() => {
    (async () => {
      try {
        const imgs = await getUserImages();
        const init: Record<Expression, string | null> = {
          HAPPY: null,
          SAD: null,
          SURPRISED: null,
          ANGRY: null,
        };
        imgs.forEach(({ expression, url }) => {
          init[expression] = url;
          uploadedRef.current.add(expression);
        });
        setPhotos(init);
      } catch (e) {
        console.error("초기 이미지 조회 실패", e);
      }
    })();
  }, []);

  const startCapture = (expr: Expression) => {
    setCurrentExpr(expr);
  };

  const handleCapture = async () => {
    if (!webcamRef.current || !currentExpr) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const isUpdate = uploadedRef.current.has(currentExpr);
    const prevPhoto = photos[currentExpr];

    setLoading(true);

    try {
      if (isUpdate) {
        const res1 = await updateImage(imageSrc, currentExpr);
        console.log("수정 완료", res1);
      } else {
        const res1 = await uploadImage(imageSrc, currentExpr);
        console.log("업로드 완료", res1);
      }
      uploadedRef.current.add(currentExpr);
      setPhotos((prev) => ({ ...prev, [currentExpr]: imageSrc }));

      window.location.reload();
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드 중 오류가 발생했습니다. 콘솔을 확인하세요.");

      if (isUpdate) {
        setPhotos((prev) => ({ ...prev, [currentExpr]: prevPhoto }));
      } else {
        setPhotos((prev) => {
          const updated = { ...prev };
          delete updated[currentExpr];
          return updated;
        });
      }
    } finally {
      setLoading(false);
      setCurrentExpr(null);
    }
  };

  const cancelCapture = () => {
    setCurrentExpr(null);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start text-text-brown font-nanum bg-sub-color tracking-[-0.071em] py-[100px]">
      {loading && <GuideLoading />}

      {currentExpr ? (
        <div className="relative flex-col w-[840px] h-[680px] flex justify-center items-center">
          {currentExpr && (
            <p className="mb-[32px] mt-[100px] text-[38px] font-extrabold text-center">
              {expressions.find((exp) => exp.type === currentExpr)?.label}을
              지어주세요!
            </p>
          )}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className=" w-full h-full rounded-2xl shadow-lg"
          />
          <div className="absolute">
            <Image
              src={guideLineMap[currentExpr]}
              alt="가이드라인"
              width={360}
              height={200}
              className="pointer-events-none"
              style={{ opacity: 0.6 }}
            />
          </div>
          <div className="mt-4 flex space-x-4 w-[840px]">
            <MainButton
              onClick={handleCapture}
              className="mt-4 px-6 py-2 text-[44px] h-[100px] rounded-xl"
            >
              촬영
            </MainButton>
            <MainButton
              onClick={cancelCapture}
              className="mt-4 px-6 py-2 text-[44px] h-[100px] rounded-xl bg-gray-300"
            >
              취소
            </MainButton>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[100px] flex w-auto h-auto">
          {expressions.map(({ type, label }) => (
            <div key={type} className="flex flex-col items-center ">
              <p className="mb-2 text-[32px] font-bold">{label}</p>
              {photos[type] ? (
                <div className="relative w-[500px] bg-sub-color h-[300px]">
                  <Image
                    src={photos[type]!}
                    alt={label}
                    fill
                    className="object-contain rounded-2xl shadow"
                  />
                </div>
              ) : (
                <div className="w-[500px] h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl">
                  <p className="text-gray-500 text-[28px]">
                    {label}을 촬영해주세요
                  </p>
                </div>
              )}
              <MainButton
                onClick={() => startCapture(type)}
                className="mt-4 text-[18px] w-[490px] h-[80px] rounded-xl"
              >
                {photos[type] ? "재촬영" : "촬영"}
              </MainButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

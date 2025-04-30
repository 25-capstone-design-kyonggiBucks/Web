"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";
import MainButton from "@/components/MainButton";
import dynamic from "next/dynamic";
import guideLinePath from "/public/images/guide-line.svg";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

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

export default function GuidePage() {
  const [photos, setPhotos] = useState<Record<Expression, string | null>>({
    HAPPY: null,
    SAD: null,
    SURPRISED: null,
    ANGRY: null,
  });

  const [currentExpr, setCurrentExpr] = useState<Expression | null>(null);

  const webcamRef = useRef<WebcamHandle | null>(null);

  const startCapture = (expr: Expression) => {
    setCurrentExpr(expr);
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc && currentExpr) {
        setPhotos((prev) => ({ ...prev, [currentExpr]: imageSrc }));
        console.log("Captured", { expression: currentExpr, file: imageSrc });
        setCurrentExpr(null);
      }
    }
  };

  const cancelCapture = () => {
    setCurrentExpr(null);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start text-text-brown font-nanum bg-sub-color tracking-[-0.071em] py-[100px]">
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
              src={guideLinePath}
              alt="가이드라인"
              width={360}
              height={200}
              className="pointer-events-none"
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
            <div key={type} className="flex flex-col items-center">
              <p className="mb-2 text-[32px] font-bold">{label}</p>
              {photos[type] ? (
                <div className="relative w-[500px] h-[300px]">
                  <Image
                    src={photos[type]!}
                    alt={label}
                    fill
                    className="object-cover rounded-2xl shadow"
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
                className="mt-4 text-[18px] w-[500px] h-[80px] rounded-xl"
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

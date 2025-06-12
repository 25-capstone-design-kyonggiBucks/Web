import Image from "next/image";
import { PulseLoader } from "react-spinners";

export default function FaceRecognitionLoader() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="bg-[rgba(255,254,246,0.85)] w-[898px] h-[582px] rounded-[30px] mt-[143px] text-text-brown font-nanum leading-normal">
        <div className="w-full flex flex-col text-center mt-[67px]">
          {/*로딩 스피닝 - 작동안되는데 나중에 손보기*/}
          <div className="flex justify-center mb-[25px]">
            <PulseLoader color="#6C3401" size={12} loading={true} />
          </div>
          <p className="text-[38px] font-extrabold tracking-[-0.071em] mb-[48px]">
            얼굴 촬영 인식 중
          </p>
          <div className="flex justify-center">
            <div className="mb-[50px] relative w-[219px] h-[223px]">
              <Image
                src={"/icons/guide-loading.svg"}
                alt="로딩 이미지"
                fill
                className="object-cover z-10 rounded-[12px]"
              />
              <Image
                src={"/icons/guide-loading-bar.svg"}
                alt="로딩 바 이미지"
                width={219}
                height={223}
                className="absolute top-0 left-0 z-20 animate-bounce-bar"
              />
            </div>
          </div>
          <p className="text-[26px] font-normal tracking-[-0.048em]">
            얼굴을 인식하는 중입니다...
          </p>
        </div>
      </div>
    </div>
  );
}

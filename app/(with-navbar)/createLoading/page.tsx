import Image from "next/image";
import { PulseLoader } from "react-spinners";

export default function CreatingLoader() {
  return (
    <div className="flex min-h-screen justify-center bg-sub-color">
      <div className="bg-[rgba(255,254,246,0.85)] w-[898px] h-[582px] rounded-[30px] mt-[143px] text-text-brown font-nanum leading-normal">
        <div className="w-full flex flex-col text-center mt-[67px]">
          {/*로딩 스피닝 - 작동안되는데 나중에 손보기*/}
          <div className="flex justify-center mb-[25px]">
            <PulseLoader color="#6C3401" size={12} loading={true} />
          </div>
          <p className="text-[38px] font-extrabold tracking-[-0.071em] mb-[48px]">
            동화 생성 중
          </p>
          <div className="flex justify-center">
            <div className="mb-[50px] flex flex-row w-full justify-center h-[223px]">
              <Image
                src={"/icons/create-loading-princess.svg"}
                alt="공주 로딩 이미지"
                width={150}
                height={185}
                className="animate-bounce-motion"
              />
              <Image
                src={"/icons/create-loading-prince.svg"}
                alt="왕자 로딩 이미지"
                width={120}
                height={175}
                className="animate-bounce-motion"
              />
            </div>
          </div>
          <p className="text-[26px] font-normal tracking-[-0.048em]">
            동화를 생성하는 중입니다...
          </p>
        </div>
      </div>
    </div>
  );
}

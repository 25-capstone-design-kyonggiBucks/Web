import Image from "next/image";
import Link from "next/link";
import MainButton from "../components/MainButton";

export default function Landing() {
  return (
    <div className="font-nanum flex flex-col items-center justify-center min-h-screen w-full leading-normal text-text-brown bg-sub-color">
      {/* <div className="bg-main-color text-[39.3px] font-extrabold px-[120px] py-[54px]">
        나나랜드 (나만의 나라!)
      </div> */}

      <Image src="/images/logo.png" alt="close" width={684} height={286} />
      <p className="text-[26px] font-normal tracking-[-0.78px] pt-[26px] pb-[175px]">
        동화 속 이야기의 주인공이 되어보세요!
      </p>
      <Link href="/login">
        <MainButton type="button">시작하기</MainButton>
      </Link>
    </div>
  );
}

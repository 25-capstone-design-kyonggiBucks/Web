import Link from "next/link";
import MainButton from "../../components/MainButton";

export default function SignupPage() {
  return (
    <div className="font-nanum flex flex-col items-center justify-center min-h-screen w-full leading-normal text-text-brown">
      <div className="bg-main-color text-[39.3px] font-extrabold px-[120px] py-[54px]">
        프로젝트 제목
      </div>
      <p className="text-[26px] font-normal tracking-[-0.78px] pt-[26px] pb-[129px]">
        동화 속 이야기의 주인공이 되어보세요!
      </p>

      <form className="flex flex-col items-center mb-[162px] text-[20px]">
        <input
          type="text"
          placeholder="아이디"
          className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-tl-[30px] rounded-tr-[30px]"
        />
        <div className="w-[608px] h-[1.5px] bg-[rgba(108,52,1,0.25)]" />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45]"
        />
        <div className="w-[608px] h-[1.5px] bg-[rgba(108,52,1,0.25)]" />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="w-[608px] h-[77px] pl-[34.3px] bg-sub-color outline-none placeholder:text-text-brown placeholder:opacity-[0.45] rounded-bl-[30px] rounded-br-[30px]"
        />
      </form>
      <Link href="/login">
        <MainButton type="submit">회원가입</MainButton>
      </Link>
      <div className="flex mt-[36.37px] text-[32px] leading-normal tracking-[-0.96px] gap-[28px]">
        <p className="font-normal">이미 회원이신가요?</p>
        <Link href="/login" className="font-bold">
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
}

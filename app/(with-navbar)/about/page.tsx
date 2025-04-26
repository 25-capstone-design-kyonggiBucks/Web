import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sub-color font-nanum text-text-brown leading-normal px-[296px] pb-[131px]">
      <section className="pt-[125px] mb-[114px]">
        <h1 className="text-[38px] font-extrabold tracking-[-0.071em] mb-[7px]">
          서비스 소개
        </h1>
        <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full mb-[32px]" />
        <p className="text-[26px] leading-relaxed mb-[114px]">
          이 서비스는 부모의 동화책 읽기에 대한 부담을 덜어주고자 자녀에게
          독서를 장려할 수 있는 솔루션을 제공하고자 하였습니다. 아이들이 직접
          콘텐츠의 주인공이 되면서, 단순히 영상을 시청하는 것 이상의 몰입감을
          제공하여 재미와 교육을 동시에 추구하기 위해 추진하였으며, 콘텐츠에
          대한 흥미를 높이고, 개인화된 경험을 함으로써 부모와 아이 모두에게
          긍정적인 경험 제공합니다.
        </p>
      </section>
      <section className="mb-[92px]">
        <h1 className="text-[38px] font-extrabold tracking-[-0.071em] mb-[7px]">
          개발진
        </h1>
        <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full mb-[32px]" />
        <div className="grid grid-cols-3 gap-x-[38px] gap-y-[32px]">
          {[
            {
              name: "최수인",
              part: "WEB",
              github: " http://github.com/username",
            },
            {
              name: "김우현",
              part: "AI",
              github: " http://github.com/username",
            },
            {
              name: "강서연",
              part: "AI",
              github: " http://github.com/username",
            },
            {
              name: "이찬영",
              part: "행정",
              github: " http://github.com/username",
            },
            {
              name: "안현준",
              part: "BE",
              github: " http://github.com/username",
            },
            {
              name: "변주형",
              part: "BE",
              github: " http://github.com/username",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-[30px] bg-[rgba(255,254,246,0.85)] shadow-[inset_0px_4px_10px_rgba(108,52,1,0.15),_0px_4px_4px_rgba(108,52,1,0.25)] p-[23px] flex flex-col items-center justify-between"
            >
              <div className="flex justify-between w-full">
                <p>
                  <span className="text-[26px] font-extrabold tracking-[-0.048em]">
                    {member.name} ・{" "}
                  </span>
                  <span className="text-[22px] font-normal tracking-[-0.041em]">
                    {member.part}
                  </span>
                </p>
                <Image
                  src="/icons/about-githubIcon.svg"
                  alt="GitHub"
                  width={55}
                  height={55}
                />
              </div>
              <div className="flex w-full justify-end mt-[9px]">
                <a
                  href={member.github}
                  target="_blank"
                  className="text-[18px] font-normal tracking-[-0.54px] underline decoration-solid decoration-1 underline-offset-auto"
                >
                  {member.github}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-[38px] font-extrabold tracking-[-0.071em] mb-[7px]">
          도움을 주신 기업
        </h1>
        <hr className="border-t-[2px] border-text-brown opacity-[0.45] w-full mb-[32px]" />
        <div className="text-[26px] font-normal leading-normal tracking-[-0.78px]">
          모바일앱개발협동조합
        </div>
      </section>
    </div>
  );
}

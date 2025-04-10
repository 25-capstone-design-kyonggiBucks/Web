import Link from "next/link";

export default function Landing() {
  return (
    <div className="font-nanum flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className=" text-4xl font-bold">프로젝트 제목</h1>
      <p className="mt-4 text-lg text-gray-600">
        이 프로젝트는 사용자와 관리자를 구분하여 웹 애플리케이션을 제공합니다.
      </p>
      <Link href="/login">
        <button className="mt-6 px-6 py-2 bg-main-color text-text-brown rounded-lg hover:bg-blue-600">
          시작하기
        </button>
      </Link>
    </div>
  );
}

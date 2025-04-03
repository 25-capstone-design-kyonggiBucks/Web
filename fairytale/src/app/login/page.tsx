export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">프로젝트 제목</h1>
        <p className="text-center text-gray-600 mb-6">
          간단한 설명을 여기에 적어주세요.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            회원가입하러 가기
          </a>
        </p>
      </div>
    </div>
  );
}

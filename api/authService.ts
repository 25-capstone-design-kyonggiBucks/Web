import api from "./axios";
import axios from "axios";

export interface LoginResult {
  loginId: string;
  accessToken: string;
}

export async function loginUser(
  loginId: string,
  password: string
): Promise<LoginResult> {
  try {
    const res = await api.post("/api/user/token", { loginId, password });
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400) {
        throw new Error("아이디와 비밀번호를 모두 입력해주세요.");
      } else if (status === 401) {
        throw new Error("자격 증명에 실패하였습니다.");
      }
    }
    throw new Error("로그인 중 알 수 없는 오류가 발생했습니다.");
  }
}

export async function signupUser(
  loginId: string,
  password: string,
  confirmPassword: string
): Promise<void> {
  try {
    await api.post("/api/user", { loginId, password, confirmPassword });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const serverMsg = error.response?.data?.message as string | undefined;

      if (status === 400) {
        throw new Error("아이디와 비밀번호를 모두 입력해주세요.");
      }
      if (status === 409) {
        throw new Error(
          serverMsg ?? "이미 아이디가 존재하거나 비밀번호가 일치하지 않습니다."
        );
      }
    }
    throw new Error("회원가입 중 알 수 없는 오류가 발생했습니다.");
  }
}

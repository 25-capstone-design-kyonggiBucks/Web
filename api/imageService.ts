import api from "./axios";
import axios from "axios";

export type ExpressionType =
  | "NEUTRAL"
  | "HAPPY"
  | "SAD"
  | "ANGRY"
  | "SURPRISED";

/**
 * 표정 이미지 업로드
 * @param imageBlob - 촬영된 사진 Blob
 * @param expression - 표정 유형
 */
export async function uploadExpressionImage(
  imageBlob: Blob,
  expression: ExpressionType
): Promise<void> {
  const formData = new FormData();
  formData.append("image", imageBlob, `${expression}.png`);
  formData.append("expression", expression);

  try {
    await api.post("/api/user/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const msg =
        error.response?.data?.message ??
        "이미지 업로드 중 서버 에러가 발생했습니다.";
      throw new Error(msg);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

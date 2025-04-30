import api from "./axios";
import axios from "axios";

export type Expression = "HAPPY" | "SAD" | "SURPRISED" | "ANGRY";

export async function uploadImage(
  imageDataUrl: string,
  expression: Expression
) {
  try {
    const blob = await (await fetch(imageDataUrl)).blob();
    const file = new File([blob], `${expression}.jpeg`, { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    formData.append("expression", expression);

    const response = await api.post("/api/user/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "이미지 업로드 실패:",
        error.response?.data || error.message
      );
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw error;
  }
}

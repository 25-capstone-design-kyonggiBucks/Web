import type { Expression } from "@/api/uploadImage";
import api from "./axios";

export interface UserImage {
  imageId: number;
  expression: Expression;
  url: string;
}

export async function getUserImages(): Promise<UserImage[]> {
  try {
    const res = await api.get("/api/user/images");
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    const list = (res.data.data || []) as {
      imageId: number;
      expression: Expression;
      imagePath: string;
    }[];

    return list.map(({ imageId, expression, imagePath }) => ({
      imageId,
      expression,
      url: `${base}${imagePath}`,
    }));
  } catch (error) {
    console.error("이미지 조회 실패:", error);
    throw error;
  }
}

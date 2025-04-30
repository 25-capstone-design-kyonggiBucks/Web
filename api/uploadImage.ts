import api from "./axios";
export type Expression = "HAPPY" | "SAD" | "SURPRISED" | "ANGRY";

async function createImageFile(
  imageDataUrl: string,
  expression: Expression
): Promise<FormData> {
  const blob = await (await fetch(imageDataUrl)).blob();
  const file = new File([blob], `${expression}.jpeg`, { type: "image/jpeg" });

  const formData = new FormData();
  formData.append("image", file);
  formData.append("expression", expression);
  return formData;
}

//이미지 업로드
export async function uploadImage(
  imageDataUrl: string,
  expression: Expression
) {
  try {
    const formData = await createImageFile(imageDataUrl, expression);

    const response = await api.post("/api/user/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
}

//이미지 수정
export async function updateImage(
  imageDataUrl: string,
  expression: Expression
) {
  try {
    const formData = await createImageFile(imageDataUrl, expression);

    const response = await api.put("/api/user/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("이미지 수정 실패:", error);
    throw error;
  }
}

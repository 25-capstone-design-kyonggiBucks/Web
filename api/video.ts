import api from "./axios";

export const getBasicVideo = async (bookId: number) => {
  const accessToken = sessionStorage.getItem("accessToken");

  const res = await api.get(`/api/video/${bookId}/stream/default`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Range: "bytes=0-",
    },
    responseType: "blob",
  });

  const videoBlob = new Blob([res.data], { type: "video/mp4" });
  const videoUrl = URL.createObjectURL(videoBlob);

  return videoUrl;
};

export const postCustomVideo = async (bookId: number) => {
  try {
    const response = await api.post(`/api/video/${bookId}/custom`, {
      voice: "DEFAULT",
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("커스텀 영상 생성 실패:", error.message);
      throw new Error(error.message);
    } else {
      console.error("커스텀 영상 생성 실패: 알 수 없는 에러", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

export const getCustomVideo = async (bookId: number) => {
  const accessToken = sessionStorage.getItem("accessToken");

  const res = await api.get(
    `/api/video/${bookId}/stream/custom?voice=DEFAULT`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Range: "bytes=0-",
      },
      responseType: "blob",
    }
  );

  const videoBlob = new Blob([res.data], { type: "video/mp4" });
  const videoUrl = URL.createObjectURL(videoBlob);

  return videoUrl;
};

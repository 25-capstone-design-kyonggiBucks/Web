import api from "./axios";

export const getBasicVedio = async (bookId: number) => {
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

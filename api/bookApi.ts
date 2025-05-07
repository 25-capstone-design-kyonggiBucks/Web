import api from "./axios";

export const addBook = async (formData: FormData) => {
  try {
    const response = await api.post("/api/admin/books", formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("도서 추가 실패:", error.message);
      throw new Error(error.message);
    } else {
      console.error("도서 추가 실패: 알 수 없는 에러", error);
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

export const updateBook = async (book: {
  bookId: number;
  title: string;
  summary: string;
}) => {
  try {
    const response = await api.put("/api/admin/books", book);
    return response.data;
  } catch (error) {
    console.error("도서 수정 실패:", error);
    throw error;
  }
};

export const getBooksByType = async (bookType: "FOLKTALE" | "CLASSIC") => {
  const response = await api.get("/api/books", {
    params: { type: bookType },
  });
  return response.data.data;
};

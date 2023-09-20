import { backendRequest } from "./request";

export const getQuizzes = async (searchParam?: string, pageParam: number = 1, perPage: number = 10) => {
  try {
    let url = "quizzes";
    if (searchParam) {
      url += `?search=${searchParam}&page=${pageParam}&per_page=${perPage}`;
    }
    const response = await backendRequest(url, "GET", false);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

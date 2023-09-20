import { backendRequest } from "./request";

export const getQuizzes = async (searchParam?: string) => {
  try {
    let url = "quizzes";
    if (searchParam) {
      url += `?search=${searchParam}`;
    }
    const response = await backendRequest(url, "GET", false);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

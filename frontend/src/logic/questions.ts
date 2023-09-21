import { backendRequest } from "./request";

export const getQuestionsForQuiz = async (quizId: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/questions`,
      "GET",
      true,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (quizId: number, text: string) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/questions`,
      "POST",
      true,
      { text },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

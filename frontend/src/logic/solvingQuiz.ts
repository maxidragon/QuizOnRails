import { backendRequest } from "./request";

export const startQuiz = async (quizId: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/start`,
      "GET",
      true,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getInfo = async (quizId: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/info`,
      "GET",
      true,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const submitAnswer = async (quiz_id: number, answer_id: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quiz_id}/submit`,
      "POST",
      true,
      {
        answer_id: answer_id,
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

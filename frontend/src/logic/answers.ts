import { backendRequest } from "./request";

export const createAnswer = async (
  quizId: number,
  question_id: number,
  text: string,
  is_correct: boolean
) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/questions/${question_id}/answers`,
      "POST",
      true,
      { text, is_correct, question_id }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const editAnswer = async (
  quizId: number,
  question_id: number,
  answer_id: number,
  text: string,
  is_correct: boolean
) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/questions/${question_id}/answers/${answer_id}`,
      "PUT",
      true,
      { text, is_correct, question_id }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

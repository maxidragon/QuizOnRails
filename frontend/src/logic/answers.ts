import { Answer } from "./interfaces";
import { backendRequest } from "./request";

export const createAnswer = async (
  quizId: number,
  question_id: number,
  text: string,
  is_correct: boolean,
) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/questions/${question_id}/answers`,
      "POST",
      true,
      { text, is_correct, question_id },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const editAnswer = async (answer: Answer, quizId: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quizId}/questions/${answer.question_id}/answers/${answer.id}`,
      "PUT",
      true,
      answer,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (
  quiz_id: number,
  question_id: number,
  answer_id: number,
) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quiz_id}/questions/${question_id}/answers/${answer_id}`,
      "DELETE",
      true,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

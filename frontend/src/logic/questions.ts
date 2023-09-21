import { Question } from "./interfaces";
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

export const editQuestion = async (question: Question) => {
  try {
    const response = await backendRequest(
      `/quizzes/${question.quiz_id}/questions/${question.id}`,
      "PUT",
      true,
      question,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (quiz_id: number, question_id: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quiz_id}/questions/${question_id}`,
      "DELETE",
      true,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

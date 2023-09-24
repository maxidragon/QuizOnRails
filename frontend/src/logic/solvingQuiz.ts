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

export const getAnswers = async (quiz_id: number) => {
  try {
    const response = await backendRequest(
      `/quizzes/${quiz_id}/answers`,
      "GET",
      true,
    );
    const data = await response.json();
    const newData = data.map(
      (a: {
        id: number;
        quiz_attempt_id: number;
        answer_id: number;
        created_at: string;
        updated_at: string;
        answer: {
          id: number;
          question_id: number;
        };
      }) => {
        return {
          answer_id: a.answer_id,
          question_id: a.answer.question_id,
        };
      },
    );
    return newData;
  } catch (error) {
    console.log(error);
  }
};

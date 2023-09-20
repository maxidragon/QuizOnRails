import { Quiz } from "./interfaces";
import { backendRequest } from "./request";

export const getQuizzes = async (
  searchParam?: string,
  pageParam: number = 1,
  perPage: number = 10,
) => {
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

export const createQuiz = async (name: string, description: string) => {
  try {
    
    const response = await backendRequest("quizzes", "POST", true, {
      name,
      description,
      is_public: null,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getQuiz = async (id: number) => {
  try {
    const response = await backendRequest(`quizzes/${id}`, "GET", true);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateQuiz = async (quiz: Quiz) => {
  try {
    if (!quiz.is_public) {
      quiz.is_public = false;
    }
    const response = await backendRequest(`quizzes/${quiz.id}`, "PUT", true, quiz);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuiz = async (id: number) => {
  try {
    const response = await backendRequest(`quizzes/${id}`, "DELETE", true);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


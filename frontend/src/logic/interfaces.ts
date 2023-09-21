export interface Quiz {
  id: number;
  name: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  quiz_id: number;
  text: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  is_correct: boolean;
  question_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserAnswer {
  id: number;
  questionId: number;
  answerId: number;
}

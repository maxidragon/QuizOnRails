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
  question: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  answer: string;
  isCorrect: boolean;
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

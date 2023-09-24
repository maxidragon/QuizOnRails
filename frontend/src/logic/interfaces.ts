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

export interface PublicAnswer {
  id: number;
  text: string;
  question_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface PlayQuiz {
  id: number;
  user_id: number;
  quiz_id: number;
  created_at: string;
  updated_at: string;
  questions: PlayQuestion[];
}

export interface PlayQuestion {
  id: number;
  text: string;
  question_id: number;
  created_at: string;
  updated_at: string;
  answers: PublicAnswer[];
}

export interface PlayAnswer {
  question_id: number;
  answer_id: number;
}

export interface QuizResult {
  score: number;
  quiz: Quiz;
}

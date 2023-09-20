export interface Quiz {
    id: number;
    name: string;
    description: string;
    questions: Question[];
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
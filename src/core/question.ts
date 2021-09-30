// import { Category, Difficulty, QuestionType } from "./quiz";

interface Question {
    category: string;
    correctAnswer: string;
    difficulty: string;
    incorrectAnswers: string[];
    question: string;
    type: string;
}

export type { Question };

import { Country } from './flagData';

export type QuestionType = 'flag-to-country' | 'country-to-flag';

export interface GameQuestion {
    id: string;
    type: QuestionType;
    correctAnswer: Country;
    options: Country[];
    answered?: boolean;
    selectedAnswer?: Country;
    isCorrect?: boolean;
}

export interface GameState {
    currentQuestionIndex: number;
    questions: GameQuestion[];
    score: number;
    totalQuestions: number;
    gameStarted: boolean;
    gameCompleted: boolean;
    difficulty: Country['difficulty'];
    timeStarted?: Date;
    timeCompleted?: Date;
}

export interface GameStats {
    totalGamesPlayed: number;
    totalCorrectAnswers: number;
    totalQuestions: number;
    averageScore: number;
    bestScore: number;
    favoriteRegion?: string;
}

export const INITIAL_GAME_STATE: GameState = {
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    totalQuestions: 10,
    gameStarted: false,
    gameCompleted: false,
    difficulty: 'easy',
};

export const QUESTIONS_PER_GAME = 10;
export const OPTIONS_PER_QUESTION = 4; 
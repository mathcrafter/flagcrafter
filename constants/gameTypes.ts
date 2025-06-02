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

export interface GameSettings {
    difficulty: Country['difficulty'];
    selectedRegions: string[];
    numberOfQuestions: number;
}

export interface GameState {
    currentQuestionIndex: number;
    questions: GameQuestion[];
    score: number;
    totalQuestions: number;
    gameStarted: boolean;
    gameCompleted: boolean;
    difficulty: Country['difficulty'];
    selectedRegions: string[];
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
    totalQuestions: 20,
    gameStarted: false,
    gameCompleted: false,
    difficulty: 'easy',
    selectedRegions: [],
};

export const DEFAULT_QUESTIONS_PER_GAME = 20;
export const OPTIONS_PER_QUESTION = 4;

// Available regions for selection
export const AVAILABLE_REGIONS = [
    'North America',
    'South America',
    'Central America',
    'Caribbean',
    'Europe',
    'Asia',
    'Africa',
    'Oceania',
    'Antarctica'
];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30]; 
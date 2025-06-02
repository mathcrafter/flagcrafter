import { Country, getRandomCountries } from '@/constants/flagData';
import {
    GameQuestion,
    GameState,
    INITIAL_GAME_STATE,
    OPTIONS_PER_QUESTION,
    QUESTIONS_PER_GAME,
    QuestionType,
} from '@/constants/gameTypes';
import { useCallback, useMemo, useState } from 'react';

export function useGameLogic() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

    const generateQuestion = useCallback((
        countries: Country[],
        type: QuestionType,
        questionId: string
    ): GameQuestion => {
        // Pick a random correct answer
        const correctAnswer = countries[Math.floor(Math.random() * countries.length)];

        // Get wrong answers from the same difficulty or mix of difficulties
        const otherCountries = countries.filter(c => c.id !== correctAnswer.id);
        const wrongAnswers = otherCountries
            .sort(() => Math.random() - 0.5)
            .slice(0, OPTIONS_PER_QUESTION - 1);

        // Combine and shuffle all options
        const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

        return {
            id: questionId,
            type,
            correctAnswer,
            options,
        };
    }, []);

    const startGame = useCallback((difficulty: Country['difficulty'] = 'easy') => {
        const countries = getRandomCountries(30, difficulty); // Get more countries for variety
        const questions: GameQuestion[] = [];

        for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
            const questionType: QuestionType = Math.random() > 0.5 ? 'flag-to-country' : 'country-to-flag';
            const question = generateQuestion(countries, questionType, `q-${i}`);
            questions.push(question);
        }

        setGameState({
            ...INITIAL_GAME_STATE,
            questions,
            difficulty,
            gameStarted: true,
            totalQuestions: QUESTIONS_PER_GAME,
            timeStarted: new Date(),
        });
    }, [generateQuestion]);

    const answerQuestion = useCallback((selectedAnswer: Country) => {
        setGameState(prev => {
            const currentQuestion = prev.questions[prev.currentQuestionIndex];
            if (!currentQuestion || currentQuestion.answered) {
                return prev; // Question already answered
            }

            const isCorrect = selectedAnswer.id === currentQuestion.correctAnswer.id;
            const updatedQuestions = [...prev.questions];
            updatedQuestions[prev.currentQuestionIndex] = {
                ...currentQuestion,
                answered: true,
                selectedAnswer,
                isCorrect,
            };

            const newScore = prev.score + (isCorrect ? 1 : 0);
            const isLastQuestion = prev.currentQuestionIndex === prev.totalQuestions - 1;

            return {
                ...prev,
                questions: updatedQuestions,
                score: newScore,
                gameCompleted: isLastQuestion,
                timeCompleted: isLastQuestion ? new Date() : prev.timeCompleted,
            };
        });
    }, []);

    const nextQuestion = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.totalQuestions - 1),
        }));
    }, []);

    const resetGame = useCallback(() => {
        setGameState(INITIAL_GAME_STATE);
    }, []);

    const currentQuestion = useMemo(() => {
        return gameState.questions[gameState.currentQuestionIndex];
    }, [gameState.questions, gameState.currentQuestionIndex]);

    const progress = useMemo(() => {
        return (gameState.currentQuestionIndex + 1) / gameState.totalQuestions;
    }, [gameState.currentQuestionIndex, gameState.totalQuestions]);

    const scorePercentage = useMemo(() => {
        return gameState.totalQuestions > 0 ? (gameState.score / gameState.totalQuestions) * 100 : 0;
    }, [gameState.score, gameState.totalQuestions]);

    return {
        gameState,
        currentQuestion,
        progress,
        scorePercentage,
        startGame,
        answerQuestion,
        nextQuestion,
        resetGame,
    };
} 
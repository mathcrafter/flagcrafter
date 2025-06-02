import { Colors } from '@/constants/Colors';
import { Country } from '@/constants/flagData';
import { GameSettings } from '@/constants/gameTypes';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGameLogic } from '@/hooks/useGameLogic';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlagDisplay } from './FlagDisplay';
import { OptionButton } from './OptionButton';
import { ProgressBar } from './ProgressBar';

const { width, height } = Dimensions.get('window');

interface GameScreenProps {
    gameSettings: GameSettings;
    onGameComplete: (score: number, totalQuestions: number) => void;
    onRestart: () => void;
}

export function GameScreen({ gameSettings, onGameComplete, onRestart }: GameScreenProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const {
        gameState,
        currentQuestion,
        progress,
        startGame,
        answerQuestion,
        nextQuestion,
        restartGame,
    } = useGameLogic();

    const [selectedAnswer, setSelectedAnswer] = useState<Country | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        startGame(gameSettings);
    }, [gameSettings, startGame]);

    useEffect(() => {
        if (gameState.gameCompleted) {
            const timer = setTimeout(() => {
                onGameComplete(gameState.score, gameState.totalQuestions);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [gameState.gameCompleted, gameState.score, gameState.totalQuestions, onGameComplete]);

    const handleAnswerPress = (answer: Country) => {
        if (selectedAnswer || !currentQuestion) return;

        setSelectedAnswer(answer);
        setShowFeedback(true);
        answerQuestion(answer);

        // Move to next question after showing feedback
        const timer = setTimeout(() => {
            if (gameState.currentQuestionIndex < gameState.totalQuestions - 1) {
                nextQuestion();
                setSelectedAnswer(null);
                setShowFeedback(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    };

    const handleRestart = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        restartGame(gameSettings);
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    const handleBackToSettings = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onRestart();
    };

    if (!currentQuestion || !gameState.gameStarted) {
        return (
            <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <Animated.Text
                    entering={FadeIn.duration(500)}
                    style={[styles.loadingText, { color: colors.text }]}
                >
                    Loading game...
                </Animated.Text>
            </SafeAreaView>
        );
    }

    const questionNumber = gameState.currentQuestionIndex + 1;
    const isLastQuestion = questionNumber === gameState.totalQuestions;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Animated.View entering={FadeIn.duration(300)}>
                <ProgressBar progress={progress} />
            </Animated.View>

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Animated.Text
                        entering={SlideInRight.duration(400)}
                        style={[styles.questionCounter, { color: colors.text }]}
                    >
                        Question {questionNumber} of {gameState.totalQuestions}
                    </Animated.Text>
                    <Animated.Text
                        entering={SlideInRight.delay(100).duration(400)}
                        style={[styles.score, { color: colors.primary }]}
                    >
                        Score: {gameState.score}
                    </Animated.Text>
                </View>

                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        style={[styles.headerButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={handleRestart}
                    >
                        <Text style={[styles.headerButtonText, { color: colors.text }]}>
                            🔄
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.headerButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={handleBackToSettings}
                    >
                        <Text style={[styles.headerButtonText, { color: colors.text }]}>
                            ⚙️
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    key={currentQuestion.id}
                    entering={FadeIn.duration(500)}
                    exiting={FadeOut.duration(300)}
                    style={styles.questionContainer}
                >
                    {currentQuestion.type === 'flag-to-country' ? (
                        <>
                            <Animated.Text
                                entering={SlideInRight.delay(200).duration(400)}
                                style={[styles.questionText, { color: colors.text }]}
                            >
                                Which country does this flag belong to?
                            </Animated.Text>
                            <Animated.View
                                entering={FadeIn.delay(400).duration(500)}
                                style={styles.flagContainer}
                            >
                                <FlagDisplay country={currentQuestion.correctAnswer} size="large" />
                            </Animated.View>
                        </>
                    ) : (
                        <Animated.Text
                            entering={SlideInRight.delay(200).duration(400)}
                            style={[styles.questionText, { color: colors.text }]}
                        >
                            Which flag belongs to{'\n'}
                            <Text style={[styles.countryName, { color: colors.primary }]}>
                                {currentQuestion.correctAnswer.name}
                            </Text>
                            ?
                        </Animated.Text>
                    )}
                </Animated.View>

                <View style={[
                    styles.optionsContainer,
                    currentQuestion.type === 'country-to-flag' && styles.optionsContainerTwoColumn
                ]}>
                    {currentQuestion.options.map((option, index) => (
                        <OptionButton
                            key={option.id}
                            option={option}
                            index={index}
                            onPress={handleAnswerPress}
                            disabled={showFeedback}
                            isSelected={selectedAnswer?.id === option.id}
                            isCorrect={showFeedback && option.id === currentQuestion.correctAnswer.id}
                            isWrong={showFeedback && selectedAnswer?.id === option.id && option.id !== currentQuestion.correctAnswer.id}
                            showFlag={currentQuestion.type === 'country-to-flag'}
                            showText={currentQuestion.type !== 'country-to-flag'}
                            twoColumnLayout={currentQuestion.type === 'country-to-flag'}
                        />
                    ))}
                </View>

                {gameState.gameCompleted && (
                    <Animated.View
                        entering={FadeIn.delay(500).duration(500)}
                        style={styles.completionMessage}
                    >
                        <Text style={[styles.completionText, { color: colors.primary }]}>
                            🎉 Game Complete! 🎉
                        </Text>
                    </Animated.View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerLeft: {
        flex: 1,
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    headerButtonText: {
        fontSize: 16,
    },
    questionCounter: {
        fontSize: 16,
        fontWeight: '600',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        paddingBottom: 50,
    },
    questionContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    questionText: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 20,
    },
    countryName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    flagContainer: {
        marginTop: 10,
    },
    optionsContainer: {
        marginTop: 20,
    },
    optionsContainerTwoColumn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    completionMessage: {
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    completionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
}); 
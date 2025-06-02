import { FlagDisplay } from '@/components/game/FlagDisplay';
import { GameScreen } from '@/components/game/GameScreen';
import { Colors } from '@/constants/Colors';
import { COUNTRIES, Country } from '@/constants/flagData';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type GameState = 'home' | 'playing' | 'results';

interface GameResults {
  score: number;
  totalQuestions: number;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FlagCrafterHome() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [gameState, setGameState] = useState<GameState>('home');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Country['difficulty']>('easy');
  const [gameResults, setGameResults] = useState<GameResults | null>(null);

  const handleDifficultySelect = (difficulty: Country['difficulty']) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedDifficulty(difficulty);
  };

  const handleStartGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setGameState('playing');
  };

  const handleGameComplete = (score: number, totalQuestions: number) => {
    setGameResults({ score, totalQuestions });
    setGameState('results');
  };

  const handlePlayAgain = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameResults(null);
    setGameState('home');
  };

  const getDifficultyInfo = (difficulty: Country['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return { title: 'Easy', subtitle: 'Famous countries', emoji: '😊', color: colors.success };
      case 'medium':
        return { title: 'Medium', subtitle: 'Some tricky ones', emoji: '🤔', color: colors.warning };
      case 'hard':
        return { title: 'Hard', subtitle: 'Expert level', emoji: '🤓', color: colors.danger };
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { message: "Amazing! You're a flag expert! 🏆", emoji: "🎉" };
    if (percentage >= 70) return { message: "Great job! You know your flags! 👏", emoji: "🌟" };
    if (percentage >= 50) return { message: "Good work! Keep practicing! 💪", emoji: "👍" };
    return { message: "Nice try! You'll do better next time! 🙂", emoji: "💙" };
  };

  // Get sample countries from our data
  const sampleCountries = [
    COUNTRIES.find(c => c.id === 'us')!,
    COUNTRIES.find(c => c.id === 'jp')!,
    COUNTRIES.find(c => c.id === 'br')!,
  ];

  if (gameState === 'playing') {
    return (
      <GameScreen
        difficulty={selectedDifficulty}
        onGameComplete={handleGameComplete}
      />
    );
  }

  if (gameState === 'results' && gameResults) {
    const percentage = (gameResults.score / gameResults.totalQuestions) * 100;
    const scoreMessage = getScoreMessage(percentage);

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <Animated.View
            entering={BounceIn.delay(200).duration(800)}
            style={styles.resultsHeader}
          >
            <Text style={[styles.resultsTitle, { color: colors.primary }]}>
              Game Complete! {scoreMessage.emoji}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeIn.delay(400).duration(600)}
            style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.scoreText, { color: colors.text }]}>
              Your Score
            </Text>
            <Text style={[styles.scoreNumber, { color: colors.primary }]}>
              {gameResults.score} / {gameResults.totalQuestions}
            </Text>
            <Text style={[styles.percentageText, { color: colors.secondary }]}>
              {Math.round(percentage)}%
            </Text>
          </Animated.View>

          <Animated.Text
            entering={FadeIn.delay(600).duration(500)}
            style={[styles.messageText, { color: colors.text }]}
          >
            {scoreMessage.message}
          </Animated.Text>

          <Animated.View
            entering={SlideInDown.delay(800).duration(500)}
            style={styles.buttonContainer}
          >
            <AnimatedTouchableOpacity
              entering={FadeIn.delay(1000).duration(400)}
              style={[styles.playAgainButton, { backgroundColor: colors.primary }]}
              onPress={handlePlayAgain}
            >
              <Text style={[styles.buttonText, { color: colors.gameButtonText }]}>
                Play Again! 🎮
              </Text>
            </AnimatedTouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          entering={BounceIn.duration(800)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: colors.primary }]}>
            🌍 FlagCrafter 🏳️
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Learn flags from around the world!
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(200).duration(600)}
          style={styles.sampleFlags}
        >
          {sampleCountries.map((country, index) => (
            <FlagDisplay key={country.id} country={country} size="small" />
          ))}
        </Animated.View>

        <Animated.View
          entering={SlideInDown.delay(400).duration(600)}
          style={styles.difficultySection}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Choose Your Level
          </Text>

          {(['easy', 'medium', 'hard'] as const).map((difficulty, index) => {
            const info = getDifficultyInfo(difficulty);
            const isSelected = selectedDifficulty === difficulty;

            return (
              <AnimatedTouchableOpacity
                key={difficulty}
                entering={SlideInDown.delay(600 + index * 100).duration(400)}
                style={[
                  styles.difficultyButton,
                  {
                    backgroundColor: isSelected ? info.color : colors.card,
                    borderColor: info.color,
                  },
                ]}
                onPress={() => handleDifficultySelect(difficulty)}
              >
                <Text style={styles.difficultyEmoji}>{info.emoji}</Text>
                <View style={styles.difficultyInfo}>
                  <Text
                    style={[
                      styles.difficultyTitle,
                      { color: isSelected ? colors.gameButtonText : colors.text },
                    ]}
                  >
                    {info.title}
                  </Text>
                  <Text
                    style={[
                      styles.difficultySubtitle,
                      { color: isSelected ? colors.gameButtonText : colors.text },
                    ]}
                  >
                    {info.subtitle}
                  </Text>
                </View>
              </AnimatedTouchableOpacity>
            );
          })}
        </Animated.View>

        <AnimatedTouchableOpacity
          entering={BounceIn.delay(1000).duration(600)}
          style={[styles.startButton, { backgroundColor: colors.gameButton }]}
          onPress={handleStartGame}
        >
          <Text style={[styles.startButtonText, { color: colors.gameButtonText }]}>
            Start Learning! 🚀
          </Text>
        </AnimatedTouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  sampleFlags: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  difficultySection: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  difficultyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  difficultyEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  difficultyInfo: {
    flex: 1,
  },
  difficultyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  difficultySubtitle: {
    fontSize: 16,
    marginTop: 2,
  },
  startButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  resultsHeader: {
    marginBottom: 40,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreCard: {
    padding: 30,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  playAgainButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});

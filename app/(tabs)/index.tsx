import { FlagDisplay } from '@/components/game/FlagDisplay';
import { GameScreen } from '@/components/game/GameScreen';
import { GameSettingsComponent } from '@/components/game/GameSettings';
import { Colors } from '@/constants/Colors';
import { COUNTRIES } from '@/constants/flagData';
import { DEFAULT_QUESTIONS_PER_GAME, GameSettings } from '@/constants/gameTypes';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, FadeIn, SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type GameState = 'home' | 'settings' | 'playing' | 'results';

interface GameResults {
  score: number;
  totalQuestions: number;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FlagCrafterHome() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [gameState, setGameState] = useState<GameState>('home');
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    difficulty: 'easy',
    selectedRegions: [],
    numberOfQuestions: DEFAULT_QUESTIONS_PER_GAME,
  });
  const [gameResults, setGameResults] = useState<GameResults | null>(null);

  const handleStartGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setGameState('playing');
  };

  const handleShowSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameState('settings');
  };

  const handleBackToHome = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameState('home');
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

  const handleRestartFromGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameResults(null);
    setGameState('settings');
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
        gameSettings={gameSettings}
        onGameComplete={handleGameComplete}
        onRestart={handleRestartFromGame}
      />
    );
  }

  if (gameState === 'settings') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleBackToHome}
          >
            <Text style={[styles.backButtonText, { color: colors.text }]}>
              ← Back
            </Text>
          </TouchableOpacity>
          <Text style={[styles.settingsTitle, { color: colors.primary }]}>
            Game Settings
          </Text>
        </View>

        <GameSettingsComponent
          settings={gameSettings}
          onSettingsChange={setGameSettings}
        />

        <View style={styles.settingsFooter}>
          <AnimatedTouchableOpacity
            entering={BounceIn.delay(600).duration(600)}
            style={[styles.startButton, { backgroundColor: colors.gameButton }]}
            onPress={handleStartGame}
          >
            <Text style={[styles.startButtonText, { color: colors.gameButtonText }]}>
              Start Learning! 🚀
            </Text>
          </AnimatedTouchableOpacity>
        </View>
      </SafeAreaView>
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

  const getCurrentSettingsSummary = () => {
    const difficultyMap = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
    const regionText = gameSettings.selectedRegions.length === 0
      ? 'All regions'
      : `${gameSettings.selectedRegions.length} region${gameSettings.selectedRegions.length === 1 ? '' : 's'}`;

    return `${difficultyMap[gameSettings.difficulty]} • ${gameSettings.numberOfQuestions} questions • ${regionText}`;
  };

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
          style={styles.currentSettingsCard}
        >
          <Text style={[styles.currentSettingsTitle, { color: colors.text }]}>
            Current Settings
          </Text>
          <Text style={[styles.currentSettingsText, { color: colors.secondary }]}>
            {getCurrentSettingsSummary()}
          </Text>
        </Animated.View>

        <Animated.View
          entering={SlideInDown.delay(600).duration(500)}
          style={styles.buttonContainer}
        >
          <AnimatedTouchableOpacity
            entering={FadeIn.delay(800).duration(400)}
            style={[styles.settingsButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleShowSettings}
          >
            <Text style={[styles.settingsButtonText, { color: colors.text }]}>
              ⚙️ Customize Game
            </Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity
            entering={BounceIn.delay(1000).duration(600)}
            style={[styles.startButton, { backgroundColor: colors.gameButton }]}
            onPress={handleStartGame}
          >
            <Text style={[styles.startButtonText, { color: colors.gameButtonText }]}>
              Quick Start! 🚀
            </Text>
          </AnimatedTouchableOpacity>
        </Animated.View>
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
  currentSettingsCard: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  currentSettingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currentSettingsText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  settingsButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 20,
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
  settingsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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

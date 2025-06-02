import { Colors } from '@/constants/Colors';
import { Country } from '@/constants/flagData';
import { AVAILABLE_REGIONS, GameSettings, QUESTION_COUNT_OPTIONS } from '@/constants/gameTypes';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface GameSettingsProps {
    settings: GameSettings;
    onSettingsChange: (settings: GameSettings) => void;
}

export function GameSettingsComponent({ settings, onSettingsChange }: GameSettingsProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const handleDifficultyChange = (difficulty: Country['difficulty']) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onSettingsChange({
            ...settings,
            difficulty,
        });
    };

    const handleRegionToggle = (region: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        const newRegions = settings.selectedRegions.includes(region)
            ? settings.selectedRegions.filter(r => r !== region)
            : [...settings.selectedRegions, region];

        onSettingsChange({
            ...settings,
            selectedRegions: newRegions,
        });
    };

    const handleQuestionCountChange = (count: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onSettingsChange({
            ...settings,
            numberOfQuestions: count,
        });
    };

    const handleSelectAllRegions = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onSettingsChange({
            ...settings,
            selectedRegions: [...AVAILABLE_REGIONS],
        });
    };

    const handleClearAllRegions = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onSettingsChange({
            ...settings,
            selectedRegions: [],
        });
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

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Difficulty Selection Section */}
            <Animated.View
                entering={FadeIn.delay(50).duration(500)}
                style={styles.section}
            >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Difficulty Level
                </Text>
                <View style={styles.difficultyContainer}>
                    {(['easy', 'medium', 'hard'] as const).map((difficulty, index) => {
                        const info = getDifficultyInfo(difficulty);
                        const isSelected = settings.difficulty === difficulty;

                        return (
                            <AnimatedTouchableOpacity
                                key={difficulty}
                                entering={SlideInDown.delay(100 + index * 100).duration(400)}
                                style={[
                                    styles.difficultyButton,
                                    {
                                        backgroundColor: isSelected ? info.color : colors.card,
                                        borderColor: info.color,
                                    },
                                ]}
                                onPress={() => handleDifficultyChange(difficulty)}
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
                                            { color: isSelected ? colors.gameButtonText : colors.secondary },
                                        ]}
                                    >
                                        {info.subtitle}
                                    </Text>
                                </View>
                                {isSelected && (
                                    <Text style={[styles.checkmark, { color: colors.gameButtonText }]}>
                                        ✓
                                    </Text>
                                )}
                            </AnimatedTouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>

            {/* Question Count Section */}
            <Animated.View
                entering={FadeIn.delay(200).duration(500)}
                style={styles.section}
            >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Number of Questions
                </Text>
                <View style={styles.questionCountContainer}>
                    {QUESTION_COUNT_OPTIONS.map((count, index) => (
                        <AnimatedTouchableOpacity
                            key={count}
                            entering={SlideInDown.delay(300 + index * 50).duration(400)}
                            style={[
                                styles.questionCountButton,
                                {
                                    backgroundColor: settings.numberOfQuestions === count ? colors.primary : colors.card,
                                    borderColor: colors.border,
                                },
                            ]}
                            onPress={() => handleQuestionCountChange(count)}
                        >
                            <Text
                                style={[
                                    styles.questionCountText,
                                    {
                                        color: settings.numberOfQuestions === count ? colors.gameButtonText : colors.text,
                                        fontWeight: settings.numberOfQuestions === count ? 'bold' : '600',
                                    },
                                ]}
                            >
                                {count}
                            </Text>
                        </AnimatedTouchableOpacity>
                    ))}
                </View>
            </Animated.View>

            {/* Region Selection Section */}
            <Animated.View
                entering={FadeIn.delay(400).duration(500)}
                style={styles.section}
            >
                <View style={styles.regionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                        Select Regions
                    </Text>
                    <Text style={[styles.regionSubtitle, { color: colors.secondary }]}>
                        {settings.selectedRegions.length === 0
                            ? 'All regions will be included'
                            : `${settings.selectedRegions.length} region${settings.selectedRegions.length === 1 ? '' : 's'} selected`
                        }
                    </Text>
                </View>

                <View style={styles.regionControlButtons}>
                    <TouchableOpacity
                        style={[styles.controlButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={handleSelectAllRegions}
                    >
                        <Text style={[styles.controlButtonText, { color: colors.text }]}>
                            Select All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.controlButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={handleClearAllRegions}
                    >
                        <Text style={[styles.controlButtonText, { color: colors.text }]}>
                            Clear All
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.regionsContainer}>
                    {AVAILABLE_REGIONS.map((region, index) => {
                        const isSelected = settings.selectedRegions.includes(region);
                        return (
                            <AnimatedTouchableOpacity
                                key={region}
                                entering={SlideInDown.delay(500 + index * 50).duration(400)}
                                style={[
                                    styles.regionButton,
                                    {
                                        backgroundColor: isSelected ? colors.primary : colors.card,
                                        borderColor: isSelected ? colors.primary : colors.border,
                                    },
                                ]}
                                onPress={() => handleRegionToggle(region)}
                            >
                                <Text
                                    style={[
                                        styles.regionButtonText,
                                        {
                                            color: isSelected ? colors.gameButtonText : colors.text,
                                            fontWeight: isSelected ? 'bold' : '600',
                                        },
                                    ]}
                                >
                                    {region}
                                    {isSelected && ' ✓'}
                                </Text>
                            </AnimatedTouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    difficultyContainer: {
        gap: 12,
    },
    difficultyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
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
        fontSize: 28,
        marginRight: 16,
    },
    difficultyInfo: {
        flex: 1,
    },
    difficultyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    difficultySubtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    checkmark: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    regionHeader: {
        marginBottom: 16,
    },
    regionSubtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    questionCountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    questionCountButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 60,
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
    questionCountText: {
        fontSize: 16,
    },
    regionControlButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    controlButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    controlButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    regionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    regionButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    regionButtonText: {
        fontSize: 14,
    },
}); 
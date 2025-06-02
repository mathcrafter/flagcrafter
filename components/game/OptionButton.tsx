import { Colors } from '@/constants/Colors';
import { Country } from '@/constants/flagData';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, SlideInLeft, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { FlagDisplay } from './FlagDisplay';

const { width } = Dimensions.get('window');

interface OptionButtonProps {
    option: Country;
    index: number;
    onPress: (option: Country) => void;
    disabled?: boolean;
    isSelected?: boolean;
    isCorrect?: boolean;
    isWrong?: boolean;
    showFlag?: boolean; // For country-to-flag questions
    showText?: boolean; // For controlling whether to show country name
    twoColumnLayout?: boolean; // For two-column layout in country-to-flag
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function OptionButton({
    option,
    index,
    onPress,
    disabled = false,
    isSelected = false,
    isCorrect = false,
    isWrong = false,
    showFlag = false,
    showText = true,
    twoColumnLayout = false,
}: OptionButtonProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const scale = useSharedValue(1);

    const handlePress = () => {
        if (disabled) return;

        // Haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Scale animation
        scale.value = withSequence(
            withTiming(0.95, { duration: 100 }),
            withTiming(1, { duration: 100 })
        );

        onPress(option);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const getButtonStyle = () => {
        if (isCorrect) {
            return {
                backgroundColor: colors.success,
                borderColor: colors.success,
            };
        }
        if (isWrong) {
            return {
                backgroundColor: colors.danger,
                borderColor: colors.danger,
            };
        }
        if (isSelected) {
            return {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
            };
        }
        return {
            backgroundColor: colors.card,
            borderColor: colors.border,
        };
    };

    const getTextColor = () => {
        if (isCorrect || isWrong || isSelected) {
            return colors.gameButtonText;
        }
        return colors.text;
    };

    return (
        <AnimatedTouchableOpacity
            entering={SlideInLeft.delay(index * 100).duration(400).springify()}
            style={[
                animatedStyle,
                twoColumnLayout ? styles.containerTwoColumn : styles.container,
                getButtonStyle()
            ]}
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {showFlag && (
                <Animated.View
                    entering={FadeIn.delay(index * 100 + 200)}
                    style={[styles.flagContainer, !showText && styles.flagContainerCentered]}
                >
                    <FlagDisplay country={option} size="medium" showBorder={false} />
                </Animated.View>
            )}
            {showText && (
                <Animated.Text
                    entering={FadeIn.delay(index * 100 + 300)}
                    style={[styles.text, { color: getTextColor() }]}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                >
                    {option.name}
                </Animated.Text>
            )}
            {isCorrect && (
                <Animated.Text
                    entering={FadeIn.delay(500)}
                    style={styles.checkmark}
                >
                    ✓
                </Animated.Text>
            )}
            {isWrong && (
                <Animated.Text
                    entering={FadeIn.delay(500)}
                    style={styles.crossmark}
                >
                    ✗
                </Animated.Text>
            )}
        </AnimatedTouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 16,
        borderWidth: 2,
        minHeight: 70,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    containerTwoColumn: {
        width: '45%',
        marginHorizontal: 8,
        marginVertical: 12,
        paddingVertical: 20,
        paddingHorizontal: 16,
        minHeight: 120,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
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
    flagContainer: {
        marginRight: 12,
    },
    flagContainerCentered: {
        marginRight: 0,
        flex: 1,
        alignItems: 'center',
    },
    text: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    checkmark: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    crossmark: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
    },
}); 
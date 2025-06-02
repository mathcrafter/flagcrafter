import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ProgressBarProps {
    progress: number; // 0 to 1
    height?: number;
    showPercentage?: boolean;
}

export function ProgressBar({ progress, height = 8, showPercentage = false }: ProgressBarProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const animatedProgress = useSharedValue(0);

    // Update the animated progress when progress prop changes
    React.useEffect(() => {
        animatedProgress.value = withTiming(progress, { duration: 500 });
    }, [progress, animatedProgress]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${animatedProgress.value * 100}%`,
        };
    });

    const containerWidth = width - 40; // Account for margins

    return (
        <View style={[styles.container, { paddingHorizontal: 20 }]}>
            <View
                style={[
                    styles.track,
                    {
                        height,
                        backgroundColor: colors.border,
                        width: containerWidth,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.fill,
                        animatedStyle,
                        {
                            height,
                            backgroundColor: colors.primary,
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    track: {
        borderRadius: 100,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
}); 
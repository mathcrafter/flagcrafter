import { Colors } from '@/constants/Colors';
import { Country } from '@/constants/flagData';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

interface FlagDisplayProps {
    country: Country;
    size?: 'small' | 'medium' | 'large';
    showBorder?: boolean;
}

export function FlagDisplay({ country, size = 'medium', showBorder = true }: FlagDisplayProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { width: 60, height: 40 };
            case 'large':
                return { width: 200, height: 133 };
            case 'medium':
            default:
                return { width: 120, height: 80 };
        }
    };

    const sizeStyles = getSizeStyles();

    return (
        <Animated.View
            entering={ZoomIn.duration(500).springify()}
            style={[
                styles.container,
                {
                    width: sizeStyles.width,
                    height: sizeStyles.height,
                    borderColor: showBorder ? colors.border : 'transparent',
                    backgroundColor: colors.card,
                },
            ]}
        >
            <Animated.View
                entering={FadeIn.delay(200).duration(300)}
                style={styles.imageContainer}
            >
                <Image
                    source={country.flag}
                    style={[styles.flagImage, sizeStyles]}
                    contentFit="contain"
                    transition={200}
                />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flagImage: {
        borderRadius: 8,
    },
}); 
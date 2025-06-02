/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FF6B6B'; // Bright coral red
const tintColorDark = '#FFB3BA'; // Soft pink

export const Colors = {
  light: {
    text: '#2C3E50',
    background: '#FFF8DC', // Warm cream
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#FF6B6B', // Bright coral red
    secondary: '#4ECDC4', // Turquoise
    accent: '#FFE66D', // Sunny yellow
    success: '#95E1D3', // Mint green
    warning: '#FFB3BA', // Soft pink
    danger: '#FF8A80', // Light red
    card: '#FFFFFF',
    border: '#E8E8E8',
    gameButton: '#6C5CE7', // Purple
    gameButtonText: '#FFFFFF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#2C3E50',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#FFB3BA', // Soft pink
    secondary: '#74B9FF', // Sky blue
    accent: '#FDCB6E', // Golden yellow
    success: '#6C5CE7', // Purple
    warning: '#FD79A8', // Pink
    danger: '#E17055', // Orange-red
    card: '#34495E',
    border: '#4A5568',
    gameButton: '#A29BFE', // Light purple
    gameButtonText: '#2C3E50',
  },
};

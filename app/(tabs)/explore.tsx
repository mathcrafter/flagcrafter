import { FlagDisplay } from '@/components/game/FlagDisplay';
import { Colors } from '@/constants/Colors';
import { COUNTRIES, Country, getAvailableRegions } from '@/constants/flagData';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const dynamicRegions = getAvailableRegions();
  const regions = ['all', ...dynamicRegions];

  const filteredCountries = selectedRegion === 'all'
    ? COUNTRIES
    : COUNTRIES.filter(country => country.region === selectedRegion);

  const getFlagStats = () => {
    const totalFlags = COUNTRIES.length;
    const regionCounts = dynamicRegions.reduce((acc, region) => {
      acc[region] = COUNTRIES.filter(c => c.region === region).length;
      return acc;
    }, {} as Record<string, number>);

    return { totalFlags, regionCounts };
  };

  const { totalFlags, regionCounts } = getFlagStats();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeIn.duration(600)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: colors.primary }]}>
            🌍 Explore Flags
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Discover flags from around the world!
          </Text>
        </Animated.View>

        <Animated.View
          entering={SlideInRight.delay(200).duration(500)}
          style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Text style={[styles.statsTitle, { color: colors.text }]}>
            🎯 Fun Facts
          </Text>
          <Text style={[styles.statsText, { color: colors.text }]}>
            • {totalFlags} flags to learn
          </Text>
          <Text style={[styles.statsText, { color: colors.text }]}>
            • From {regions.length - 1} different regions
          </Text>
          <Text style={[styles.statsText, { color: colors.text }]}>
            • 3 difficulty levels to master
          </Text>
        </Animated.View>

        <Animated.View
          entering={SlideInRight.delay(400).duration(500)}
          style={styles.regionSection}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🗺️ Choose a Region
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.regionScroll}
          >
            {regions.map((region, index) => (
              <AnimatedTouchableOpacity
                key={region}
                entering={FadeIn.delay(600 + index * 50)}
                style={[
                  styles.regionButton,
                  {
                    backgroundColor: selectedRegion === region ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedRegion(region)}
              >
                <Text
                  style={[
                    styles.regionText,
                    {
                      color: selectedRegion === region ? colors.gameButtonText : colors.text,
                    },
                  ]}
                >
                  {region === 'all' ? 'All Regions' : region}
                </Text>
                {region !== 'all' && (
                  <Text
                    style={[
                      styles.regionCount,
                      {
                        color: selectedRegion === region ? colors.gameButtonText : colors.text,
                      },
                    ]}
                  >
                    {regionCounts[region]} flags
                  </Text>
                )}
              </AnimatedTouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View
          entering={SlideInRight.delay(800).duration(500)}
          style={styles.flagGrid}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedRegion === 'all' ? '🏳️ All Flags' : `🏳️ Flags from ${selectedRegion}`}
          </Text>
          <View style={styles.grid}>
            {filteredCountries.map((country, index) => (
              <Animated.View
                key={country.id}
                entering={FadeIn.delay(1000 + index * 30)}
                style={[styles.flagCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <FlagDisplay country={country} size="small" showBorder={false} />
                <Text
                  style={[styles.countryName, { color: colors.text }]}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  {country.name}
                </Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(country.difficulty, colors) }]}>
                  <Text style={styles.difficultyText}>
                    {country.difficulty}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(1200).duration(500)}
          style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.primary }]}
        >
          <Text style={[styles.tipTitle, { color: colors.primary }]}>
            💡 Learning Tips
          </Text>
          <Text style={[styles.tipText, { color: colors.text }]}>
            • Start with easy flags from famous countries
          </Text>
          <Text style={[styles.tipText, { color: colors.text }]}>
            • Look for unique colors and patterns
          </Text>
          <Text style={[styles.tipText, { color: colors.text }]}>
            • Practice a little bit every day
          </Text>
          <Text style={[styles.tipText, { color: colors.text }]}>
            • Try to remember the flag's story
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getDifficultyColor(difficulty: Country['difficulty'], colors: any) {
  switch (difficulty) {
    case 'easy':
      return colors.success;
    case 'medium':
      return colors.warning;
    case 'hard':
      return colors.danger;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  statsCard: {
    margin: 20,
    padding: 20,
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
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
  },
  regionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  regionScroll: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  regionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 100,
  },
  regionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  regionCount: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  flagGrid: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flagCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  countryName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    flex: 1,
    minHeight: 32,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  tipCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 40,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
  },
});

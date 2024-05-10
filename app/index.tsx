import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Onboarding from '@/components/Onboarding';
import BrickBreakerGame from '@/components/GameInterface';

export default function HomeScreen() {
  const [dificultyLevel, setDificultyLevel] = useState(0)
  return dificultyLevel === 0 ? <Onboarding setDificultyLevel={setDificultyLevel} /> : <BrickBreakerGame dificultyLevel={dificultyLevel} />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

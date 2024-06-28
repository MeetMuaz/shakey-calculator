import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';

// expo libraries
import * as Haptics from 'expo-haptics';

// Define the type for the props
type ButtonProps = {
  value: string;
  style?: ViewStyle;
  onPress?: () => void;
};

// This function apply haptic feedback when the button is click
const handleHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

export default function Button({ value, style }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.calculatorButton} onPress={handleHapticFeedback}>
      <Text style={styles.calculatorButtonText}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  calculatorButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  calculatorButtonText: {
    fontSize: 35,
    color: '#FFFFFF',
    fontWeight: '500',
  }
});

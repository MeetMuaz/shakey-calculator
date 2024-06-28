import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// icons component from @expo/vector
import { Feather } from '@expo/vector-icons';

// expo libraries
import * as Haptics from 'expo-haptics';

// This function apply haptic feedback when the button is click
const handleHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

export default function DeleteButton() {
  return (
    <TouchableOpacity style={styles.calculatorButton} onPress={handleHapticFeedback}>
      <Feather name="delete" size={35} color="#FFFFFF" />
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
    fontWeight: '400',
  }
});

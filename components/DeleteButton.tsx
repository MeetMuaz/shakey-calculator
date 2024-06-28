import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

// icons component from @expo/vector
import { Feather } from '@expo/vector-icons';

// expo libraries
import * as Haptics from 'expo-haptics';

// Define the type for the props
type ButtonProps = {
  style?: ViewStyle;
  onPress?: () => void;
};

export default function DeleteButton({ style, onPress } : ButtonProps) {
  return (
    <TouchableOpacity style={styles.calculatorButton} onPress={onPress}>
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

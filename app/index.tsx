import { Dimensions, StyleSheet, View, StatusBar, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Accelerometer } from 'expo-sensors';

// Custom components
import Button from "@/components/Button";
import DeleteButton from "@/components/DeleteButton";

// installed dependencies
import * as Haptics from 'expo-haptics';

// Destructure the Dimensions component to get height and width of the mobile screen
const { width } = Dimensions.get('screen');

// Get the height of the status bar
const statusBarHeight = StatusBar.currentHeight;

// Color themes array
const screenTheme = [
  {
    primary: '#FFC2B3',
    secondary: '#FF8E71',
    tertiary: '#FF481A',
  },
  {
    primary: '#F8B9B9',
    secondary: '#F38181',
    tertiary: '#ED4545',
  },
  {
    primary: '#FADDB7',
    secondary: '#F5B461',
    tertiary: '#F19927',
  },
  {
    primary: '#FFCDB3',
    secondary: '#FFA372',
    tertiary: '#FF8B4C',
  },
  {
    primary: '#FAB7BE',
    secondary: '#F67280',
    tertiary: '#F45768',
  },
  {
    primary: '#D4F7E8',
    secondary: '#67E4AE',
    tertiary: '#92ECC5',
  },
  {
    primary: '#B3D8FF',
    secondary: '#4CA5FF',
    tertiary: '#6EB6FF',
  },
  {
    primary: '#C7E9EA',
    secondary: '#46B7B9',
    tertiary: '#8DB596',
  }
];

export default function Index() {
  const [resultValue, setResultValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [colors, setColors] = useState(screenTheme[0]);

  // this useeffect detect shake in screen
  useEffect(() => {
    Accelerometer.setUpdateInterval(400);
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const totalForce = Math.sqrt(x * x + y * y + z * z);

      if (totalForce > 1.78) { 
        changeColors();
      }
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  // this function change the calculator to a random color
  const changeColors = () => {
    const randomIndex = Math.floor(Math.random() * screenTheme.length);
    setColors(screenTheme[randomIndex]);
  };

  const handleTap = (type: string, value?: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (type === 'clear') {
      setResultValue('0');
      setExpression('');
      return;
    }

    if (type === 'delete') {
      const newValue = resultValue.slice(0, -1) || '0';
      setResultValue(newValue);
      setExpression(expression.slice(0, -1));
      return;
    }

    if (type === 'number' || type === 'operator') {
      const newValue = resultValue === '0' ? value : resultValue + value;
      setResultValue(newValue);
      setExpression(expression + value);
      return;
    }

    if (type === 'equal') {
      try {
        // Replace 'x' with '*' for valid evaluation
        const sanitizedExpression = expression.replace(/x/g, '*');
        // Evaluate the expression safely
        const evalResult = eval(sanitizedExpression);
        setResultValue(String(evalResult));
        setExpression(String(evalResult));
      } catch (e) {
        setResultValue('Error');
        setExpression('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.displayScreen, { backgroundColor: colors.primary }]}>
        <Text style={[styles.title, { color: colors.secondary }]}>SHAKEY</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.resultContainer}>
        <Text style={[styles.result, { fontSize: resultValue.length > 10 ? 40 : 60, color: colors.tertiary }]}>
          {resultValue}
        </Text>
        </ScrollView>
      </View>

      <View style={[styles.buttonsContainer, { backgroundColor: colors.secondary}]}>
        <View style={styles.calculatorRow}>
          <Button value="C" onPress={() => handleTap('clear')}/>
          <Button value="%" onPress={() => handleTap('operator', '%')}/>
          <Button value="/" onPress={() => handleTap('operator', '/')}/>
          <Button value="x" onPress={() => handleTap('operator', 'x')}/>
        </View>
        <View style={styles.calculatorRow}>
          <Button value="7" onPress={() => handleTap('number', '7')}/>
          <Button value="8" onPress={() => handleTap('number', '8')}/>
          <Button value="9" onPress={() => handleTap('number', '9')}/>
          <Button value="-" onPress={() => handleTap('operator', '-')}/>
        </View>
        <View style={styles.calculatorRow}>
          <Button value="4" onPress={() => handleTap('number', '4')}/>
          <Button value="5" onPress={() => handleTap('number', '5')}/>
          <Button value="6" onPress={() => handleTap('number', '6')}/>
          <Button value="+" onPress={() => handleTap('operator', '+')}/>
        </View>

        <View style={styles.calculatorRowWithEqualSign}>
          <View style={{ flex: 3 }}>
            <View style={styles.calculatorRow}>
              <Button value="1" onPress={() => handleTap('number', '1')}/>
              <Button value="2" onPress={() => handleTap('number', '2')}/>
              <Button value="3" onPress={() => handleTap('number', '3')}/>
            </View>
            <View style={styles.calculatorRow}>
              <Button value="0" onPress={() => handleTap('number', '0')}/>
              <Button value="." onPress={() => handleTap('number', '.')}/>
              <DeleteButton onPress={() => handleTap('delete')}/>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Button value="=" onPress={() => handleTap('equal')}/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayScreen: {
    flex: 2,
    width: width,
    paddingTop: statusBarHeight, // Ensures content does not overlap with the status bar, accounting for devices with notches
    position: 'relative',
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    position: 'absolute',
    left: 10,
    top: statusBarHeight
  },
  resultContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  result: {
    fontSize: 60,
    marginHorizontal: 10,
    textAlign: 'right'
  },
  buttonsContainer: {
    flex: 3,
    width: width,
  },
  calculatorRow: {
    flex: 1,
    flexDirection: 'row',
  },
  calculatorRowWithEqualSign: {
    flex: 2,
    flexDirection: 'row',
  }
});

import { Dimensions, StyleSheet, View, StatusBar, Text, ScrollView } from "react-native";
import React from "react";

// Custom components
import Button from "@/components/Button";
import DeleteButton from "@/components/DeleteButton";

// Destructure the Dimensions component to get height and width of the mobile screen
const { width, height } = Dimensions.get('screen');

// Get the height of the status bar
const statusBarHeight = StatusBar.currentHeight;

export default function Index() {

  return (
    // This is the main container for the calculator
    <View style={styles.container}>
      {/* This is the calculator screen */}
      <View style={styles.displayScreen}>
        <Text style={styles.title}>SHAKEY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.resultContainer}>
          <Text style={styles.result}>0</Text>
        </ScrollView>
      </View>

      {/* This is the container for all the buttons */}
      <View style={styles.buttonsContainer}>
        {/* Calculator rows */}
        <View style={styles.calculatorRow}>
          <Button value="C" />
          <Button value="%" />
          <Button value="/" />
          <Button value="x" />
        </View>
        <View style={styles.calculatorRow}>
          <Button value="7" />
          <Button value="8" />
          <Button value="9" />
          <Button value="-" />
        </View>
        <View style={styles.calculatorRow}>
          <Button value="4" />
          <Button value="5" />
          <Button value="6" />
          <Button value="+" />
        </View>

        {/* the layout is use to achieve the complete =  */}
        <View style={styles.calculatorRowWithEqualSign}>
          <View style={{ flex: 3}}>
            <View style={styles.calculatorRow}>
              <Button value="1" />
              <Button value="2" />
              <Button value="3" />
            </View>
            <View style={styles.calculatorRow}>
              <Button value="0" />
              <Button value="." />
              <DeleteButton />
            </View>
          </View>
          <View style={{ flex: 1}}>
            <Button value="="/>
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
    backgroundColor: '#FFC2B3',
    paddingTop: statusBarHeight, // Ensures content does not overlap with the status bar, accounting for devices with notches
    position: 'relative',
    paddingBottom: 10
  },
  title: {
    color: '#FF8E71',
    fontSize: 20,
    fontWeight: '500',
    position: 'absolute',
    left: 10,
    top: statusBarHeight
  },
  resultContainer: {
    position: 'absolute',
    bottom: statusBarHeight,
  },
  result: {
    color: '#FF481A',
    fontSize: 60,
    marginRight: 10,
  },
  buttonsContainer: {
    flex: 3,
    width: width,
    backgroundColor: '#FF8E71',
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

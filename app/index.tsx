import { Dimensions, StyleSheet, View, StatusBar } from "react-native";

// distructure the Dimensions component to get height and width of the mobile screen
const { width, height } = Dimensions.get('screen');


// get the height of the status bar
const statusBarHeight = StatusBar.currentHeight;


export default function Index() {
  return (
    // this is the main container for the calculator
    <View
      style={style.container}
    >
      {/* this is the calculator screen */}
      <View
        style={style.displayScreen}
      >

      </View>
      {/* this is the container for all the buttons */}
      <View
        style={style.buttonsContainer}
      >

      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayScreen: {
    flex: 2,
    width: width,
    backgroundColor: '#FFC2B3',
    paddingTop: statusBarHeight, // Ensures content does not overlap with the status bar, accounting for devices with notches
  },
  buttonsContainer: {
    flex: 3,
    width: width,
    backgroundColor: '#FF8E71',
  }
})
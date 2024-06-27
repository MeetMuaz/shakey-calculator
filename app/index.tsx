import { Dimensions, StyleSheet, View } from "react-native";


// distructure the Dimensions component to get height and width of the mobile screen
const { width, height } = Dimensions.get('screen');

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
    width: width,
  },
  buttonsContainer: {
    width: width,
  }
})
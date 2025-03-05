import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        className="h-screen"
        source={require('../assets/main.jpg')}>
        <View className="flex align-end align-middle h-full ">
          <Text
            style={[{fontSize: wp(23)}, styles.text]}
            className="text-[#ffffff88] rotate-90 left-[40%] m-auto ">
            FITNESS
          </Text>
          <TouchableOpacity className="bg-white p-3 bottom-[10%] rounded-lg w-[50%] flex justify-center align-middle items-center mx-[25%]">
            <Text style={[{fontSize: wp(6)}, styles.text]}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Tourney ExtraBold',
  },
});

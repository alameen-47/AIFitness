import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
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
        className="h-full"
        source={require('../assets/main.jpg')}>
        <View className="h-screen m-auto flex align-middle justify">
          <Text
            style={[{fontSize: wp(22)}, styles.text]}
            className="text-[#ffffff88] rotate-90 ">
            FITNESS
          </Text>
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

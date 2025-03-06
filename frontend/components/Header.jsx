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
import {useNavigation} from '@react-navigation/native';

export const Header = () => {
  return (
    <View className="bg-white flex justify-center align-middle items-center shadow-lg py-4">
      <Text style={[{fontSize: wp(10)}, styles.text]}>TRAINER</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Tourney ExtraBold',
  },
});

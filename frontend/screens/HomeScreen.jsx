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

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        className="h-screen"
        source={require('../assets/main.jpg')}>
        <View className="flex align-end align-middle h-full ">
          <Text
            style={[{fontSize: hp(10)}, styles.text]}
            className=" text-[#ffffff6d] rotate-90 left-[35%] m-auto tracking-widest scale-x-[1.8] scale-y-[2] h-fit">
            FITNESS
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TrainerMainScreen')}
            className="bg-white p-2 bottom-[10%] font-bold rounded-lg w-[50%] flex justify-center align-middle items-center mx-[25%]">
            <Text style={[{fontSize: wp(7)}, styles.text]}>GET STARTED</Text>
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

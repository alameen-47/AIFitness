import React from 'react';
import {
  Image,
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
import {Header} from '../../components/Header';

export const TrainerMainScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <View className="bg-black h-full">
        <Text
          style={[{fontSize: hp(10)}, styles.text]}
          className="absolute text-[#ffffff6d] rotate-90 my-[90%] left-[35%] m-auto tracking-widest scale-x-[2] scale-y-[2] s w-full justify-center align-middle items-center ">
          TRAINER
        </Text>
        <Image
          source={require('../../assets/trainer.png')}
          className=" rounded-lg"
          style={{width: wp(), height: hp(90), borderRadius: wp(5)}}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('TrainerSaveScreen')}>
          <Image
            source={require('../../assets/icons/scan.png')}
            className=" rounded-lg bottom-0 absolute z-10 w-[20%] object-contain mx-[40%] my-[10%]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Tourney ExtraBold',
  },
});

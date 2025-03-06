import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../components/Header';
import {Rating} from 'react-native-ratings';

export const TrainerSaveScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <View className="bg-black h-screen flex justify-center align-middle items-center gap-4 pb-[10%]">
        <Text
          style={[{fontSize: hp(10)}, styles.text]}
          className="absolute text-[#ffffff6d] rotate-90 my-[90%] left-[35%] m-auto tracking-widest scale-x-[2] scale-y-[2] s w-full justify-center align-middle items-center ">
          TRAINER
        </Text>
        <View className="VIDEO THUMBNAIL bg-white w-[50%] h-[25%] border border-1 border-white text-center ">
          <View className="bg-black w-[100%] h-[85%] flex justify-center align-middle items-center m-auto">
            <Image
              className="rounded-lg w-full h-[50%] object-contain"
              source={require('../../assets/icons/Video.png')}
              resizeMode="contain"
            />
          </View>
          <Text
            className="flex text-center h-[15%] bg-white text-red-500 "
            style={[{fontSize: wp(4)}, styles.text]}>
            RETRY
          </Text>
        </View>
        <View className="EXERCISE NAME w-[85%] h-[10%] ">
          <Text
            className="pl-1 text-white"
            style={[{fontSize: wp(5)}, styles.text]}>
            Exercise Name:
          </Text>
          <TextInput className="bg-white rounded-md" />
        </View>
        <View className="EXERCISE DIFFICULTY w-[85%] h-[10%] ">
          <Text
            className="pl-1 text-white"
            style={[{fontSize: wp(5)}, styles.text]}>
            Difficulty Level:
          </Text>
          <View className="bg-white rounded-md p-1">
            <Rating
              type="star" // You can use "heart", "bell", etc.
              ratingCount={5} // Number of stars
              imageSize={30} // Star size
              startingValue={3} // Default rating
            />
          </View>
        </View>
        <View className="EXERCISE AGE w-[85%] h-[10%] ">
          <Text
            className="pl-1 text-white"
            style={[{fontSize: wp(5)}, styles.text]}>
            Age Group:
          </Text>
          <TextInput className="bg-white rounded-md" />
        </View>
        <TouchableOpacity className="SAVE BUTTON bg-white w-[30%] text-center flex align-middle rounded-md justify-center items-center p-1">
          <Text
            className="text-green-700"
            style={[{fontSize: wp(6)}, styles.text]}>
            SAVE
          </Text>
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

import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Game() {
  const navigation = useNavigation();
  return (
    <View>
      {/* heading */}
      <View className="bg-green-700 flex flex-row justify-between">
        <View className="flex flex-row gap-3 p-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="flex flex-row items-center pt-1.5">
            <Icon name="arrow-left" size={14} color="white" />
          </TouchableOpacity>
          <View className="flex flex-row">
            <Text className="text-3xl text-white">
              R <Text className="text-[25px] text-white text">vs</Text> S
            </Text>
            {/* <Text className="text-sm text-white text">vs</Text> */}
          </View>
        </View>
      </View>
      {/* score */}
      <View className="px-5 py-2 bg-white mx-3 my-1 rounded-lg">
        <View className="flex flex-row justify-between ">
          <Text className="bg-white text-lg w-[50%]">
            R,<Text>1st inning</Text>
          </Text>
          <Text className="text-lg w-[50%] text-right">CRR</Text>
        </View>
        <View className="flex flex-row justify-between mt-2">
          <Text className="text-[25px] text-black font-bold w-[50%]">
            0-0<Text className="font-normal text-[20px]">(0.0)</Text>
          </Text>
          <Text className="text-[20px] w-[50%] text-right">0.00</Text>
        </View>
      </View>
      {/* batsman and bowler */}
      <View className=" bg-white mx-3 my-1 rounded-lg">
        {/* batsman heading */}
        <View className="flex px-2 py-2 flex-row justify-between border-b border-gray-500">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap ">
            Batsman
          </Text>
          <Text className="text-lg w-[12%]">R</Text>
          <Text className="text-lg w-[12%]">B</Text>
          <Text className="text-lg w-[12%]">4s</Text>
          <Text className="text-lg w-[12%]">6s</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-lg w-[12%]">SR</Text>
        </View>
        {/* batsman1 */}
        <View className="flex px-2  flex-row justify-between ">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
            Player 1
          </Text>
          <Text className="text-sm w-[12%]">500</Text>
          <Text className="text-sm w-[12%]">3000</Text>
          <Text className="text-sm w-[12%]">500</Text>
          <Text className="text-sm w-[12%]">900</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-sm w-[16%]">0.0000</Text>
        </View>
        {/* batsman2 */}
        <View className="flex px-2  flex-row justify-between ">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
            Player 2
          </Text>
          <Text className="text-sm w-[12%]">500</Text>
          <Text className="text-sm w-[12%]">3000</Text>
          <Text className="text-sm w-[12%]">500</Text>
          <Text className="text-sm w-[12%]">900</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-sm w-[16%]">0.0000</Text>
        </View>
        {/* Bowler heading */}
        <View className="flex px-2 mt-1 flex-row justify-between border-b border-gray-500">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap ">
            Bowler
          </Text>
          <Text className="text-lg w-[12%]">O</Text>
          <Text className="text-lg w-[12%]">M</Text>
          <Text className="text-lg w-[12%]">R</Text>
          <Text className="text-lg w-[12%]">W</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-lg w-[12%]">ER</Text>
        </View>
        {/* Bowler */}
        <View className="flex px-2  flex-row justify-between ">
          <Text className="bg-white text-lg w-[40%] whitespace-nowrap text-green-600">
            Player 2
          </Text>
          <Text className="text-sm w-[12%]">0.0</Text>
          <Text className="text-sm w-[12%]">0</Text>
          <Text className="text-sm w-[12%]">0</Text>
          <Text className="text-sm w-[12%]">0</Text>
          {/* <Text className="text-lg w-[10%]">R</Text> */}
          <Text className="text-sm w-[16%]">0.0000</Text>
        </View>
      </View>

      {/* this over */}
      <View className="flex flex-row p-2 mx-3 my-1 bg-white rounded-lg">
        <Text>This over: </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row  gap-2 ">
            <View>
              <Text className="px-2 py-0.5 m-0 rounded-full border text-xs">
                6
              </Text>
              <Text className="p-0 m-0 text-xs text-center">wd</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

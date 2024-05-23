import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function SelectPlayers() {
    const navigation = useNavigation();
  return (
    <View>
      <View>
        {/* heading */}
        <View className="bg-green-700  p-3 flex flex-row gap-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="flex flex-row items-center pt-1.5">
            <Icon name="arrow-left" size={14} color="white" />
          </TouchableOpacity>
          <Text className="text-xl text-white">Select Opening players</Text>
        </View>

        {/* striker */}
        <View className="mx-3 my-2">
          <Text className="text-green-800  text-xl">Striker</Text>
          <View className="mt-2">
            <TextInput
              keyboardType="text"
              placeholder="Player name"
              className="border-b p-0 "
            />
          </View>
        </View>
        {/*Non striker */}
        <View className="mx-3 my-2">
          <Text className="text-green-800 text-xl">Non-striker</Text>
          <View className=" ">
            <TextInput
              keyboardType="text"
              placeholder="Player name"
              className="border-b p-0 "/>
          </View>
        </View>
        {/*Opening bowler */}
        <View className="mx-3 my-2">
          <Text className="text-green-800  text-xl">Opening bowler</Text>
          <View className=" ">
            <TextInput
              keyboardType="text"
              placeholder="Player name"
              className="border-b p-0"/>
          </View>
        </View>
      </View>
      <View className=" mt-9">
        <TouchableOpacity onPress={()=>navigation.navigate('matchstart')}  className="grid bg-green-800 py-3 mx-2 rounded-xl">
          <Text className="text-white text-center text-lg">Start Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

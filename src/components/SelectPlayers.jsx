import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function SelectPlayers() {
    const navigation = useNavigation();
    const[striker,setStriker]=useState('')
    const[nonstriker,setNonStriker]=useState('')
    const[bowler,setBowler]=useState('')

   
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
              value={striker}
              onChangeText={setStriker}
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
              className="border-b p-0 "
              value={nonstriker}
              onChangeText={setNonStriker}
              />
          </View>
        </View>
        {/*Opening bowler */}
        <View className="mx-3 my-2">
          <Text className="text-green-800  text-xl">Opening bowler</Text>
          <View className=" ">
            <TextInput
              keyboardType="text"
              placeholder="Player name"
              className="border-b p-0"
              value={bowler}
              onChangeText={setBowler}
              />
          </View>
        </View>
      </View>
      <View className=" mt-9">
        <TouchableOpacity onPress={()=>navigation.navigate('matchstart',{striker,nonstriker,bowler})}  className="grid bg-green-800 py-3 mx-2 rounded-xl">
          <Text className="text-white text-center text-lg">Start Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

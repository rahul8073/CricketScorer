import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

export default function NewMatch() {
  const [Toss, setToss] = useState(1);
  const [Bowl, setBowl] = useState(1);
  const navigation=useNavigation();
  return (
    <View>
      {/* teams */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Teams</Text>
        <View className="bg-white mx-2 p-2 rounded-lg">
          <TextInput
            keyboardType="text"
            placeholder="Host Team"
            className="border-b p-0 my-2"></TextInput>
          <TextInput
            keyboardType="text"
            placeholder="Visitor Team"
            className="border-b p-0 my-2"></TextInput>
        </View>
      </View>

      {/* toss */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Toss won by?</Text>
        <View className="bg-white mx-2 p-2 rounded-lg ">
          <View className="flex flex-row gap-5">
            <TouchableOpacity onPress={() => setToss(1)}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <Text
                    className={`h-4 w-4  border rounded-full  ${
                      Toss == 1 && 'bg-green-800'
                    }`}></Text>
                </View>
                <Text>Host Team</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setToss(2)}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <Text
                    className={`h-4 w-4  border rounded-full  ${
                      Toss == 2 && 'bg-green-800'
                    }`}></Text>
                </View>
                <Text>Visitor Team</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      {/* choose bat or bowl */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Opted to?</Text>
        <View className="bg-white mx-2 p-2 rounded-lg ">
          <View className="flex flex-row gap-5">
            <TouchableOpacity onPress={() => setBowl(1)}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <Text
                    className={`h-4 w-4  border rounded-full  ${
                      Bowl == 1 && 'bg-green-800'
                    }`}></Text>
                </View>
                <Text>Bat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBowl(2)}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <Text
                    className={`h-4 w-4  border rounded-full  ${
                      Bowl == 2 && 'bg-green-800'
                    }`}></Text>
                </View>
                <Text>Bowl</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>


      {/* Overs */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Overs?</Text>
        <View className="bg-white mx-2 p-2 rounded-lg ">
        <TextInput
            keyboardType="text"
            placeholder="16"
            className="border-b p-0 my-2"></TextInput>
        </View>
      </View>

      {/* buttons */}
  <View className='mx-5 my-2'>
    <View className='flex flex-row  justify-between'>
        <TouchableOpacity className=' p-2 rounded-lg px-5' onPress={()=>navigation.navigate('AdvanceSetting')}>
            <Text className='text-xl '>Advance Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('selectplayer')} className='bg-green-600 p-2 rounded-lg px-5 '>
            <Text className='text-white text-lg'>Start Match</Text>
        </TouchableOpacity>
    </View>
  </View>
      
    

      
    </View>
  );
}

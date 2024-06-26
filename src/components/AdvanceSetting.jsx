import {View, Text, TextInput, Switch, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function AdvanceSetting() {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View className="flex flex-1 relative">
      <View>
        <View className="bg-green-700  p-3 flex flex-row gap-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="flex flex-row items-center pt-1.5">
            <Icon name="arrow-left" size={14} color="white" />
          </TouchableOpacity>
          <Text className="text-xl text-white">Match Settings</Text>
        </View>
        <View>
          <Text className="text-green-800 p-2 text-xl">Players per team?</Text>
          <View className="bg-white mx-2 p-2 rounded-lg ">
            <TextInput
              keyboardType="text"
              placeholder="11"
              className="border-b p-0 my-2"
            />
          </View>
        </View>

        {/* no ball */}
        <View>
          <View className="flex flex-row mx-2 justify-between">
            <Text className="text-green-800 p-2 text-lg">No Ball</Text>
            <Switch
              trackColor={{false: 'gray', true: 'green'}}
              thumbColor={isEnabled ? 'green' : 'white'}
              ios_backgroundColor="green"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View className="bg-white mx-2 py-2 rounded-lg ">
            <View className="flex flex-row justify-between">
              <Text className="text-gray-800 p-2 text-lg">Re-Ball</Text>
              <Switch
                trackColor={{false: 'gray', true: 'green'}}
                thumbColor={isEnabled ? 'green' : 'white'}
                ios_backgroundColor="green"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View className="flex flex-row mr-3 justify-between">
              <Text className="text-gray-800 p-2 text-lg">No ball run</Text>
              <TextInput
                keyboardType="text"
                placeholder="1"
                className="border-b  my-2  p-0 w-8 text-right"
              />
            </View>
          </View>
        </View>
        {/* Wide ball */}
        <View>
          <View className="flex flex-row mx-2 justify-between">
            <Text className="text-green-800 p-2 text-lg">Wide Ball</Text>
            <Switch
              trackColor={{false: 'gray', true: 'green'}}
              thumbColor={isEnabled ? 'green' : 'white'}
              ios_backgroundColor="green"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {/* re-ball */}
          <View className="bg-white mx-2 py-2 rounded-lg ">
            <View className="flex flex-row justify-between">
              <Text className="text-gray-800 p-2 text-lg">Re-Ball</Text>
              <Switch
                trackColor={{false: 'gray', true: 'green'}}
                thumbColor={isEnabled ? 'green' : 'white'}
                ios_backgroundColor="green"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            {/* wide-ball */}
            <View className="flex flex-row mr-3 justify-between">
              <Text className="text-gray-800 p-2 text-lg">Wide ball run</Text>
              <TextInput
                keyboardType="text"
                placeholder="1"
                className="border-b  my-2  p-0 w-8 text-right"
              />
            </View>
          </View>
        </View>
      </View>
      {/* button save */}
      <View className="absolute bottom-4 w-full">
        <TouchableOpacity className="grid bg-green-800 py-3 mx-2 rounded-xl">
          <Text className="text-white text-center text-lg">Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { startMatch } from '../Redux/action/Game';

export default function NewMatch() {
  const [hostTeam, setHostTeam] = useState('');
  const [visitorTeam, setVisitorTeam] = useState('');
  const [toss, setToss] = useState("");
  const [opted, setOpted] = useState("");
  const [overs, setOvers] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStartMatch = () => {
    const matchData = {
      hostTeam,
      visitorTeam,
      toss,
      opted,
      overs,
    };
    dispatch(startMatch(matchData));
    navigation.navigate('selectplayer');
  };

  return (
    <ScrollView>
    <View>
      {/* Teams */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Teams</Text>
        <View className="bg-white mx-2 p-2 rounded-lg">
          <TextInput
            keyboardType="default"
            placeholder="Host Team"
            value={hostTeam}
            onChangeText={setHostTeam}
            className="border-b p-0 my-2"
          />
          <TextInput
            keyboardType="default"
            placeholder="Visitor Team"
            value={visitorTeam}
            onChangeText={setVisitorTeam}
            className="border-b p-0 my-2"
          />
        </View>
      </View>

      {/* Toss */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Toss won by?</Text>
        <View className="bg-white mx-2 p-2 rounded-lg ">
          <View className="flex flex-row gap-5">
            <TouchableOpacity onPress={() => setToss(hostTeam)}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <View
                    className={`h-4 w-4 border rounded-full ${
                      toss === hostTeam ? 'bg-green-800' : ''
                    }`}
                  ></View>
                </View>
                <Text>{hostTeam || "Host Team"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setToss(visitorTeam)}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <View
                    className={`h-4 w-4 border rounded-full ${
                      toss === visitorTeam ? 'bg-green-800' : ''
                    }`}
                  ></View>
                </View>
                <Text>{visitorTeam || 'Visitor Team'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Opted to */}
      <View>
        <Text className="text-green-800 p-2 text-xl">Opted to?</Text>
        <View className="bg-white mx-2 p-2 rounded-lg ">
          <View className="flex flex-row gap-5">
            <TouchableOpacity onPress={() => setOpted('Bat')}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <View
                    className={`h-4 w-4 border rounded-full ${
                      opted === 'Bat' ? 'bg-green-800' : ''
                    }`}
                  ></View>
                </View>
                <Text>Bat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpted('Bowl')}>
              <View className="flex flex-row gap-1">
                <View className="flex flex-row items-center">
                  <View
                    className={`h-4 w-4 border rounded-full ${
                      opted === 'Bowl' ? 'bg-green-800' : ''
                    }`}
                  ></View>
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
            keyboardType="number-pad"
            placeholder="16"
            value={overs}
            onChangeText={setOvers}
            className="border-b p-0 my-2"
          />
        </View>
      </View>

      {/* Buttons */}
      <View className="mx-5 my-2">
        <View className="flex flex-row justify-between">
          <TouchableOpacity
            className="p-2 rounded-lg px-5"
            onPress={() => navigation.navigate('AdvanceSetting')}
          >
            <Text className="text-xl">Advance Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStartMatch}
            className="bg-green-600 p-2 rounded-lg px-5"
          >
            <Text className="text-white text-lg">Start Match</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    </ScrollView>
  );
}

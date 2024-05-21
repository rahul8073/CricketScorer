import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import NewMatch from '../components/NewMatch';
import AdvanceSetting from '../components/AdvanceSetting';

export default function Navigations() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name='Home' options={{headerShown:false}} component={HomeScreen} />
      <Stack.Screen name='AdvanceSetting' options={{headerShown:false}} component={AdvanceSetting} />
    </Stack.Navigator>
  );
}

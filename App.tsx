import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Header from './src/components/Header';
import {NavigationContainer} from '@react-navigation/native';
import Navigations from './src/Navigations/Navigations';
import NavigationTab from './src/Navigations/NavigationTab';

export default function App() {
  return (
    <>
    {/* <Header/> */}
    <NavigationContainer>
      <NavigationTab />
    </NavigationContainer>
    </>
  );
}

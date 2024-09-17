import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Header from './src/components/Header';
import {NavigationContainer} from '@react-navigation/native';
import Navigations from './src/Navigations/Navigations';
import NavigationTab from './src/Navigations/NavigationTab';
import {Provider} from 'react-redux';
import store from './src/Redux/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        {/* <Header/> */}
        <StatusBar animated={true} backgroundColor="#61da65" />
        <NavigationContainer>
          <Navigations />
        </NavigationContainer>
      </Provider>
    </>
  );
}

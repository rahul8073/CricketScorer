import { View, Text, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Header from './src/components/Header';
import { NavigationContainer } from '@react-navigation/native';
import Navigations from './src/Navigations/Navigations';
import NavigationTab from './src/Navigations/NavigationTab';
import { Provider, useDispatch } from 'react-redux';
import store from './src/Redux/store';
import socket from './socket';
import { startMatch } from './src/Redux/action/Game';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'
export default function App() {
  // const dispatch=useDispatch();
  useEffect(() => {
    const initialuserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('guestUserId')
        const storedUserName = await AsyncStorage.getItem('guestUserName')
        if (!storedUserId || !storedUserName) {
          const newUserId = uuidv4();
          const newUserName = `Guest_${Math.floor(Math.random() * 10000)}`
          await AsyncStorage.setItem('guestUserId',newUserId)
          await AsyncStorage.setItem('guestUserName',newUserName)
        }

      } catch (error) {
        console.log("Error initialized userId", error)
      }
    }
    initialuserId();
    return () => {
      socket.disconnect();
    };

  }, []);
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

import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewMatch from '../components/NewMatch';
import {NavigationContainer} from '@react-navigation/native';
import Teams from '../components/Teams';
import History from '../components/History';
import cricketbat from '../assets/cricketbat.png';
import group from '../assets/group.png';
import history from '../assets/history.png';
import Navigations from './Navigations';

const Tab = createBottomTabNavigator();
export default function NavigationTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name == 'New Match') {
            return <Image source={cricketbat} className="w-6 h-7" />;
          } else if (route.name === 'Teams') {
            return <Image source={group} className="w-6 h-7" />;
          } else if (route.name === 'History') {
            return <Image source={history} className="w-5 h-5" />;
          }
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          paddingTop: 5,
          height: 60,
          paddingBottom: 5,
        },
      })}>
      <Tab.Screen
        name="New Match"
        options={{headerShown: false}}
        component={Navigations}
      />
      <Tab.Screen
        name="Teams"
        options={{headerShown: false}}
        component={Teams}
      />
      <Tab.Screen
        name="History"
        options={{headerShown: false}}
        component={History}
      />
    </Tab.Navigator>
  );
}

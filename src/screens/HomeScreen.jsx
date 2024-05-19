import { View, Text } from 'react-native'
import React from 'react'
import NewMatch from '../components/NewMatch'
import NavigationTab from '../Navigations/NavigationTab'

export default function HomeScreen() {
  return (
    <View className='flex flex-1 bg-gray-300'>
     <NavigationTab/>
    </View>
  )
}
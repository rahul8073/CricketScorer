import { View, Text } from 'react-native'
import React from 'react'
import NewMatch from '../components/NewMatch'
import Header from '../components/Header'

export default function HomeScreen() {
  return (
    <View className='flex flex-1 bg-gray-300'>
      <Header/>
     <NewMatch/>
    </View>
  )
}
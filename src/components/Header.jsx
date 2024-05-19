import { View, Text } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View className='bg-green-700 py-2 px-3 flex flex-row ' >
            <Text className='text-2xl text-white font-bold'>Cricket<Text className='text-sm'>Scorer</Text></Text>
    </View>
  )
}
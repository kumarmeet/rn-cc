import { StatusBar, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-3xl font-pblack'>Aora!</Text>
      <StatusBar barStyle="default" />
      <Link href="/home" className="text-blue-500">Go to Home</Link>
    </View>
  )
}

export default App
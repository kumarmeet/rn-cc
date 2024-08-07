import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { useGlobalContext } from '@/context/global-provider'

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading || isLoggedIn) {
    return <Redirect href="/home" />
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[95vh] px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain' />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode='contain' />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-3 right-20"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton handlerPress={() => { router.push("/sign-in") }} title="Continue with email" containerStyles="w-full mt-7" />
        </View>


        <StatusBar backgroundColor="#161622" barStyle="light-content" />
      </ScrollView>

    </SafeAreaView>

  )
}

export default App
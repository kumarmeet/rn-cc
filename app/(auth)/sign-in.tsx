import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>

          <FormField
            title="Email"
            value={``}
            handleChangeText={() => { }}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder='Email'
          />

          <FormField
            title="Password"
            value={``}
            handleChangeText={() => { }}
            otherStyles="mt-7"
            placeholder='Password'
          />

          <CustomButton
            title="Sign In"
            handlerPress={() => { }}
            containerStyles="mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
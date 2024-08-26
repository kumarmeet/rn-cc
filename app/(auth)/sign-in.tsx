import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { TFormData } from '@/components/interface/props'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/global-provider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<TFormData>({
    email: "",
    password: "",
  });

  const submitHandler = async () => {
    if (!form.email) {
      Alert.alert("Error", "Please fill email address!");
    } else if (!form.password) {
      Alert.alert("Error", "Please fill password!");
    }

    setSubmitting(true);

    try {
      await signIn(form);
      const result = await getCurrentUser();
      // console.log(result)
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text: string) => setForm((prevEvent) => ({
              ...prevEvent,
              email: text,
            }))}
            otherStyles="mt-7"
            placeholder='Email'
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text: string) => setForm((prevEvent) => ({
              ...prevEvent,
              password: text,
            }))}
            otherStyles="mt-7"
            placeholder='Password'
          />

          <CustomButton
            title="Sign In"
            handlerPress={submitHandler}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>

            <Link href={`/sign-up`} className="text-lg font-psemibold text-secondary-100">Sign up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
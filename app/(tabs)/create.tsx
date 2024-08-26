import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as DocumentPicker from "expo-document-picker"
import { router } from 'expo-router'
import { createVideoPost } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/global-provider'

const Create = () => {
  const { user } = useGlobalContext()

  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType: "video" | "image") => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/png", "image/jpg", "image/jpeg"] : ["video/mp4", "video/gif"]
    })

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2))
      }, 1000);
    }
  }

  const submitHandler = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Invalid Input!", "Please fill in all the fields")
    }

    setUploading(true)

    try {
      await createVideoPost({ ...form, userId: user?.$id })

      Alert.alert("Success", "Post upload successfully")
      router.push("/home")
    } catch (error: any) {
      Alert.alert("Error", error.message)
    }
    finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: ''
      })

      setUploading(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-4'>
        <Text className='text-2xl text-white font-semibold'>Upload Video</Text>
        <FormField
          value={form.title}
          title='Video Title'
          handleChangeText={(e) => { setForm({ ...form, title: e }) }}
          placeholder='Give you video title'
          keyboardType='default'
          otherStyles="mt-10"
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ?
              (<Video
                source={{ uri: form.video?.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
              ) :
              (<View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image source={icons.upload} resizeMode='contain' className='h-1/2' />
                </View>
              </View>
              )}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ?
              (<Video
                source={{ uri: form.thumbnail?.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
              ) :
              (<View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                <Image source={icons.upload} resizeMode='contain' className='w-5 h-5' />
                <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
              </View>
              )}
          </TouchableOpacity>
        </View>
        <FormField
          value={form.prompt}
          title='Ai Prompt'
          handleChangeText={(e) => { setForm({ ...form, prompt: e }) }}
          placeholder='The prompt you used to create video'
          keyboardType='default'
          otherStyles="mt-7"
        />
        <CustomButton title="Submit & Publish" handlerPress={submitHandler} containerStyles='mt-7' isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
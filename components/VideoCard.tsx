import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ video: { $id, title, thumbnail, video, creator: { username, avatar } }, onPlay, isPlaying }: any) => {

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode='cover' />
          </View>

          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='font-psemibold text-sm text-white' numberOfLines={1}>{title}</Text>
            <Text className='font-psemibold text-xs text-gray-100' numberOfLines={1}>{username}</Text>
          </View>
        </View>

        <View>
          <Image className='w-5 h-5' source={icons.menu} resizeMode='contain' />
        </View>
      </View>

      {isPlaying ?
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
        // onPlaybackStatusUpdate={status => setplay(() => status.isLoaded)}
        /> :
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPlay}
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
          <Image source={{ uri: thumbnail }} className='w-full h-full rounded-xl mt-3' />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>}
    </View>
  )
}

export default VideoCard